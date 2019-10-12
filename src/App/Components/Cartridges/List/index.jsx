import React, {Component} from 'react';
import './Style.scss';

class CartridgesList extends Component{
  render() {
    return(
        <div className="cartridges__list">{this.props.children}</div>
    );
  }
}

export default CartridgesList;