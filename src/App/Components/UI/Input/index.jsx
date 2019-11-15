import React, {Component} from 'react';
import "./Style.scss"

class Input extends Component {

  render() {
    return(
        <input
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            onChange={this.props.onChange}
            type={this.props.type}
            id={this.props.id}
            className={`
              input
              ${this.props.class ? this.props.class : ''}
            `}
            placeholder={this.props.placeholder}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
        />
    );
  }
}

export default Input;