import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { AddEditContact } from "../../actions/ContactListAction";
import { connect } from "react-redux";
import { updateContacts } from "../../services/apiservice";
import { browserHistory } from "react-router";
class EditContact extends React.Component {
  state = {
    Avatar: this.props.List[this.props.CurrectContactIndex].Avatar,
    Gender: this.props.List[this.props.CurrectContactIndex].Gender,
    Name: this.props.List[this.props.CurrectContactIndex].Name,
    Phone: this.props.List[this.props.CurrectContactIndex].Phone,
    Email: this.props.List[this.props.CurrectContactIndex].Email,
    Status: this.props.List[this.props.CurrectContactIndex].Status,
    DynamicImg: "",
    Id: this.props.List[this.props.CurrectContactIndex].Id,
    isRedirect: null,
  };
  getName = (e) => {
    console.log(this.props.List);
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
  sendForm = (e) => {
    e.preventDefault();
    const { CurrectContactIndex } = this.props;
    const { AddEditContact, List } = this.props;
    const newContact = {
      Id: this.state.Id,
      Avatar: this.state.Avatar,
      Gender: this.state.Gender,
      Name: this.state.Name,
      Phone: this.state.Phone,
      Email: this.state.Email,
      Status: this.state.Status,
    };
    console.log("LOCAL STATE", this.state);
    console.log("LIST from Props", List);
    console.log("index", CurrectContactIndex, "New contact", newContact);
    List[CurrectContactIndex] = newContact;
    console.log(List);
    AddEditContact(List);
    updateContacts(List);
    this.setState({
      isRedirect: true,
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
    const { CurrectContactIndex } = this.props;
    const { Avatar, Gender, Name, Phone, Email, Status } =
      this.props.List[CurrectContactIndex];
    if (this.state.isRedirect) {
      return <Redirect to="/" />;
    } else if (this.props.length == 0) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="container">
          <h2 className="mt-3" style={{ textAlign: "center", fontSize: "35px" }} >
            Edit contact
          </h2>
          <form onSubmit={this.sendForm}>
            <div className="row col-12">
              <div className="col-6">
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" value={this.state.Name} onChange={(e) => this.getName(e)} />
                  </fieldset>
                </div>

                <div className="form-group">
                  <fieldset>
                    <label className="form-label mt-4">Email</label>
                    <input className="form-control" type="email" value={this.state.Email} onChange={(e) => this.getEmail(e)} required />
                  </fieldset>
                </div>

                <div className="form-group">
                  <label className="form-label mt-4">Phone</label>
                  <input type="phone" value={this.state.Phone} className="form-control" onChange={(e) => this.getPhone(e)} required />
                </div>

                <div className="form-group">
                  <label className="form-label mt-4">Status</label>
                  <input type="text" value={this.state.Status} className="form-control" onChange={(e) => this.getStatus(e)} required />
                </div>
              </div>
              <div className="col-5 preview-avatar mt-5 ml-5" style={{ backgroundImage: `url('${this.state.DynamicImg}')` }} ></div>
            </div>
            <div>
              <div className="form-group col-12">
                <label className="col-form-label col-form-label-lg mt-4">
                  Gender
                </label>
                <select className="form-control" type="text" onClick={this.getGender} required >
                  <option value="men">Male</option>
                  <option value="women">Female</option>
                </select>
              </div>

              <div className="form-group  col-12">
                <label className="col-form-label mt-4">Avatar</label>
                <input type="number" min="0" max="99" className="form-control" onChange={(this.getAvatar, this.PreviewAvatar)} required value={this.state.Avatar} />
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
  const { List, CurrectContactIndex } = ContactListReducer;
  return { List, CurrectContactIndex };
};
const mapDispatchToProps = {
  AddEditContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
