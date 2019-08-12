import {combineReducers} from 'redux';

import {SHOW_LISTS, SET_SORTING, SET_FILTERS, SET_PRODUCTS_LIST, SET_SELLERS_LIST, SET_DATA_LIST} from './actions';

export const reducerShowLists = (state = {isFilterHidden: true, isSortingHidden: true}, action) => {
  switch (action.type) {
    case SHOW_LISTS:
      return action.payload;
    default:
      return state;
  }
};

export const reducerSetSorting = (state = {sortType: 'По популярности'}, action) => {
  switch (action.type) {
    case SET_SORTING:
      return action.payload;
    default:
      return state;
  }
};

export const reducerSetFilters = (state = {categories: [], favorites: false}, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return action.payload;
    default:
      return state;
  }
};

export const reducerSetProductsList = (state = {isLoaded: false}, action) => {
  switch (action.type) {
    case SET_PRODUCTS_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const reducerSetSellersList = (state = {isLoaded: false}, action) => {
  switch (action.type) {
    case SET_SELLERS_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const reducerSetDataList = (state = {}, action) => {
  switch (action.type) {
    case SET_DATA_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  reducerShowLists,
  reducerSetSorting,
  reducerSetFilters,
  reducerSetProductsList,
  reducerSetSellersList,
  reducerSetDataList
});
