import React from "react";
import { connect } from "react-redux";
import { getAllContacts } from "../../services/apiservice";
import {
  FindSearchName,
  FindSearchProps,
} from "../../actions/ContactListAction";

// Actions
import { getContacts } from "../../actions/ContactListAction";

// ContactItem
import ContactItem from "./ContactItem/ContactItem";

class ContactList extends React.Component {
  componentDidMount() {
    const { getContacts } = this.props;
    getAllContacts().then((data) => {
      if (data === null) {
        getContacts([]);
      } else {
        getContacts(data);
      }
    });
  }
  onShowContact = () => {
    const { List, SearchName, SearchProps } = this.props;
    if (SearchName === null || SearchName.length === 0) {
      return List;
    }
    return List.filter((item) => {
      return (
        item[`${SearchProps}`].toLowerCase().indexOf(SearchName.toLowerCase()) >
        -1
      );
    });
  };
  render() {
    const filterList = this.onShowContact();
    return (
      <div className="container bootstrap snippets bootdeys bootdey">
        <div className="row decor-default">
          <div className="col-sm-12">
            <div className="contacts-list">
              <h5 className="title">Contact List</h5>
              <div className="unit head">
                <div className="field name">
                  <div className="check">
                    <input id="cb1" name="cb1" type="checkbox" />
                    <label htmlFor="cb1"></label>
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </div>
                  Name
                </div>
                <div className="field phone">Phone</div>
                <div className="field email icons">
                  Email
                  <i className="fas fa-user-edit"></i>
                </div>
              </div>
              {filterList.length !== 0 ? (
                filterList.map((item) => {
                  return <ContactItem key={item.Id} {...item} />;
                })
              ) : (
                <h2>Contacts not found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ContactListReducer }) => {
  const { List, SearchName, SearchProps } = ContactListReducer;
  return { List, SearchName, SearchProps };
};
const mapDispatchToProps = {
  getContacts,
  FindSearchName,
  FindSearchProps,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
