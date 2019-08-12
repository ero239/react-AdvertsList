import React, {PureComponent} from 'react';
import style from './style.scss';
import {connect} from 'react-redux';
import {actionSetSorting, actionShowLists, actionSetDataList} from '../../actions';
import changeData from '../../api/changeDataList';

class SortingList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.changeDataList = this.changeDataList.bind(this);
  }

  handleOnClick = async (type) => {
    this.props.actionShowLists({isSortingHidden: true});
    await this.props.actionSetSorting({sortType: type});
    switch (type) {
      case 'По популярности':
        this.changeDataList();
        break;
      case 'По возрастанию цены':
        var dataList = this.props.dataListProps.dataList;
        dataList.sort((a, b) => {
          if (a.price === undefined) {
            return false;
          }
          if (b.price === undefined) {
            return true;
          }
          return a.price - b.price;
        });
        this.props.actionSetDataList({dataList: dataList});
        break;
      case 'По убыванию цены':
        var dataList = this.props.dataListProps.dataList;
        dataList.sort((a, b) => {
          if (a.price === undefined) {
            return true;
          }
          if (b.price === undefined) {
            return false;
          }
          return b.price - a.price;
        });
        this.props.actionSetDataList({dataList: dataList});
        break;
      default:
        break;
    }
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
      <div className={style.sortingList}>
        <div className={style.sortingListItem} onClick={() => this.handleOnClick('По популярности')}>
          <span>По популярности</span>
          <i style={{display: this.props.sortingProps.sortType === 'По популярности' ? 'block' : 'none'}} />
        </div>
        <div className={style.sortingListItem} onClick={() => this.handleOnClick('По возрастанию цены')}>
          <span>По возрастанию цены</span>
          <i style={{display: this.props.sortingProps.sortType === 'По возрастанию цены' ? 'block' : 'none'}} />
        </div>
        <div className={style.sortingListItem} onClick={() => this.handleOnClick('По убыванию цены')}>
          <span>По убыванию цены</span>
          <i style={{display: this.props.sortingProps.sortType === 'По убыванию цены' ? 'block' : 'none'}} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filtersProps: state.reducerSetFilters,
  sortingProps: state.reducerSetSorting,
  dataListProps: state.reducerSetDataList
});

const mapDispatchToProps = {
  actionSetSorting,
  actionShowLists,
  actionSetDataList
};

const SortingListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingList);

export default SortingListContainer;
