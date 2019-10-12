import React, {Component} from 'react';
import './Style.scss';

class Loader extends Component{
  render() {
    return(
        <div className="loader__wrapper">
          <div className="loader"></div>
        </div>
    );
  }
}

export default Loader;