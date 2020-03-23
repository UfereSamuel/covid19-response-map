import React, {PureComponent} from 'react';

export default class Legend extends PureComponent {
  render() {
    const { className} = this.props;

    return (
      <div className={`control-panel ${className}`}>
        <div className="legend-item">
          <div className="swatch state"></div>
          <span>State with Interventions</span>
        </div>
        <div className="legend-item">
          <div className="swatch state none"></div>
          <span>State without Interventions</span>
        </div>
        <div className="legend-item">
          <div className="swatch local"></div>
          <span>County or City with Interventions</span>
        </div>
      </div>
    );
  }
}
