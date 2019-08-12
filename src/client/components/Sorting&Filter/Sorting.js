import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {actionShowLists} from '../../actions';
import style from './style.scss';
import SortingList from './SortingList';

class Sorting extends PureComponent {
  constructor(props) {
    super(props);
    this.onOpenList = this.onOpenList.bind(this);
  }

  onOpenList = () => {
    this.props.actionShowLists({isSortingHidden: !this.props.listsProps.isSortingHidden});
  };

  render() {
    return (
      <div>
        <div
          id="sorting"
          className={style.filter}
          style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
          onClick={this.onOpenList}
        >
          <span>{this.props.sortingProps.sortType}</span>
          <i style={{transform: this.props.listsProps.isSortingHidden ? '' : 'rotate(0.5turn)'}} />
        </div>
        <div style={{display: this.props.listsProps.isSortingHidden ? 'none' : 'block'}}>
          <SortingList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listsProps: state.reducerShowLists,
  sortingProps: state.reducerSetSorting
});

const mapDispatchToProps = {
  actionShowLists
};

const SortingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sorting);

export default SortingContainer;
