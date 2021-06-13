import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  DeleteContact,
  StatusChange,
  onEditContact,
} from "../../../actions/ContactListAction";
import { updateContacts } from "../../../services/apiservice";
const ContactItem = (props) => {
  const { List } = props;
  const { Id, DeleteContact, StatusChange, onEditContact } = props;
  const { Avatar, Gender, Name, Phone, Email, Status } = props;
  const image = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`;

  const index = List.findIndex((elem) => elem.Id === Id);

  const onDelete = () => {
    const partOne = List.slice(0, index);
    const partTwo = List.slice(index + 1);
    const tmpList = [...partOne, ...partTwo];
    DeleteContact(tmpList);
    updateContacts(tmpList);
  };

  const changeStatus = () => {
    const index = List.findIndex((elem) => elem.Id === Id);
    let lab = document.getElementsByClassName('lab-warning')
    if (List[index].Status === "Work") {
      List[index].Status = "Friends";
      for (let i = 0; i < lab.length; i++) {
        lab[i].addEventListener('click', () => {
          lab[i].style.background = 'green'
        })
      }
      StatusChange(index, "Friends");
      updateContacts(List);
    } else if (List[index].Status === "Friends") {
      List[index].Status = "Family";
      for (let i = 0; i < lab.length; i++) {
        lab[i].addEventListener('click', () => {
          lab[i].style.background = 'red'
        })
      }
      StatusChange(index, "Family");
      updateContacts(List);
    } else if (List[index].Status === "Family") {
      List[index].Status = "Work";
      for (let i = 0; i < lab.length; i++) {
        lab[i].addEventListener('click', () => {
          lab[i].style.background = '#f2a654'
        })
      }
      StatusChange(index, "Work");
      updateContacts(List);
    } else {
      List[index].Status = "Work";
      StatusChange(index, "Work");
      updateContacts(List);
    }
  };
  const onEdit = () => {
    console.log(onEditContact(index));
    onEditContact(index);
  };
  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
        <div>
          <img src={image} alt="image" className="avatar" /> {Name}
        </div>
        <div className="lab lab-warning" onClick={changeStatus}>
          {Status}
        </div>
      </div>
      <div className="field phone">{Phone}</div>
      <div className="field email">
        {Email}
        <Link to="/Edit-contact">
          {" "}
          <FontAwesomeIcon onClick={onEdit} icon={faEdit} size="lg" />
        </Link>
        <FontAwesomeIcon onClick={onDelete} icon={faTrash} size="lg" />
      </div>
    </div>
  );
};
const mapStateToProps = ({ ContactListReducer }) => {
  const { List, CurrectContactIndex } = ContactListReducer;
  return { List, CurrectContactIndex };
};
const mapDispatchToProps = {
  DeleteContact,
  StatusChange,
  onEditContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
