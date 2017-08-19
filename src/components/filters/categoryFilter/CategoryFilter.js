import { connect } from 'react-redux';
import CheckBoxFilterContainer from '../checkBoxFilter/CheckBoxFilterContainer';
import { getAllCategories } from '../../../reducers/root';
import { createDefaultObjectFrom } from '../../../utils';

const mapStateToProps = (state) => {
  const value = getAllCategories(state);

  return {
    value: value ? createDefaultObjectFrom(value, false) : {},
    title: 'Categories',
  };
};

export default connect(mapStateToProps)(CheckBoxFilterContainer);
