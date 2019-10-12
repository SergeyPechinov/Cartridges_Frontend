import React, {Component} from 'react';
import './Style.scss';
import Input from "../Input";

class InputTitle extends Component{
  render() {
    return(
        <div className={`
          input-title
          ${this.props.classWrapper ? this.props.classWrapper : ''}
        `}>
          <span className={`
            input-title__title
          `}>
            {this.props.title}
          </span>
          <Input {...this.props} class={`
            input-title__input
            ${this.props.class ? this.props.class : ''}`}/>
        </div>
    );
  }
}

export default InputTitle;