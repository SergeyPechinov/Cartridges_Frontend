import React, {Component} from 'react';
import './Style.scss';

class Hr extends Component {
	render () {
		return(
				<hr className={`hr hr--${this.props.class}`}/>
		);
	}
}

export default Hr;