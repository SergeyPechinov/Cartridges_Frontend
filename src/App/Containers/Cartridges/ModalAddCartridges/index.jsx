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
import {connect} from "react-redux";

class ModalAddCartridges extends Component {

	state = {
		dateLastFill: '',
		datePurchase: '',
	};

	componentDidMount() {
		this.props.statusesGetStart(this.props.authToken);
		this.props.workersGetStart(this.props.authToken);
	}

	render() {
		return (
				<Modal
						title="Добавить картридж"
						funcModalClose={this.props.funcModalClose}
				>
					<div className="modal-cartridges__rows">
						<Row class="row--flex-end modal-cartridges__row modal-cartridges__row-2">
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Инвентарный номер"
							/>
							<DropdownTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Статус"
									defaultValue="Статус"
									classDropdownName="modal-cartridges"
									list={this.props.statusesList}/>
						</Row>
						<Row class="modal-cartridges__row modal-cartridges__row-2">
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Производитель"
							/>
							<InputWithTitle
									classWrapper="modal-cartridges__row-2-item"
									title="Модель"
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
						<Hr/>
						<DropdownTitle
								classWrapper="modal-cartridges__row"
								title="Работник"
								defaultValue="Работник"
								list={this.props.workersList}/>
            <Row class="modal-cartridges__row modal-cartridges__row-2">
              <NameValue
                classWrapper="modal-cartridges__row-2-item"
                name="Должность"
                value={`Помошник директора по клиторным работам`}
              />
              <NameValue
                classWrapper="modal-cartridges__row-2-item"
                name="Кабинет"
                value={`21`}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddCartridges);