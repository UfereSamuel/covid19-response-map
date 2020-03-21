import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer, WebMercatorViewport} from 'react-map-gl';
import {json as requestJson} from 'd3-request';

import { dataLayer, borderLayer, baseBorderLayer } from './components/atoms/map-style.js';
import { updatePercentiles, addRandomStateChoro } from './utils/utils';
import Panel from './components/molecules/panel';
import Legend from './components/molecules/legend';
import { MapboxGLStyle } from './components/atoms/mapboxGLStyle'
import { stateGeoJson } from './data/stateGeoJson'

import './App.css';

// Set mapbox token.
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default class App extends Component {

  // const boundedViewport = new WebMercatorViewport({width: '100%', height: '100%'})
  //   .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
  //     padding: 20,
  //     offset: [0, -100]
  //   }
  // );

  state = {
    year: 2015,
    data: null,
    hoveredFeature: null,
    viewport: new WebMercatorViewport({width: window.innerWidth, height: window.innerHeight*0.5})
      .fitBounds([[-124.284235, 39.509423], [-67.004170, 41.783544]], {
        padding: 60,
        offset: [0, 0]
      }
    ),
    // {
    //   latitude: 40,
    //   longitude: -100,
    //   zoom: 3.5,
    //   bearing: 0,
    //   pitch: 0,
    //   bounds: [[-124.284235, 40.509423], [-67.004170, 44.783544]],
    //   // fitBounds: {
    //   //   [[-79, 43], [-73, 45]], 
    //   // 
    //   // }
    // },
    mapstyle: {
      visibility: {
        water: true,
        parks: true,
        buildings: true,
        roads: true,
        labels: true,
        background: true
      },
      color: {
        water: '#DBE2E6',
        parks: '#E6EAE9',
        buildings: '#c0c0c8',
        roads: '#ffffff',
        labels: '#78888a',
        background: '#EBF0F0'
      }
    }
  };

  componentDidMount() {
      if (!!stateGeoJson) {
        // console.log('requestJSON()', response);
        this._loadData(stateGeoJson);
      }
    requestJson(
      // 'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson',
      // require('/data/stateGeoJson.json'),
      (error, response) => {
        if (!error) {
          // console.log('requestJSON()', response);
          this._loadData(response);
        }
      }
    );
  }

  _loadData = data => {
    this.setState({
      data: addRandomStateChoro(data, f => f.properties.income[this.state.year])
      // data: updatePercentiles(data, f => f.properties.income[this.state.year])
    });
  };

  _updateSettings = (name, value) => {
    if (name === 'year') {
      this.setState({year: value});

      const {data} = this.state;
      if (data) {
        // trigger update
        this.setState({
          // data: updatePercentiles(data, f => f.properties.income[value])
          data: addRandomStateChoro(data, f => f.properties.income[this.state.year])
        });
      }
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onHover = event => {
    const {
      features,
      srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    return (
      hoveredFeature && (
        <div className="tooltip" style={{left: x, top: y}}>
          <div>State: {hoveredFeature.properties.name}</div>
          <div>Median Household Income: {hoveredFeature.properties.value}</div>
          <div>Percentile: {(hoveredFeature.properties.percentile / 8) * 100}</div>
        </div>
      )
    );
  }

  // Original light style
  // "mapbox://styles/mapbox/light-v9"
  // Link to custom monochrome style without placenames
  // "mapbox://styles/amygroshek/ck80mem7d053m1jut8ozv3osl"

  render() {
    const {viewport, data} = this.state;
    // console.log('render()', data);

    return (
      <div style={{height: '100%', position: 'relative'}}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={MapboxGLStyle}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onHover={this._onHover}
        >
          <Source type="geojson" data={data}>
            <Layer {...baseBorderLayer} />
            <Layer {...dataLayer} />
            <Layer {...borderLayer} />
          </Source>
          {this._renderTooltip()}
        </MapGL>

        <Legend
          className="legend"
          containerComponent={this.props.containerComponent}
          settings={this.state}
          onChange={this._updateSettings}
        />
        <Panel
          className="slideout"
          containerComponent={this.props.containerComponent}
          settings={this.state}
          onChange={this._updateSettings}
        />
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
