export const SHOW_LISTS = 'SHOW_LISTS';
export const SET_SORTING = 'SET_SORTING';

export const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';

export const SET_FILTERS = 'SET_FILTERS';

export const SET_SELLERS_LIST = 'SET_SELLERS_LIST';
export const SET_DATA_LIST = 'SET_DATA_LIST';
export const SET_ADVERT_LIKED = 'SET_ADVERT_LIKED';

export const actionShowLists = (payload) => ({
  type: SHOW_LISTS,
  payload: {
    isFilterHidden: payload.isFilterHidden,
    isSortingHidden: payload.isSortingHidden
  }
});

export const actionSetSorting = (payload) => ({
  type: SET_SORTING,
  payload: {
    sortType: payload.sortType
  }
});

export const actionSetFilters = (payload) => ({
  type: SET_FILTERS,
  payload: {
    categories: payload.categories,
    priceFrom: payload.priceFrom,
    priceTo: payload.priceTo,
    favorites: payload.favorites
  }
});

export const actionSetProductsLists = (payload) => ({
  type: SET_PRODUCTS_LIST,
  payload: {
    productsList: payload.productsList,
    isLoaded: payload.isLoaded
  }
});

export const actionSetSellersLists = (payload) => ({
  type: SET_SELLERS_LIST,
  payload: {
    sellersList: payload.sellersList,
    isLoaded: payload.isLoaded
  }
});

export const actionSetDataList = (payload) => ({
  type: SET_DATA_LIST,
  payload: {
    dataList: payload.dataList
  }
});
