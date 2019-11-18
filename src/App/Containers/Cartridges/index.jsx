import React, {Component} from 'react';
import './../../../Constants/Styleshets/main.scss'
import './Style.scss';
import {cartridgesGetStart} from './../../../Actions/cartridges'
import {connect} from "react-redux";
import CartridgesList from "../../Components/Cartridges/List/index";
import CartridgesItem from "../../Components/Cartridges/Item/index";
import Container from "../../Components/Grid/Container";
import Row from "../../Components/Grid/Row";
import Button from "../../Components/UI/Button";
import ModalAddCartridges from "./ModalAddCartridges";
import ModalWorkers from "./ModalWorkers";
import ModalStatuses from "./ModalStatuses";
import {stateModalAddCartridges, stateModalStatuses, stateModalWorkers} from "./functions";


class Cartridges extends Component {

	state = {
		statusModalAddCartridges: false,
		statusModalWorkers: false,
		statusModalStatuses: false,
	};

	componentDidMount() {
		this.props.cartridgesGetStart(this.props.authToken);
	}

	render() {
		const cartridgestItemHeader = {
			id: 'ID',
			id_inv: 'Инв. номер',
			mark: 'Марка',
			model: 'Модель',
			statuses: 'Статус',
			count_refill: 'Заправки',
			date_last_fill: 'Дата запр.',
			cabinet: 'Кабинет',
		};

		const listItem = this.props.cartridgesList ? (this.props.cartridgesList.map(item =>
				<CartridgesItem
						key={item.id}
						item={item}
				/>)) : null;

		return (
				<div className="cartridges">
					{/*модальное окно добавления картриджей*/}
					{
						this.state.statusModalAddCartridges
								?
								<ModalAddCartridges
										funcModalClose={
											event => {
												stateModalAddCartridges(event, this, false);
											}
										}
								/>
								:
								null
					}
					{/*модальное окно работников*/}
					{
						this.state.statusModalWorkers
								?
								<ModalWorkers
										funcModalClose={
											event => {
												stateModalWorkers(event, this, false);
											}
										}
								/>
								:
								null
					}
					{/*модальное окно статусов*/}
					{
						this.state.statusModalStatuses
								?
								<ModalStatuses
										funcModalClose={
											event => {
												stateModalStatuses(event, this, false);
											}
										}
								/>
								:
								null
					}

					<Container>
						<Row class="cartridges__settings-buttons">
							<Button
									class="cartridges__settings-button button--green"
									onClick={
										event => {
											stateModalAddCartridges(event, this);
										}
									}>Добавить картридж</Button>
							<Button
									class="cartridges__settings-button button--blue"
									onClick={
										event => {
                        stateModalWorkers(event, this);
										}
									}>Работники</Button>
							<Button
									class="cartridges__settings-button button--blue"
									onClick={
										event => {
                        stateModalStatuses(event, this);
										}
									}>Статусы</Button>
						</Row>
						<CartridgesList>
							{/*Заголовки таблицы*/}
							<CartridgesItem
									key={23}
									item={cartridgestItemHeader}
									class="cartridges__items--header"
							/>

							{/*Список*/}
							{listItem}
						</CartridgesList>
					</Container>
				</div>
		);
	}
}

const mapStateToProps = state => ({
	authToken: state.auth.tokenAuth,
	cartridgesList: state.cartridges.list,
});

const mapDispatchToProps = {
	cartridgesGetStart,
};


export default connect(mapStateToProps, mapDispatchToProps)(Cartridges);