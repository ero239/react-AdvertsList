import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import style from './style.scss';
//import imgLike from '../../images/heart.png';

import {connect} from 'react-redux';
import {actionSetAdvertLiked} from '../../actions';

class Advert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null
    };
    this.likeAdvert = this.likeAdvert.bind(this);
  }

  likeAdvert = (parameter) => {
    try {
      var _favorites =
        JSON.parse(localStorage.getItem('favorites')) !== null
          ? JSON.parse(localStorage.getItem('favorites'))
          : {id: []};
      if (parameter) {
        _favorites['id'].push(this.props.id);
        this.setState({
          isLiked: true
        });
      } else {
        var _index = _favorites['id'].indexOf(this.props.id);
        if (_index >= 0) {
          _favorites['id'].splice(_index, 1);
          this.setState({
            isLiked: false
          });
        }
      }
      localStorage.setItem('favorites', JSON.stringify(_favorites));
    } catch (error) {
      alert(error);
    }
  };

  render() {
    var _price, _category, _isLiked;
    if (this.state.isLiked === null) {
      _isLiked = this.props.isLiked;
    } else {
      _isLiked = this.state.isLiked;
    }
    if (this.props.price > 0) {
      _price = this.props.price;
      _price = _price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
    } else {
      _price = 'Нет цены';
    }
    switch (this.props.category) {
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
    return (
      <div className={style.advert}>
        <div className={style.advertImgWrapper}>
          <img src={this.props.picture} />
          <div className={style.advertImgWrapperImgCount}>{this.props.picturesCount}</div>
        </div>
        <div className={style.advertDescription}>
          <Link to={'/product/' + this.props.id}>
            <h3>{this.props.title}</h3>
          </Link>
          <img
            style={{display: _isLiked ? 'none' : 'block'}}
            className={style.advertImgLike}
            src="../../images/heart.png"
            onClick={() => this.likeAdvert(true)}
          />
          <img
            style={{display: _isLiked ? 'block' : 'none'}}
            className={style.advertImgLike}
            src="../../images/heartPink.png"
            onClick={() => this.likeAdvert(false)}
          />
          <div>
            <span>{_price}</span>
          </div>
          <p>{_category}</p>
          <p>
            {this.props.sellerProps.sellersList[this.props.sellerId].name}
            {'   '}
            {this.props.sellerProps.sellersList[this.props.sellerId].rating}⭐
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sellerProps: state.reducerSetSellersList,
  likedListProps: state.reducerSetAdvertLiked
});

const mapDispatchToProps = {
  actionSetAdvertLiked
};

const AdvertContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Advert);

export default AdvertContainer;
