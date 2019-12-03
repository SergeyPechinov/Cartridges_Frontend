import React, {Component} from 'react';
import './Style.scss';
import './../../../../Constants/Styleshets/common.scss'
import Modal from "../../../Components/UI/Modal";
import {workersGetStart, workersAddStart, workersDelStart, workersEditStart} from "../../../../Actions/workers";
import {connect} from "react-redux";
import Button from "../../../Components/UI/Button";
import InputTitle from "../../../Components/UI/InputTitle";

class ModalWorkers extends Component {
	componentDidMount() {
		this.props.workersGetStart(this.props.authToken)
	}

	editAddWorker = (id, actionEdit = false) => {
		if (this.editAddErrors(id)) {
			let
					inputSurname = document.getElementById(`js-edit-add-block-worker-input-surname-${id}`),
					inputName = document.getElementById(`js-edit-add-block-worker-input-name-${id}`),
					inputPosition = document.getElementById(`js-edit-add-block-worker-input-position-${id}`),
					inputCabinet = document.getElementById(`js-edit-add-block-worker-input-cabinet-${id}`);

			let values = {
				surname: inputSurname.value,
				name: inputName.value,
				position: inputPosition.value,
				cabinet: inputCabinet.value,
			};

			actionEdit ? this.editWorker(values) : this.addWorker(values);
		}
	};

	addWorker = values => {
		this.props.workersAddStart(this.props.authToken, values, this.openCloseEditAddBlockWorker, this.addDelErrorAll);
	};

	editWorker = values => {
		console.log('edit');
	};

	editAddErrors = (id) => {
		let
				inputSurname = document.getElementById(`js-edit-add-block-worker-input-surname-${id}`),
				inputName = document.getElementById(`js-edit-add-block-worker-input-name-${id}`),
				inputPosition = document.getElementById(`js-edit-add-block-worker-input-position-${id}`),
				inputCabinet = document.getElementById(`js-edit-add-block-worker-input-cabinet-${id}`);

		let errorsStatus = {
			surname: inputSurname.value.length < 2,
			name: inputName.value.length < 2,
			position: inputPosition.value.length < 2,
			cabinet: inputCabinet.value.length < 1,
		};

		if (errorsStatus.surname || errorsStatus.name || errorsStatus.position || errorsStatus.cabinet) {
			let errorsMessage = {
				surname: '',
				name: '',
				position: '',
				cabinet: '',
			};

			if (errorsStatus.surname) {errorsMessage.surname = 'Минимум 2 символа!'}
			if (errorsStatus.name) {errorsMessage.name = 'Минимум 2 символа!'}
			if (errorsStatus.position) {errorsMessage.position = 'Минимум 1 символ!'}
			if (errorsStatus.cabinet) {errorsMessage.cabinet = 'Минимум 1 символ!'}

			this.addDelErrorAll(id, errorsMessage);

			return false;
		} else {
			return true;
		}
	};

	addDelError = (elName, message = '') => {
		document.getElementById(elName).textContent = message;
	};

	addDelErrorAll = (id, values = false) => {
		if (values === false) {
			this.addDelError(`js-edit-add-block-worker-error-surname-${id}`);
			this.addDelError(`js-edit-add-block-worker-error-name-${id}`);
			this.addDelError(`js-edit-add-block-worker-error-position-${id}`);
			this.addDelError(`js-edit-add-block-worker-error-cabinet-${id}`);
		} else {
			this.addDelError(`js-edit-add-block-worker-error-surname-${id}`, values.surname);
			this.addDelError(`js-edit-add-block-worker-error-name-${id}`, values.name);
			this.addDelError(`js-edit-add-block-worker-error-position-${id}`, values.position);
			this.addDelError(`js-edit-add-block-worker-error-cabinet-${id}`, values.cabinet);
		}
	};

	openCloseEditAddBlockWorker = (id, values = false) => {
		let
				editAddBlock = document.getElementById(`js-edit-add-block-worker-${id}`),
				inputSurname = document.getElementById(`js-edit-add-block-worker-input-surname-${id}`),
				inputName = document.getElementById(`js-edit-add-block-worker-input-name-${id}`),
				inputPosition = document.getElementById(`js-edit-add-block-worker-input-position-${id}`),
				inputCabinet = document.getElementById(`js-edit-add-block-worker-input-cabinet-${id}`),
				classNameHidden = `dnone`;

		if (values === false) {
			values = {
				surname: '',
				name: '',
				position: '',
				cabinet: '',
			}
		}

		inputSurname.value = values.surname;
		inputName.value = values.name;
		inputPosition.value = values.position;
		inputCabinet.value = values.cabinet;

		if (editAddBlock.classList.contains(classNameHidden)) {
			editAddBlock.classList.remove(classNameHidden);

			if (id === 0) { //прячет кнопку добавления работники
				let btnOpenAddBlock = document.getElementById('js-edit-add-block-worker-btnOpenAddBlock');
				btnOpenAddBlock.classList.add(classNameHidden);
			}
		} else {
			editAddBlock.classList.add(classNameHidden);
			this.addDelErrorAll(id);

			if (id === 0) { //показывает кнопку добавления работники
				let btnOpenAddBlock = document.getElementById('js-edit-add-block-worker-btnOpenAddBlock');
				btnOpenAddBlock.classList.remove(classNameHidden);
			}
		}
	};

	render() {
		const workersList = this.props.workersList ? (this.props.workersList.map(item =>
				<div
						key={item.id}
						className={'modal-workers__item-wrapper'}>
					<div
							className={'modal-workers__item'}>
						<span
								className={'modal-workers__item-item modal-workers__name'}>
								{item.listName}</span>
						<span
								className={'modal-workers__item-item modal-workers__position'}>
								{item.position}</span>
						<span
								className={'modal-workers__item-item modal-workers__cabinet'}>
							<span className={'modal-workers__cabinet-title'}>Кабинет: </span>{item.cabinet}</span>
						<div
								onClick={() => {
									const values = {
										surname: item.surname,
										name: item.name,
										position: item.position,
										cabinet: item.cabinet,
									};

									this.openCloseEditAddBlockWorker(item.id, values);
								}}
								className={'modal-workers__item-item modal-workers__edit'}>
							<i className={'modal-workers__edit-img'}/>
						</div>
						<div
								onDoubleClick={() => {
									// this.delWorker(item.id)
								}}
								className={'modal-workers__item-item modal-workers__del'}>
							<i className={'modal-workers__del-img'}/>
						</div>
					</div>
					<div
							id={`js-edit-add-block-worker-${item.id}`}
							className="add-edit-worker add-edit-worker--edit dnone">
						<div className="add-edit-worker__input-wrapper">
							<InputTitle
									id={`js-edit-add-block-worker-input-surname-${item.id}`}
									classWrapper="add-edit-worker__input"
									class={'input--complete'}
									maxLength={25}
									title="Фамилия"/>
							<p
									id={`js-edit-add-block-worker-error-surname-${item.id}`}
									className="add-edit-worker__input-error"/>
						</div>
						<div className="add-edit-worker__input-wrapper">
							<InputTitle
									id={`js-edit-add-block-worker-input-name-${item.id}`}
									classWrapper="add-edit-worker__input"
									class={'input--complete'}
									maxLength={25}
									title="Имя"/>
							<p
									id={`js-edit-add-block-worker-error-name-${item.id}`}
									className="add-edit-worker__input-error"/>
						</div>
						<div className="add-edit-worker__input-wrapper">
							<InputTitle
									id={`js-edit-add-block-worker-input-position-${item.id}`}
									classWrapper="add-edit-worker__input"
									class={'input--complete'}
									maxLength={30}
									title="Должность"/>
							<p
									id={`js-edit-add-block-worker-error-position-${item.id}`}
									className="add-edit-worker__input-error"/>
						</div>
						<div className="add-edit-worker__input-wrapper">
							<InputTitle
									id={`js-edit-add-block-worker-input-cabinet-${item.id}`}
									classWrapper="add-edit-worker__input"
									class={'input--complete'}
									maxLength={5}
									title="Кабинет"/>
							<p
									id={`js-edit-add-block-worker-error-cabinet-${item.id}`}
									className="add-edit-worker__input-error"/>
						</div>
						<div className="add-edit-worker__button-wrapper">
							<Button
									onClick={() => {
										// this.changeWorker(item.id)
									}}
									class={'add-edit-worker__button button--green'}>Изменить</Button>
						</div>
						<div
								onClick={() => {
									const values = {
										surname: item.surname,
										name: item.name,
										position: item.position,
										cabinet: item.cabinet,
									};

									this.openCloseEditAddBlockWorker(item.id, values);
								}}
								className="add-edit-worker__button-wrapper">
							<Button class={'add-edit-worker__button button--red'}>Отмена</Button>
						</div>
					</div>
				</div>
		)) : null;

		return (
				<Modal
						title={'Работники'}
						class={'modal-workers'}
						funcModalClose={this.props.funcModalClose}
				>
					<div className={'add-edit-worker__wrapper'}>
						<div
								id={`js-edit-add-block-worker-0`}
								className="add-edit-worker dnone">
							<div className="add-edit-worker__input-wrapper">
								<InputTitle
										id={`js-edit-add-block-worker-input-surname-0`}
										classWrapper="add-edit-worker__input"
										class={'input--error'}
										maxLength={25}
										title="Фамилия"/>
								<p
										id={`js-edit-add-block-worker-error-surname-0`}
										className="add-edit-worker__input-error"/>
							</div>
							<div className="add-edit-worker__input-wrapper">
								<InputTitle
										id={`js-edit-add-block-worker-input-name-0`}
										classWrapper="add-edit-worker__input"
										class={'input--error'}
										maxLength={25}
										title="Имя"/>
								<p
										id={`js-edit-add-block-worker-error-name-0`}
										className="add-edit-worker__input-error"/>
							</div>
							<div className="add-edit-worker__input-wrapper">
								<InputTitle
										id={`js-edit-add-block-worker-input-position-0`}
										classWrapper="add-edit-worker__input"
										class={'input--error'}
										maxLength={30}
										title="Должность"/>
								<p
										id={`js-edit-add-block-worker-error-position-0`}
										className="add-edit-worker__input-error"/>
							</div>
							<div className="add-edit-worker__input-wrapper">
								<InputTitle
										id={`js-edit-add-block-worker-input-cabinet-0`}
										classWrapper="add-edit-worker__input"
										class={'input--error'}
										maxLength={5}
										title="Кабинет"/>
								<p
										id={`js-edit-add-block-worker-error-cabinet-0`}
										className="add-edit-worker__input-error"/>
							</div>
							<div className="add-edit-worker__button-wrapper">
								<Button
										onClick={() => {
											this.editAddWorker(0);
										}}
										class={'add-edit-worker__button button--green'}>Добавить</Button>
							</div>
							<div
									onClick={() => {
										this.openCloseEditAddBlockWorker(0);
									}}
									className="add-edit-worker__button-wrapper">
								<Button class={'add-edit-worker__button button--red'}>Отмена</Button>
							</div>
						</div>

						<Button
								onClick={() => {
									this.openCloseEditAddBlockWorker(0);
								}}
								id={`js-edit-add-block-worker-btnOpenAddBlock`}
								class={"add-edit-worker__button color-blue button--no-style"}>Добавить
							работника</Button>

					</div>

					<div className={'modal-workers__list'}>
						{workersList}
					</div>
				</Modal>
		);
	}
}

const mapStateToProps = state => ({
	authToken: state.auth.tokenAuth,
	workersList: state.workers.list,
});

const mapDispatchToProps = {
	workersGetStart,
	workersAddStart,
	workersDelStart,
	workersEditStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWorkers);