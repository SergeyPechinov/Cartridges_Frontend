import React, {Component} from 'react';
import './Style.scss';
import Modal from "../../../Components/UI/Modal";
import Button from "../../../Components/UI/Button";
import InputTitle from "../../../Components/UI/InputTitle";
import {inputError} from "../../../CommonFunc/inputError";
import {connect} from "react-redux";
import {
	statusesGetStart,
	statusesAddStart,
	statusesAddError,
	statusesAddErrorClear,
	statusesEditStart,
	statusesDelStart,
} from "../../../../Actions/statuses";

class ModalStatuses extends Component {

	state = {
		statusAddRow: false,

		valueAddStatus: '',
	};

	componentDidMount() {
		this.props.statusesGetStart(this.props.authToken);
	}

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

		this.props.statusesAddErrorClear();
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
			this.props.statusesAddStart(this.props.authToken, value, this.closeAddRow);
		} else {
			this.props.statusesAddError('Мнинимум 2 символа!');
		}
	};

	editStatus = id => {
		let value = document.getElementById(`js-edit-add-block-status-input-${id}`).value;
		if (value.length >= 2) {
			const data = {
				id,
				name: document.getElementById(`js-edit-add-block-status-input-${id}`).value,
			};
			this.props.statusesEditStart(this.props.authToken, data, this.closeEditAddBlock, this.editAddStatusError);
		} else {
			this.editAddStatusError(id, `Минимум 2 символа!`);
		}
	};

	editAddStatusError = (id, message = false) => {
		let
				errorBlock = document.getElementById(`js-edit-add-block-status-error-${id}`),
				hiddenClass = `dnone`;

		if (message === false) {
			errorBlock.classList.add(hiddenClass);
			errorBlock.innerHTML = '';
		} else {
			errorBlock.classList.remove(hiddenClass);
			errorBlock.innerHTML = String(message);
		}
	};

	openEditAddBlock = (id, value = '') => {
		let
				editBlock = document.getElementById(`js-edit-add-block-status-${id}`),
				classNameHidden = `dnone`;

		if (editBlock.classList.contains(classNameHidden)) {
			editBlock.classList.remove(classNameHidden);
		} else {
			document.getElementById(`js-edit-add-block-status-input-${id}`).value = value;
			editBlock.classList.add(classNameHidden);
		}

	};

	closeEditAddBlock = (id, value) => {
		let
				editBlock = document.getElementById(`js-edit-add-block-status-${id}`),
				editInput = document.getElementById(`js-edit-add-block-status-input-${id}`);

		editInput.value = value;
		editBlock.classList.add('dnone');
		this.editAddStatusError(id);
	};

	delStatus = id => {
		this.props.statusesDelStart(this.props.authToken, id);
	};

	render() {

		const statusesList = this.props.statusesList ? (
				<ul className={'modal-statuses__list'}>
					{
						this.props.statusesList.map(item =>
								<li
										key={item.id}
										className={'modal-statuses__item'}>
									<div className="modal-statuses__item-inner">
										<p className="modal-statuses__item-name">{item.name}</p>
										<div className="modal-statuses__item-btn-wrapper">
											<i
													className="modal-statuses__item-btn-open-edit"
													onClick={() => {
														this.openEditAddBlock(item.id, item.name);
													}}
											/>
											<i
													className="modal-statuses__item-btn-del"
													onDoubleClick={() => {
														this.delStatus(item.id);
													}}
											/>
										</div>
									</div>

									<div className={`edit-add-status dnone`} id={`js-edit-add-block-status-${item.id}`}>
										<div className="edit-add-status__input-wrapper">
											<InputTitle
													id={`js-edit-add-block-status-input-${item.id}`}
													classWrapper={'edit-add-status__input-name'}
													class={'input--error'}
													title={'Название сервиса'}
													defaultValue={item.name}
													maxLength={30}/>
											<p
													id={`js-edit-add-block-status-error-${item.id}`}
													className="edit-add-status__input-error dnone"/>
										</div>
										<div className="edit-add-status__buttons">
											<div className="edit-add-status__button-wrapper">
												<Button
														onClick={() => {
															this.editStatus(item.id);
														}}
														class={'edit-add-status__button button--green'}>
													Изменить</Button>
											</div>
											<div className="edit-add-status__button-wrapper">
												<Button
														onClick={() => {
															this.closeEditAddBlock(item.id, item.name);
														}}
														class={'edit-add-status__button button--red'}>
													Отмена</Button>
											</div>
										</div>
									</div>
								</li>
						)
					}
				</ul>
		) : null;

		return (
				<Modal
						title={'Статусы'}
						class={'modal-statuses'}
						funcModalClose={this.props.funcModalClose}>

					<div className={'modal-statuses__inner'}>
						<div className="modal-statuses__add">
							{this.state.statusAddRow ?
									<div className={`edit-add-status`}>
										<div className="edit-add-status__input-wrapper">
											<InputTitle
													onChange={this.handleInputAddStatus}
													id={'js-add-status-input'}
													classWrapper={'edit-add-status__input-name'}
													class={'input--error'}
													title={'Название сервиса'}
													defaultValue={this.state.valueAddStatus}
													maxLength={30}/>
											{this.props.statusesAddErrorMessage ?
													<p className="edit-add-status__input-error">
														{this.props.statusesAddErrorMessage}
													</p> : null}
										</div>
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
						{statusesList}
					</div>
				</Modal>
		);
	}
}

const mapStateToProps = state => ({
	authToken: state.auth.tokenAuth,
	statusesList: state.statuses.list,
	statusesAddErrorMessage: state.statuses.errorAddMessage,
});

const mapDispatchToProps = {
	statusesGetStart,
	statusesAddStart,
	statusesAddError,
	statusesAddErrorClear,
	statusesEditStart,
	statusesDelStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalStatuses);