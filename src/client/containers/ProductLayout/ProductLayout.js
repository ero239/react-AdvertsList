import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import style from './style.scss';

import {connect} from 'react-redux';
import {actionSetProductsLists, actionSetSellersLists} from '../../actions';

class ProductLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: {},
      sellerData: {},
      isNotFined: false,
      isPopOver: false,
      popOverImgURL: ''
    };
    this.getData = this.getData.bind(this);
    this.getSellerData = this.getSellerData.bind(this);
    this.handlePopOver = this.handlePopOver.bind(this);
  }

  componentDidMount = () => {
    var _id = this.props.match.params.id;
    this.getData(_id);
  };

  getData = (id) => {
    try {
      fetch('https://avito.dump.academy/products/' + id)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.setState({
            data: response.data
          });
          this.getSellerData(response.data.relationships.seller);
        })
        .catch((e) => {
          this.setState({
            isNotFined: true
          });
        });
    } catch (error) {
      alert(error.messege);
    }
  };
  getSellerData = (id) => {
    try {
      fetch('https://avito.dump.academy/sellers/' + id)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.setState({
            sellerData: response.data,
            isLoaded: true
          });
        })
        .catch((e) => {
          return alert(e.messege);
        });
    } catch (error) {
      alert(error.messege);
    }
  };

  handlePopOver = (url) => {
    if (this.state.isPopOver) {
      this.setState({
        isPopOver: false
      });
    } else {
      this.setState({
        isPopOver: true,
        popOverImgURL: url
      });
    }
  };

  render() {
    var _price;
    var _category;
    var _keys;
    var _additionalData = [];
    if (this.state.isLoaded) {
      if (this.state.data.price > 0) {
        _price = this.state.data.price;
        _price = _price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
      } else {
        _price = 'Нет цены';
      }
      switch (this.state.data.category) {
        case 'auto':
          _category = 'Автомобили';
          break;
        case 'immovable':
          _category = ' Недвижимость';
          break;
        case 'laptops':
          _category = 'Ноутбуки';
          break;
        case 'cameras':
          _category = 'Фотоаппараты';
          break;
        default:
          break;
      }
      _keys = Object.keys(this.state.data);
      for (let key of _keys) {
        if (
          key !== 'address' &&
          key !== 'price' &&
          key !== 'title' &&
          key !== 'category' &&
          key !== 'pictures' &&
          key !== 'relationships' &&
          key !== 'id'
        ) {
          _additionalData.push(key + ' ' + this.state.data[key]);
        }
      }
    }

    return (
      <div>
        {this.state.isLoaded ? (
          <section className={style.productWrapper}>
            <div style={{display: this.state.isPopOver ? 'block' : 'none'}} className={style.productPopOver}>
              <div className={style.productPopOverImg}>
                <img src={this.state.popOverImgURL} />
              </div>
              <img className={style.productCloseButton} src="../../images/close(1).png" onClick={this.handlePopOver} />
            </div>
            <div className={style.productBack}>
              <Link to="/">Adverts List</Link>
            </div>
            <div className={style.productHeader}>
              <h1>{this.state.data.title}</h1>
            </div>
            <div className={style.productDescription}>
              <div className={style.productDescriptionMain}>
                <span>{_price}</span>
                <span>{_category}</span>
                <span>
                  {this.state.sellerData.name}
                  {'  '}
                  {this.state.sellerData.rating}⭐
                </span>
                <span>{this.state.sellerData.isCompany ? 'Компания' : ''}</span>
              </div>
              <div className={style.productDescriptionAdditional}>
                {_additionalData.map((value) => {
                  return <span>{value}</span>;
                })}
              </div>
            </div>
            <div className={style.productImagesCarousel}>
              {this.state.data.pictures.map((value) => {
                return (
                  <div className={style.productImageWrapper}>
                    <img onClick={() => this.handlePopOver(value)} src={value} />
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div>{this.state.isNotFined ? <h1>Товар не найден</h1> : <h1>Загрузка данных</h1>}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsProps: state.reducerSetProductsList,
  sellersProps: state.reducerSetSellersList
});

const mapDispatchToProps = {
  actionSetProductsLists,
  actionSetSellersLists
};

const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductLayout);

export default ProductContainer;
