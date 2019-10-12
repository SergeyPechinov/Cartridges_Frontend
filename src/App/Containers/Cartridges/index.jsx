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
import CartridgesAddModal from "./ModalAddCartridges";
import {stateModalAddCartridges} from "./functions";


class Cartridges extends Component {

  state = {
    statusModalAddCartridges: false,
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
          {/*модальное окно*/}
          {
            this.state.statusModalAddCartridges
                ?
                <CartridgesAddModal
                    funcModalClose={
                      event => {
                        stateModalAddCartridges(event, this, false);
                      }
                    }
                />
                :
                null
          }

          <Container>
            <Row class="cartridges__buttons">
              <Button
                  class="button--green"
                  onClick={
                    event => {
                      stateModalAddCartridges(event, this, true);
                    }
                  }>Добавить картридж</Button>
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