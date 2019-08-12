import React, {PureComponent} from 'react';
import style from './style.scss';

import {connect} from 'react-redux';
import {actionSetFilters, actionSetDataList} from '../../actions';

import changeData from '../../api/changeDataList';

class FilterList extends PureComponent {
  constructor(props) {
    super(props);
    this.setFilterCategory = this.setFilterCategory.bind(this);
    this.setFilterPrice = this.setFilterPrice.bind(this);
    this.setFilterFavorites = this.setFilterFavorites.bind(this);
    this.changeDataList = this.changeDataList.bind(this);
  }

  setFilterCategory = async (category) => {
    var index = this.props.filtersProps.categories.findIndex((el) => {
      return el === category;
    });
    var array;
    if (index >= 0) {
      array = this.props.filtersProps.categories;
      array.splice(index, 1);
      await this.props.actionSetFilters({
        categories: array,
        priceFrom: this.props.filtersProps.priceFrom,
        priceTo: this.props.filtersProps.priceTo,
        favorites: this.props.filtersProps.favorites
      });
    } else {
      array = this.props.filtersProps.categories;
      array.push(category);
      await this.props.actionSetFilters({
        categories: array,
        priceFrom: this.props.filtersProps.priceFrom,
        priceTo: this.props.filtersProps.priceTo,
        favorites: this.props.filtersProps.favorites
      });
    }
    this.changeDataList();
  };

  setFilterPrice = async (priceType, e) => {
    if (/^[1-9]\d*$/.test(e.target.value)) {
      await this.props.actionSetFilters({
        categories: this.props.filtersProps.categories,
        priceFrom: priceType === 'priceFrom' ? e.target.value : this.props.filtersProps.priceFrom,
        priceTo: priceType === 'priceTo' ? e.target.value : this.props.filtersProps.priceTo,
        favorites: this.props.filtersProps.favorites
      });
    } else {
      var value = e.target.value.substring(0, e.target.value.length - 1);
      await this.props.actionSetFilters({
        categories: this.props.filtersProps.categories,
        priceFrom: priceType === 'priceFrom' ? value : this.props.filtersProps.priceFrom,
        priceTo: priceType === 'priceTo' ? value : this.props.filtersProps.priceTo,
        favorites: this.props.filtersProps.favorites
      });
    }
    this.changeDataList();
  };

  setFilterFavorites = async (flag) => {
    await this.props.actionSetFilters({
      categories: this.props.filtersProps.categories,
      priceFrom: this.props.filtersProps.priceFrom,
      priceTo: this.props.filtersProps.priceTo,
      favorites: flag
    });
    this.changeDataList();
  };

  changeDataList = async () => {
    var _array = await changeData(
      this.props.filtersProps.categories,
      this.props.filtersProps.priceFrom,
      this.props.filtersProps.priceTo,
      this.props.filtersProps.favorites,
      this.props.sortingProps.sortType
    );
    this.props.actionSetDataList({dataList: _array});
  };

  render() {
    return (
      <div className={style.filterList}>
        <div className={style.filterListItem}>
          <span>Категории</span>
          <form className={style.filterListItemFormCategory}>
            <div className={style.filterListItemFormCategoryItem}>
              <input
                type="checkbox"
                id="immovable"
                name="immovable"
                value="immovable"
                onClick={() => this.setFilterCategory('immovable')}
              />
              <label for="immovable">Недвижимость</label>
            </div>
            <div className={style.filterListItemFormCategoryItem}>
              <input
                type="checkbox"
                id="cameras"
                name="cameras"
                value="cameras"
                onClick={() => this.setFilterCategory('cameras')}
              />
              <label for="cameras">Фотоаппараты</label>
            </div>
            <div className={style.filterListItemFormCategoryItem}>
              <input
                type="checkbox"
                id="auto"
                name="auto"
                value="auto"
                onClick={() => this.setFilterCategory('auto')}
              />
              <label for="auto">Автомобили</label>
            </div>
            <div className={style.filterListItemFormCategoryItem}>
              <input
                type="checkbox"
                id="laptops"
                name="laptops"
                value="laptops"
                onClick={() => this.setFilterCategory('laptops')}
              />
              <label for="laptops">Ноутбуки</label>
            </div>
          </form>
        </div>
        <div className={style.filterListItem}>
          <span>Цена</span>
          <form className={style.filterListItemFormPrice}>
            <input
              type="text"
              id="price/from"
              name="price/from"
              pattern="^[ 0-9]+$"
              onChange={(e) => this.setFilterPrice('priceFrom', e)}
              placeholder="Цена от"
              value={this.props.filtersProps.priceFrom}
            />
            <input
              type="text"
              id="price/to"
              name="price/to"
              pattern="^[ 0-9]+$"
              value={this.props.filtersProps.priceTo}
              onChange={(e) => this.setFilterPrice('priceTo', e)}
              placeholder="Цена до"
            />
          </form>
        </div>
        <div className={style.filterListItem}>
          <form className={style.filterListItemFormFavorites}>
            <span>По избранным объявлениям</span>
            <input
              type="checkbox"
              id="favorites"
              name="favorites"
              value="favorites"
              onClick={(e) => {
                e.target.checked ? this.setFilterFavorites(true) : this.setFilterFavorites(false);
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filtersProps: state.reducerSetFilters,
  sortingProps: state.reducerSetSorting,
  productsProps: state.reducerSetProductsList,
  dataListProps: state.reducerSetDataList
});

const mapDispatchToProps = {
  actionSetFilters,
  actionSetDataList
};

const FilterListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);

export default FilterListContainer;
