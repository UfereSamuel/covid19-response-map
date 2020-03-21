// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'hasActions',
      stops: [
        [0, 'RGBA(255, 0, 0, 0)'], // [0, '#3288bd'],
        [1, '#2c897f'], // [1, '#66c2a5'],
        // [2, 'RGBA(255, 0, 0, 0.5)'], // [2, '#abdda4'],
        // [3, 'RGBA(255, 0, 0, 1)'], // [3, '#e6f598'],
        // [4, '#ffffbf'],
        // [5, '#fee08b'],
        // [6, '#fdae61'],
        // [7, '#f46d43'],
        // [8, '#d53e4f']
      ]
    },
    'fill-opacity': 0.45,
    // 'fill-outline-color': 'rgba(0,0,0,0.65)',
    'fill-antialias': true
  }
};

export const baseBorderLayer = {
  id: 'baseBorderData',
  type: 'line',
  paint: {
    'line-color': '#828282',
    'line-width': 2
  }
};

export const borderLayer = {
  id: 'borderData',
  type: 'line',
  paint: {
    'line-color': {
      property: 'hasActions',
      stops: [
        [0, 'transparent'],
        [1, '#2c897f']
      ]
    },
    'line-width': {
      property: 'hasActions',
      stops: [
        [0, 0],
        [1, 4]
      ]
    }
  },
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  }
};
