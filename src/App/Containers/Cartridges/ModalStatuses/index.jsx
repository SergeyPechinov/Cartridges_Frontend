import React, {Component} from 'react';
import './Style.scss';
import Modal from "../../../Components/UI/Modal";
import Button from "../../../Components/UI/Button";
import InputTitle from "../../../Components/UI/InputTitle";
import {inputError} from "../../../CommonFunc/inputError";
import {connect} from "react-redux";
import {statusesGetStart, statusesAddStart} from "../../../../Actions/statuses";

class ModalStatuses extends Component {

	state = {
		statusAddRow: false,

		valueAddStatus: '',
	};

	showAddRow = () => {
		this.setState({
			statusAddRow: true,

			valueAddStatus: '',
		});
	};

	closeAddRow = () => {
		this.setState({
			statusAddRow: false,

			valueAddStatus: '',
		});
	};

	handleInputAddStatus = event => {
		this.setState({
			valueAddStatus: event.target.value,
		});

		let input = document.getElementById('js-add-status-input');
		inputError(event, input, 2);
	};

	addStatus = () => {
		const value = this.state.valueAddStatus;

		if (value.length >= 2) {
			this.props.statusesAddStart(this.props.authToken, value);
		} else {
			alert('Минимум 2 символа');
		}

		this.closeAddRow();
	};

	render() {
		return (
				<Modal
						title={'Статусы'}
						class={'modal-statuses'}
						funcModalClose={this.props.funcModalClose}>

					<div className={'modal-statuses__inner'}>
						<div className="modal-statuses__add">
							{this.state.statusAddRow ?
									<div className={`edit-add-status`}>
										<InputTitle
												onChange={this.handleInputAddStatus}
												id={'js-add-status-input'}
												classWrapper={'edit-add-status__input-name'}
												class={'input--error'}
												title={'Название сервиса'}
												defaultValue={this.state.valueAddStatus}
												maxLength={30}/>
										<div className="edit-add-status__buttons">
											<div className="edit-add-status__button-wrapper">
												<Button
														onClick={this.addStatus}
														class={'edit-add-status__button button--green'}>
													Добавить</Button>
											</div>
											<div className="edit-add-status__button-wrapper">
												<Button
														onClick={this.closeAddRow}
														class={'edit-add-status__button button--red'}>
													Отмена</Button>
											</div>
										</div>
									</div>
									:
									<Button
											onClick={this.showAddRow}
											class={'modal-statuses__add-btn-show button--no-style color-blue'}>Добавить</Button>
							}
						</div>
					</div>
				</Modal>
		);
	}
}


const mapStateToProps = state => ({
	authToken: state.auth.tokenAuth,
	statusesList: state.statuses.list,
});

const mapDispatchToProps = {
	statusesGetStart,
	statusesAddStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalStatuses);