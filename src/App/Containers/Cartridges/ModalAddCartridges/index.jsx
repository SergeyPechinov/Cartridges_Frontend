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

		const findWorker = (element, index) => {
			const normalIndex = index + 1;
			if (normalIndex === Number(id)) {
				return true;
			} else if (Number(id) === -1) {
				return false;
			}
		};

		const resultFindWorker = this.props.workersList.find(findWorker);

		console.log(resultFindWorker);

		if (resultFindWorker === undefined) {
			this.setState({
				worker: -1,
				position: '',
				cabinet: '',
			});
		} else {
			this.setState({
				worker: resultFindWorker.id,
				position: resultFindWorker.position,
				cabinet: resultFindWorker.cabinet,
			});
		}
	};

	addCartridge = () => {
		const
				id_inv = this.state.id_inv,
				status = this.state.status,
				mark = this.state.mark,
				model = this.state.model;
		if (
				id_inv !== '' &&
				status !== -1 &&
				mark !== '' &&
				model !== ''
		) {
			this.props.cartridgesAdd(this.props.authToken, this.state);
		}
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.table(this.state);
	}

	componentDidMount() {
		this.props.statusesGetStart(this.props.authToken);
		this.props.workersGetStart(this.props.authToken);
	}

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
					<div className="modal-cartridges__rows">
						<DropdownTitle
								classWrapper="modal-cartridges__row"
								onSelect={id => {
									this.handleWorkers(id);
								}}
								title="Работник"
								defaultValue="Работник"
								list={this.props.workersList}/>
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
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Инвентарный номер *"
									value={this.state.id_inv}
									onChange={this.handleIdInv}
							/>
							<DropdownTitle
									classWrapper="modal-cartridges__row-2-item"
									onSelect={id => {
										this.handleStatus(id);
									}}
									title="Статус *"
									defaultValue="Статус"
									list={this.props.statusesList}/>
						</Row>
						<Row class="modal-cartridges__row modal-cartridges__row-2">
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Производитель *"
									value={this.state.mark}
									onChange={this.handleMark}
							/>
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Модель *"
									value={this.state.model}
									onChange={this.handleModel}
							/>
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
	}
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