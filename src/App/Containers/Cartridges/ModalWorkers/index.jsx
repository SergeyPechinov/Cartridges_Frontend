import React, {Component} from 'react';
import './Style.scss';
import './../../../../Constants/Styleshets/common.scss'
import Modal from "../../../Components/UI/Modal";
import {workersGetStart} from "../../../../Actions/workers";
import {connect} from "react-redux";
import Button from "../../../Components/UI/Button";
import Input from "../../../Components/UI/Input";
import InputTitle from "../../../Components/UI/InputTitle";

class ModalWorkers extends Component {

	state = {
		statusAddRow: false,
	};

	componentDidMount() {
		this.props.workersGetStart(this.props.authToken);
	}

	handleShowAddRow = () => {
		alert(123);
	};

	render() {

		const workersList = this.props.workersList ? (this.props.workersList.map(item =>
				<span>{item.id}</span>
		)) : null;

		return (
				<Modal
						title={'Работники'}
						class={'modal-workers'}
						funcModalClose={this.props.funcModalClose}
				>
					<div className={'modal-worker__row-add'}>
						<Button class={"modal-workers__row-add-button color-blue button--no-style"}>Добавить
							картридж</Button>

						<div className="modal-workers__row-add-inner">
							<InputTitle
									classWrapper="modal-workers__row-add-input"
									title="Фамилия"/>
							<InputTitle
									classWrapper="modal-workers__row-add-input"
									title="Имя"/>
							<InputTitle
									classWrapper="modal-workers__row-add-input"
									title="Должность"/>
							<InputTitle
									classWrapper="modal-workers__row-add-input"
									title="Кабинет"/>
							<div className="modal-workers__row-add-button-wrapper">
								<Button class={'modal-workers__row-add-button button--green'}>Добавить</Button>
							</div>
							<div className="modal-workers__row-add-button-wrapper">
								<Button class={'modal-workers__row-add-button button--red'}>Отмена</Button>
							</div>
						</div>
					</div>

					{workersList}

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
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWorkers);