import React, {Component} from 'react';
import './Style.scss';
import Button from "../Button";

class Modal extends Component {

	render() {
		return (
				<div className="modal__wrapper"
				     onClick={this.props.funcModalClose}>
					<div className={`
              modal
              ${this.props.class ? this.props.class : ''}
            `}>
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
								<div className="modal__footer-item">
									{this.props.buttonOk ? this.props.buttonOk : null}
								</div>
								<div className="modal__footer-item">
									<Button class={`button--red modal__button`}
									        onClick={this.props.funcModalClose}>Закрыть</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default Modal;