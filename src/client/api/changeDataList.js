export default function changeData(categories, priceFrom, priceTo, favorites, sortType) {
  var _array = JSON.parse(localStorage.getItem('products'));
  if (categories.length !== 0) {
    _array = _array.filter((value) => {
      if (
        categories.some((key) => {
          return key === value.category;
        })
      ) {
        return true;
      }
      return false;
    });
  }

  if (priceFrom !== undefined && priceFrom !== '') {
    _array = _array.filter((value) => {
      if (value.price > priceFrom && value.price !== undefined) {
        return true;
      }
      return false;
    });
  }
  if (priceTo !== undefined && priceTo !== '') {
    _array = _array.filter((value) => {
      if (value.price < priceTo && value.price !== undefined) {
        return true;
      }
      return false;
    });
  }

  if (favorites) {
    var _favorites = JSON.parse(localStorage.getItem('favorites'));
    _array = _array.filter((value) => {
      return _favorites['id'].some((id) => {
        return id === value.id;
      });
    });
  }

  switch (sortType) {
    case 'По популярности':
      break;
    case 'По возрастанию цены':
      _array.sort((a, b) => {
        if (a.price === undefined) {
          return false;
        }
        if (b.price === undefined) {
          return true;
        }
        return a.price - b.price;
      });
      break;
    case 'По убыванию цены':
      _array.sort((a, b) => {
        if (a.price === undefined) {
          return true;
        }
        if (b.price === undefined) {
          return false;
        }
        return b.price - a.price;
      });
      break;
    default:
      break;
  }

  return _array;
}
