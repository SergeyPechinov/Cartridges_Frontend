import React, {Component} from 'react';
import './Style.scss';
import './../../../../Constants/Styleshets/common.scss'
import Modal from "../../../Components/UI/Modal";
import {workersGetStart, workersAddStart, workersDelStart} from "../../../../Actions/workers";
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

	delWorker = id => {
		this.props.workersDelStart(this.props.authToken, id);
	};

	render() {

		const workersList = this.props.workersList ? (this.props.workersList.map(item =>
				<div
						key={item.id}
						className={'modal-workers__item'}>
					<span
							className={'modal-workers__item-item modal-workers__name'}>
							{item.name}</span>
					<span
							className={'modal-workers__item-item modal-workers__position'}>
							{item.position}</span>
					<span
							className={'modal-workers__item-item modal-workers__cabinet'}>
							{item.cabinet}</span>
					<i
							onDoubleClick={() => { this.delWorker(item.id) }}
							className={'modal-workers__item-item modal-workers__del'}/>
				</div>
		)) : null;

		return (
				<Modal
						title={'Работники'}
						class={'modal-workers'}
						funcModalClose={this.props.funcModalClose}
				>
					<div className={'modal-workers__row-add'}>
						{this.state.statusAddRow ?
								<div className="modal-workers__row-add-inner">
									<InputTitle
											onChange={this.handleWorkerSurname}
											defaultValue={this.state.add_worker_surname}
											classWrapper="modal-workers__row-add-input"
											class={'input--error'}
											id={'js-worker-add-input-surname'}
											maxLength={50}
											title="Фамилия"/>
									<InputTitle
											onChange={this.handleWorkerName}
											defaultValue={this.state.add_worker_name}
											classWrapper="modal-workers__row-add-input"
											class={'input--error'}
											id={'js-worker-add-input-name'}
											maxLength={30}
											title="Имя"/>
									<InputTitle
											onChange={this.handleWorkerPosition}
											defaultValue={this.state.add_worker_position}
											classWrapper="modal-workers__row-add-input"
											class={'input--error'}
											id={'js-worker-add-input-position'}
											maxLength={30}
											title="Должность"/>
									<InputTitle
											onChange={this.handleWorkerCabinet}
											defaultValue={this.state.add_worker_cabinet}
											classWrapper="modal-workers__row-add-input"
											class={'input--error'}
											id={'js-worker-add-input-cabinet'}
											maxLength={5}
											title="Кабинет"/>
									<div className="modal-workers__row-add-button-wrapper">
										<Button
												onClick={this.addWorker}
												class={'modal-workers__row-add-button button--green'}>Добавить</Button>
									</div>
									<div
											onClick={() => {
												this.handleShowAddRow(false)
											}}
											className="modal-workers__row-add-button-wrapper">
										<Button class={'modal-workers__row-add-button button--red'}>Отмена</Button>
									</div>
								</div>
								:
								<Button
										onClick={() => {
											this.handleShowAddRow(true)
										}}
										class={"modal-workers__row-add-button color-blue button--no-style"}>Добавить
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWorkers);