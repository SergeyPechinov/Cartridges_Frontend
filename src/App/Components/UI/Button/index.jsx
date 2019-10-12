import React, {Component} from 'react';
import './Style.scss';

class Button extends Component {
	render() {
		return (
				<button
						type="button"
						onClick={this.props.onClick}
						className={`
              button
              ${this.props.class ? this.props.class : ''}
              `}
				>{this.props.children}
				</button>
		);
	}
}

export default Button;