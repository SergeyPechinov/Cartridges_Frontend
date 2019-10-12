import React, {Component} from 'react';
import './Style.scss';

class NameValue extends Component {
	render() {
		return (
				<div className={`
						name-value
						${this.props.classWrapper ? this.props.classWrapper : ''}
					`}>
					<span className={`name-value__name`}>{this.props.name}</span>
					<span className={`name-value__value`}>{this.props.value}</span>
				</div>
		);
	}
}

export default NameValue;