import React, {Component} from 'react';
import './Style.scss';

class CartridgesItem extends Component{
  render() {
    return(
        <li className={this.props.class !== undefined ? `cartridges__items ${this.props.class ? this.props.class : ''}` : 'cartridges__items'}>
          <span className='cartridges__item cartridges__item--id'>{this.props.item.id}</span>
          <span className="cartridges__item cartridges__item--id_inv">{this.props.item.id_inv}</span>
          <span className="cartridges__item cartridges__item--mark">{this.props.item.mark}</span>
          <span className="cartridges__item cartridges__item--model">{this.props.item.model}</span>
          <span className="cartridges__item cartridges__item--statuses">{this.props.item.statuses}</span>
          <span className="cartridges__item cartridges__item--count-refill">{this.props.item.count_refill}</span>
          <span className="cartridges__item cartridges__item--date-last-fill">{this.props.item.date_last_fill}</span>
          <span className="cartridges__item cartridges__item--workers">{this.props.item.cabinet}</span>
        </li>
    );
  }
}

export default CartridgesItem;
// 25