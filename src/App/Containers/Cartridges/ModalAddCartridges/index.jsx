import React, {Component} from 'react';
import './Style.scss';
import Modal from "../../../Components/UI/Modal";
import InputWithTitle from "../../../Components/UI/InputTitle";
import Row from "../../../Components/Grid/Row";
import DropdownTitle from "../../../Components/UI/DropownTitle";
import NameValue from "../../../Components/UI/NameValue";
import Hr from "../../../Components/UI/Hr";
import {statusesGetStart} from "./../../../../Actions/statuses"
import {workersGetStart} from "../../../../Actions/workers";
import {cartridgesAdd} from "../../../../Actions/cartridges";
import {connect} from "react-redux";
import Button from "../../../Components/UI/Button";

class ModalAddCartridges extends Component {

	state = {
		id_inv: '',
		status: -1,
		mark: '',
		model: '',
		dateLastFill: '',
		datePurchase: '',
		worker: -1,
		position: '',
		cabinet: '',
	};

	handleIdInv = event => {
		this.setState({
			id_inv: event.target.value,
		})
	};

	handleMark = event => {
		this.setState({
			mark: event.target.value,
		})
	};

	handleModel = event => {
		this.setState({
			model: event.target.value,
		})
	};

	handleStatus = id => {
		this.setState({
			status: id,
		})
	};

	handleWorkers = id => {
		if (id === -1) {
			this.setState({
				worker: -1,
				position: '',
				cabinet: '',
			});
		} else {
			for (let worker of this.props.workersList) {
				if (worker.id === Number(id)) {
					this.setState({
						worker: worker.id,
						position: worker.position,
						cabinet: worker.cabinet,
					});

					break;
				}
			}
		}
	};

	addCartridge = () => {
		const
				values = {
					id_worker: this.state.worker,
					id_inv: this.state.id_inv,
					id_status: this.state.status,
					mark: this.state.mark,
					model: this.state.model,
					dateLastFill: this.state.dateLastFill,
					datePurchase: this.state.datePurchase,
				};

		if (
				values.id_worker !== -1 &&
				values.id_inv !== '' &&
				values.id_status !== -1 &&
				values.mark !== '' &&
				values.model !== ''
		) {
			this.props.cartridgesAdd(this.props.authToken, values, this.addDelError);
		} else {

			let errorsStatus = {
				id_worker: values.id_worker === -1,
				id_inv: values.id_inv === '',
				id_status: values.id_status === -1,
				mark: values.mark === '',
				model: values.model === '',
			};

			this.addDelError(errorsStatus);
		}
	};

	addDelError = (errorsStatus, delError = true) => {
		let
				errorWorker = document.getElementById('js-modal-cartridges-error-worker'),
				errorInv = document.getElementById('js-modal-cartridges-error-inv'),
				errorStatus = document.getElementById('js-modal-cartridges-error-status'),
				errorMark = document.getElementById('js-modal-cartridges-error-mark'),
				errorModel = document.getElementById('js-modal-cartridges-error-model'),
				errorCommon = document.getElementById('js-modal-cartridges-error-common');

		if (delError) {
			if (errorsStatus.id_worker) {
				errorWorker.textContent = 'Не выбран работник!';
			} else {
				errorWorker.textContent = '';
			}
			if (errorsStatus.id_inv) {
				errorInv.textContent = 'Минимум 1 символ!';
			} else {
				errorInv.textContent = '';
			}
			if (errorsStatus.id_status) {
				errorStatus.textContent = 'Не выбран статус!';
			} else {
				errorStatus.textContent = '';
			}
			if (errorsStatus.mark) {
				errorMark.textContent = 'Минимум 1 символ!';
			} else {
				errorMark.textContent = '';
			}
			if (errorsStatus.model) {
				errorModel.textContent = 'Минимум 1 символ!';
			} else {
				errorModel.textContent = '';
			}
		} else {
			errorWorker.textContent = '';
			errorInv.textContent = '';
			errorStatus.textContent = '';
			errorMark.textContent = '';
			errorModel.textContent = '';
			errorCommon.textContent = '';
		}
	};

	componentDidMount() {
		this.props.statusesGetStart(this.props.authToken);
		this.props.workersGetStart(this.props.authToken);
	};

	render() {
		return (
				<Modal
						title="Добавить картридж"
						funcModalClose={this.props.funcModalClose}
						buttonOk={
							<Button
									onClick={this.addCartridge}
									class="button--green">добавить
							</Button>
						}
				>
					<p
							id={'js-modal-cartridges-error-common'}
							className={'modal-cartridges__error'}/>
					<div className="modal-cartridges__rows">
						<DropdownTitle
								classWrapper="modal-cartridges__row"
								onSelect={id => {
									this.handleWorkers(id);
								}}
								title="Работник*"
								defaultValue="Работник"
								list={this.props.workersList}/>
						<p
								id={'js-modal-cartridges-error-worker'}
								className="modal-cartridges__error"/>
						{this.state.position || this.state.cabinet ?
								<Row class="modal-cartridges__row modal-cartridges__row-2">
									{this.state.position ?
											<NameValue
													classWrapper="modal-cartridges__row-2-item"
													name="Должность"
													value={this.state.position}
											/> : null}
									{this.state.cabinet ?
											<NameValue
													classWrapper="modal-cartridges__row-2-item"
													name="Кабинет"
													value={this.state.cabinet}
											/>
											: null}
								</Row>
								: null}
						<Hr/>
						<Row class="row--flex-end modal-cartridges__row modal-cartridges__row-2">
							<div className="modal-cartridges__row-2-item">
								<InputWithTitle
										title="Инвентарный номер *"
										value={this.state.id_inv}
										onChange={this.handleIdInv}
								/>
								<p
										id={'js-modal-cartridges-error-inv'}
										className="modal-cartridges__error"/>
							</div>
							<div className="modal-cartridges__row-2-item">
								<DropdownTitle
										onSelect={id => {
											this.handleStatus(id);
										}}
										title="Статус *"
										defaultValue="Статус"
										list={this.props.statusesList}/>
								<p
										id={'js-modal-cartridges-error-status'}
										className="modal-cartridges__error"/>
							</div>
						</Row>
						<Row class="modal-cartridges__row modal-cartridges__row-2">
							<div className="modal-cartridges__row-2-item">
								<InputWithTitle
										title="Производитель *"
										value={this.state.mark}
										onChange={this.handleMark}
								/>
								<p
										id={'js-modal-cartridges-error-mark'}
										className="modal-cartridges__error"/>
							</div>
							<div className="modal-cartridges__row-2-item">
								<InputWithTitle
										title="Модель *"
										value={this.state.model}
										onChange={this.handleModel}
								/>
								<p
										id={'js-modal-cartridges-error-model'}
										className="modal-cartridges__error"/>
							</div>
						</Row>
						<Row class="row--flex-end modal-cartridges__row modal-cartridges__row-2">
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									value={this.state.dateLastFill}
									type="date"
									title="Дата последней заправки"
									onChange={event => {
										this.setState({
											dateLastFill: event.target.value,
										});
									}}
							/>
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									value={this.state.datePurchase}
									title="Дата покупки"
									type="date"
									onChange={event => {
										this.setState({
											datePurchase: event.target.value,
										});
									}}
							/>
						</Row>
					</div>
				</Modal>
		);
	};
}

const mapStateToProps = state => ({
	authToken: state.auth.tokenAuth,
	statusesList: state.statuses.list,
	workersList: state.workers.list,
});

const mapDispatchToProps = {
	statusesGetStart,
	workersGetStart,
	cartridgesAdd,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddCartridges);