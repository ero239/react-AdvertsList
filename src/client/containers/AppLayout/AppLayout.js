import React, {PureComponent, Component} from 'react';
/* import PropTypes from 'prop-types'; */
/* import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom'; */

import Advert from '../../components/Advert/Advert';
import FilterList from '../../components/Sorting&Filter/FilterList';
import Sorting from '../../components/Sorting&Filter/Sorting';

import style from './style.scss';

import {connect} from 'react-redux';
import {actionSetFilters, actionSetProductsLists, actionSetSellersLists, actionSetDataList} from '../../actions';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    try {
      fetch('https://avito.dump.academy/products')
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          localStorage.setItem('products', JSON.stringify(response.data));
          this.props.actionSetProductsLists({productsList: response.data, isLoaded: true});
          this.props.actionSetDataList({dataList: response.data});
          this.setState({
            isLoaded: true
          });
        })
        .catch((e) => {
          this.setState({
            isError: true
          });
          return alert(e);
        });
      fetch('https://avito.dump.academy/sellers')
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          localStorage.setItem('sellers', JSON.stringify(response.data));
          this.props.actionSetSellersLists({sellersList: response.data, isLoaded: true});
        })
        .catch((e) => {
          this.setState({
            isError: true
          });
          return alert(e);
        });
    } catch (e) {
      this.setState({
        isError: true
      });
      return alert(e);
    }
  };

  render() {
    var _favorites = JSON.parse(localStorage.getItem('favorites'));
    return (
      <section className={style.appLayout}>
        <h1>Adverts List</h1>
        <div className={style.appFiltersWrapper}>
          <FilterList />
        </div>
        <div className={style.appSorting}>
          <Sorting />
        </div>
        {this.props.productsProps.isLoaded &&
        this.props.sellersProps.isLoaded &&
        this.props.dataListProps.dataList !== undefined ? (
          <div className={style.appAdvertsWrapper}>
            {this.props.dataListProps.dataList.map((value) => {
              var _isLiked = false;
              if (_favorites !== null) {
                _isLiked = _favorites['id'].some((el) => {
                  return el == value.id;
                });
              }
              return (
                <Advert
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  lat={value.address.lat}
                  lng={value.address.lng}
                  category={value.category}
                  price={value.price}
                  picture={value.pictures[0]}
                  picturesCount={value.pictures.length}
                  sellerId={value.relationships.seller}
                  isLiked={_isLiked}
                />
              );
            })}
          </div>
        ) : (
          <div>{this.state.isError ? <h1>Ошибка загрузки данных</h1> : <h1>Загрузка данных</h1>}</div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  productsProps: state.reducerSetProductsList,
  sellersProps: state.reducerSetSellersList,
  dataListProps: state.reducerSetDataList
});

const mapDispatchToProps = {
  actionSetProductsLists,
  actionSetSellersLists,
  actionSetDataList
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
