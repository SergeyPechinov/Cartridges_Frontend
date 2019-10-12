import React, {Component} from 'react';
import './Style.scss';
import Button from "../Button";

class Modal extends Component {

	render() {
		return (
				<div className={`
              modal
              ${this.props.class ? this.props.class : ''}
            `}
             onClick={this.props.funcModalClose}>
					<div className={`modal__inner`}>
						<div className={`modal__header`}>
              <span className={`modal__title`}>
                {this.props.title}
              </span>
							<span className={`modal__button-close-title`}
							      onClick={this.props.funcModalClose}/>
						</div>
						<div className={`modal__body`}>
							{this.props.children}
						</div>
						<div className={`modal__footer`}>
							<Button class={`button--red modal__button`}
							        onClick={this.props.funcModalClose}>Закрыть</Button>
						</div>
					</div>
				</div>
		);
	}
}

export default Modal;