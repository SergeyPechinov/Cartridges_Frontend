import React, {Component} from 'react';
import './Style.scss';

class Row extends Component {
  render() {
    return(
        <div className={`row ${this.props.class ? this.props.class : ''}`}>{this.props.children}</div>
    );
  }
}

export default Row;