import React, {Component} from 'react';
import './Style.scss';
import './../../../../Constants/Styleshets/common.scss'
import Modal from "../../../Components/UI/Modal";
import {workersGetStart, workersAddStart, workersDelStart, workersEditStart} from "../../../../Actions/workers";
import {connect} from "react-redux";
import Button from "../../../Components/UI/Button";
import InputTitle from "../../../Components/UI/InputTitle";
import {inputError} from "../../../CommonFunc/inputError";

class ModalWorkers extends Component {

	state = {
		statusAddRow: false,

		add_worker_surname: '',
		add_worker_name: '',
		add_worker_position: '',
		add_worker_cabinet: '',
	};

	handleWorkerSurname = event => {
		this.setState({
			add_worker_surname: event.target.value,
		});

		let input = document.getElementById('js-worker-add-input-surname');
		inputError(event, input, 2);
	};

	handleWorkerName = event => {
		this.setState({
			add_worker_name: event.target.value,
		});

		let input = document.getElementById('js-worker-add-input-name');
		inputError(event, input, 2);
	};

	handleWorkerPosition = event => {
		this.setState({
			add_worker_position: event.target.value,
		});

		let input = document.getElementById('js-worker-add-input-position');
		inputError(event, input, 1);
	};

	handleWorkerCabinet = event => {
		this.setState({
			add_worker_cabinet: event.target.value,
		});

		let input = document.getElementById('js-worker-add-input-cabinet');
		inputError(event, input, 1);
	};

	handleEditWorkerSurname = (event, id) => {
		let input = document.getElementById(`js-edit-worker-surname-${id}`);
		inputError(event, input, 2);
	};

	handleEditWorkerName = (event, id) => {
		let input = document.getElementById(`js-edit-worker-name-${id}`);
		inputError(event, input, 2);
	};

	handleEditWorkerPosition = (event, id) => {
		let input = document.getElementById(`js-edit-worker-position-${id}`);
		inputError(event, input, 1);
	};

	handleEditWorkerCabinet = (event, id) => {
		let input = document.getElementById(`js-edit-worker-cabinet-${id}`);
		inputError(event, input, 1);
	};

	componentDidMount() {
		this.props.workersGetStart(this.props.authToken);
	}

	handleShowAddRow = (status) => {
		this.setState({
			statusAddRow: status,

			add_worker_surname: '',
			add_worker_name: '',
			add_worker_position: '',
			add_worker_cabinet: '',
		});
	};

	addWorker = () => {

		const
				surname = this.state.add_worker_surname,
				name = this.state.add_worker_name,
				position = this.state.add_worker_position,
				cabinet = this.state.add_worker_cabinet;

		if (
				surname.length > 1 &&
				name.length > 1 &&
				position.length > 0 &&
				cabinet.length > 0
		) {
			const data = {
				surname,
				name,
				position,
				cabinet,
			};

			this.props.workersAddStart(this.props.authToken, data);

			this.setState({
				statusAddRow: false,
			});
		} else {
			alert('Пока так: не заполнены все поля полностью!');
		}
	};

	showEditWorker = (id) => {
		let formEdit = document.getElementById(`js-add-edit-worker-${id}`);

		if (formEdit.classList.contains('dnone')) {
			formEdit.classList.remove('dnone');
		} else {
			this.closeEditWorker(id);
		}
	};

	closeEditWorker = (id) => {
		document.getElementById(`js-add-edit-worker-${id}`).classList.add('dnone');
	};

	delWorker = id => {
		this.props.workersDelStart(this.props.authToken, id);
	};

	changeWorker = id => {
		const
				surname = document.getElementById(`js-edit-worker-surname-${id}`).value,
				name = document.getElementById(`js-edit-worker-name-${id}`).value,
				position = document.getElementById(`js-edit-worker-position-${id}`).value,
				cabinet = document.getElementById(`js-edit-worker-cabinet-${id}`).value;

		if (
				surname.length > 1 &&
				name.length > 1 &&
				position.length > 0 &&
				cabinet.length > 0
		) {
			const data = {
				id,
				surname,
				name,
				position,
				cabinet,
			};
			this.props.workersEditStart(this.props.authToken, data);
			this.closeEditWorker(id);
		} else {
			alert('Заполнено не полностью!');
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
									this.showEditWorker(item.id);
								}}
								className={'modal-workers__item-item modal-workers__edit'}>
							<i className={'modal-workers__edit-img'}/>
						</div>
						<div
								onDoubleClick={() => {
									this.delWorker(item.id)
								}}
								className={'modal-workers__item-item modal-workers__del'}>
							<i className={'modal-workers__del-img'}/>
						</div>
					</div>
					<div
							id={`js-add-edit-worker-${item.id}`}
							className="add-edit-worker add-edit-worker--edit dnone">
						<InputTitle
								onChange={event => { this.handleEditWorkerSurname(event, item.id) }}
								id={`js-edit-worker-surname-${item.id}`}
								classWrapper="add-edit-worker__input"
								class={'input--complete'}
								maxLength={25}
								title="Фамилия"
								defaultValue={item.surname}/>
						<InputTitle
								onChange={event => { this.handleEditWorkerName(event, item.id) }}
								id={`js-edit-worker-name-${item.id}`}
								classWrapper="add-edit-worker__input"
								class={'input--complete'}
								maxLength={25}
								title="Имя"
								defaultValue={item.name}/>
						<InputTitle
								onChange={event => { this.handleEditWorkerPosition(event, item.id) }}
								id={`js-edit-worker-position-${item.id}`}
								classWrapper="add-edit-worker__input"
								class={'input--complete'}
								maxLength={30}
								title="Должность"
								defaultValue={item.position}/>
						<InputTitle
								onChange={event => { this.handleEditWorkerCabinet(event, item.id) }}
								id={`js-edit-worker-cabinet-${item.id}`}
								classWrapper="add-edit-worker__input"
								class={'input--complete'}
								maxLength={5}
								title="Кабинет"
								defaultValue={item.cabinet}/>
						<div className="add-edit-worker__button-wrapper">
							<Button
									onClick={() => { this.changeWorker(item.id)}}
									class={'add-edit-worker__button button--green'}>Изменить</Button>
						</div>
						<div
								onClick={() => {
									this.closeEditWorker(item.id);
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
						{this.state.statusAddRow ?
								<div className="add-edit-worker">
									<InputTitle
											onChange={this.handleWorkerSurname}
											defaultValue={this.state.add_worker_surname}
											classWrapper="add-edit-worker__input"
											class={'input--error'}
											id={'js-worker-add-input-surname'}
											maxLength={25}
											title="Фамилия"/>
									<InputTitle
											onChange={this.handleWorkerName}
											defaultValue={this.state.add_worker_name}
											classWrapper="add-edit-worker__input"
											class={'input--error'}
											id={'js-worker-add-input-name'}
											maxLength={25}
											title="Имя"/>
									<InputTitle
											onChange={this.handleWorkerPosition}
											defaultValue={this.state.add_worker_position}
											classWrapper="add-edit-worker__input"
											class={'input--error'}
											id={'js-worker-add-input-position'}
											maxLength={30}
											title="Должность"/>
									<InputTitle
											onChange={this.handleWorkerCabinet}
											defaultValue={this.state.add_worker_cabinet}
											classWrapper="add-edit-worker__input"
											class={'input--error'}
											id={'js-worker-add-input-cabinet'}
											maxLength={5}
											title="Кабинет"/>
									<div className="add-edit-worker__button-wrapper">
										<Button
												onClick={this.addWorker}
												class={'add-edit-worker__button button--green'}>Добавить</Button>
									</div>
									<div
											onClick={() => {
												this.handleShowAddRow(false)
											}}
											className="add-edit-worker__button-wrapper">
										<Button class={'add-edit-worker__button button--red'}>Отмена</Button>
									</div>
								</div>
								:
								<Button
										onClick={() => {
											this.handleShowAddRow(true)
										}}
										class={"add-edit-worker__button color-blue button--no-style"}>Добавить
									работника</Button>
						}
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