import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { onAddContact } from "../../actions/ContactListAction";

import { connect } from "react-redux";

import { updateContacts } from "../../services/apiservice";
class AddContact extends React.Component {
  state = {
    Avatar: "",
    Gender: "",
    Name: "",
    Phone: "",
    Email: "",
    Status: "",
    DynamicImg: "",
    isRedirect: null,
  };
  getName = (e) => {
    const Name = e.target.value;
    console.log(Name);
    this.setState({
      Name: Name,
    });
  };
  getEmail = (e) => {
    const Email = e.target.value;
    console.log(Email);
    this.setState({
      Email: Email,
    });
  };
  getPhone = (e) => {
    const Phone = e.target.value;
    console.log(Phone);
    this.setState({
      Phone: Phone,
    });
  };
  getAvatar = (e) => {
    const Avatar = e.target.value;
    console.log(Avatar);
    this.setState({
      Avatar: Avatar,
    });
  };
  getGender = (e) => {
    const Gender = e.target.value;
    console.log(Gender);
    this.setState({
      Gender: Gender,
    });
  };
  getStatus = (e) => {
    const Status = e.target.value;
    console.log(Status);
    this.setState({
      Status: Status,
    });
  };
  sendForm = async (e) => {
    e.preventDefault();
    const { Avatar, Gender, Name, Phone, Email, Status } = this.state;
    const { onAddContact, List } = this.props;
    const newContact = {
      Id: uuidv4(),
      Avatar: Avatar,
      Gender: Gender,
      Name: Name,
      Phone: Phone,
      Email: Email,
      Status: Status,
    };
    let tmpList = List.slice();
    tmpList.unshift(newContact);
    onAddContact(tmpList);
    updateContacts(tmpList).then(() => {
      this.setState({
        isRedirect: true,
      });
    });
  };
  PreviewAvatar = (e) => {
    const Gender = this.state.Gender;
    const DynamicImg = e.target.value;
    this.setState({
      DynamicImg: `https://randomuser.me/portraits/${Gender}/${DynamicImg}.jpg`,
      Avatar: DynamicImg,
    });
  };
  render() {
    const { Avatar, Gender, Name, Phone, Email, Status, DynamicImg } =
      this.state;
    if (this.state.isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="container">
          <h2 className="mt-3" style={{ textAlign: "center", fontSize: "35px" }} > Add new contact </h2>
          <form onSubmit={this.sendForm}>
            <div className="row col-12">
              <div className="col-6">
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" placeholder={Name} onChange={this.getName} required />
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset>
                    <label className="form-label mt-4">Email</label>
                    <input className="form-control" type="email" placeholder={Email} onChange={this.getEmail} required />
                  </fieldset>
                </div>

                <div className="form-group">
                  <label className="form-label mt-4">Phone</label>
                  <input type="phone" placeholder={Phone} className="form-control" onChange={this.getPhone} required />
                </div>

                <div className="form-group">
                  <label className="form-label mt-4">Status</label>
                  <input type="text" placeholder={Status} className="form-control" onChange={this.getStatus} required />
                </div>
              </div>
              <div className="col-5 preview-avatar mt-5 ml-5" style={{ backgroundImage: `url('${DynamicImg}')` }}
              ></div>
            </div>
            <div>
              <div className="form-group col-12">
                <label className="col-form-label col-form-label-lg mt-4">
                  Gender
                </label>
                <select className="form-control" type="text" onClick={this.getGender} required>
                  <option value="men">Male</option>
                  <option value="women">Female</option>
                </select>
              </div>
              <div className="form-group  col-12">
                <label className="col-form-label mt-4">Avatar</label>
                <input type="number" min="0" max="99" className="form-control" onChange={(this.getAvatar, this.PreviewAvatar)} required />
              </div>
            </div>
            <div className="row justify-content-center col-12">
              <button type="submit" className="btn btn-danger col-6 mb-5 mt-4 ">
                Save
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return { List };
};
const mapDispatchToProps = {
  onAddContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
