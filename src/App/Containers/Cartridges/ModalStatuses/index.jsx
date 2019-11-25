import React, {Component} from 'react';
import './Style.scss';
import Modal from "../../../Components/UI/Modal";
import Button from "../../../Components/UI/Button";
import InputTitle from "../../../Components/UI/InputTitle";
import {connect} from "react-redux";
import {
	statusesGetStart,
	statusesAddStart,
	statusesEditStart,
	statusesDelStart,
} from "../../../../Actions/statuses";

class ModalStatuses extends Component {
	componentDidMount() {
		this.props.statusesGetStart(this.props.authToken);
	}

	addStatus = () => {
		let
				value = document.getElementById(`js-edit-add-block-status-input-0`).value,
				data = {
					value,
				};

		if (value.length >= 2) {
			this.props.statusesAddStart(this.props.authToken, data, this.closeEditAddBlock, this.editAddStatusError);
		} else {
			this.editAddStatusError(0, 'Минимум 2 символа!');
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

	openEditAddBlock = (id, value) => {
		let
				editBlock = document.getElementById(`js-edit-add-block-status-${id}`),
				classNameHidden = `dnone`;

		if (editBlock.classList.contains(classNameHidden)) {
			editBlock.classList.remove(classNameHidden);
		} else {
			document.getElementById(`js-edit-add-block-status-input-${id}`).value = value;
			editBlock.classList.add(classNameHidden);
		}

		if (id === 0) {
			let btnOpenAddBlock = document.getElementById(`js-edit-add-block-status-btnOpenAddBlock`);
			btnOpenAddBlock.classList.add(classNameHidden);
		}
	};

	closeEditAddBlock = (id, value) => {
		let
				editBlock = document.getElementById(`js-edit-add-block-status-${id}`),
				editInput = document.getElementById(`js-edit-add-block-status-input-${id}`),
				classNameHidden = `dnone`;

		editInput.value = value;
		editBlock.classList.add(classNameHidden);
		this.editAddStatusError(id);

		if (id === 0) {
			let btnOpenAddBlock = document.getElementById(`js-edit-add-block-status-btnOpenAddBlock`);
			btnOpenAddBlock.classList.remove(classNameHidden);
		}
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
							<div className={`edit-add-status dnone`} id={`js-edit-add-block-status-0`}>
								<div className="edit-add-status__input-wrapper">
									<InputTitle
											id={`js-edit-add-block-status-input-0`}
											classWrapper={'edit-add-status__input-name'}
											class={'input--error'}
											title={'Название сервиса'}
											maxLength={30}/>
									<p
											id={`js-edit-add-block-status-error-0`}
											className="edit-add-status__input-error"/>
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
												onClick={() => {
													this.closeEditAddBlock(0, '');
												}}
												class={'edit-add-status__button button--red'}>
											Отмена</Button>
									</div>
								</div>
							</div>
							<Button
									onClick={() => {
										this.openEditAddBlock(0, '');
									}}
									id={`js-edit-add-block-status-btnOpenAddBlock`}
									class={'modal-statuses__add-btn-show button--no-style color-blue'}>Добавить</Button>

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
});

const mapDispatchToProps = {
	statusesGetStart,
	statusesAddStart,
	statusesEditStart,
	statusesDelStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalStatuses);