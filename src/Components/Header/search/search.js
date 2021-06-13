import React from "react";
import { connect } from "react-redux";
import {
  FindSearchName,
  FindSearchProps,
} from "../../../actions/ContactListAction";

class Search extends React.Component {
  state = {
    findContact: "",
    findProp: "",
  };

  searchName = (event) => {
    const { FindSearchName } = this.props;
    let SearchName = event.target.value;
    FindSearchName(SearchName);
  };
  searchProp = (event) => {
    const { FindSearchProps } = this.props;
    let SearchProps = event.target.value;
    FindSearchProps(SearchProps);
  };

  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          onChange={this.searchName}
          type="text"
          placeholder="Search"
        />
        <select className="form-control mr-sm-2" onClick={this.searchProp}>
          <option selected>Name</option>
          <option>Phone</option>
          <option>Email</option>
          <option>Status</option>
        </select>
      </form>
    );
  }
}
const mapStateToProps = ({ ContactListReducer }) => {
  const { SearchName, List, SearchProps } = ContactListReducer;
  return { List, SearchName, SearchProps };
};
const mapDispatchToProps = {
  FindSearchName,
  FindSearchProps,
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
