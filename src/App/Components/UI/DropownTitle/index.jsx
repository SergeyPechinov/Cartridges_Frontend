import React, {Component} from 'react';
import './Style.scss';
import Dropdown from "../Dropdown";

class DropdownTitle extends Component {
	render() {
		return (
				<div
						className={`
							dropdown-title
							${this.props.classWrapper ? this.props.classWrapper : ''}
						`}>
          <span
		          className={`dropdown-title__title`}>
            {this.props.title}
          </span>
					<Dropdown {...this.props} class={`dropdown-title__input ${this.props.class ? this.props.class : ''}`}/>
				</div>
		);
	}
}

export default DropdownTitle;