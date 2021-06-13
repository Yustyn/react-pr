export const getContacts = (list) => {
  return {
    type: "LIST_LOADED",
    payload: list,
  };
};
export const onAddContact = (newContacts) => {
  return {
    type: "ADD_CONTACT",
    payload: newContacts,
  };
};
export const DeleteContact = (CurrectContactIndex) => {
  return {
    type: "DELETE_CONTACT",
    payload: CurrectContactIndex,
  };
};
export const StatusChange = (index, status) => {
  return {
    type: "CHANGE_STATUS",
    payload: { index, status },
  };
};
export const onEditContact = (CurrectContactIndex) => {
  return {
    type: "EDIT_TRIGGER",
    payload: CurrectContactIndex,
  };
};
export const AddEditContact = (newContacts) => {
  return {
    type: "ADD_EDIT_CONTACT",
    payload: newContacts,
  };
};
export const FindSearchName = (SearchName) => {
  return {
    type: "SHOW_CONTACT",
    payload: SearchName,
  };
};
export const FindSearchProps = (SearchProps) => {
  return {
    type: "SEARCH_PROPS",
    payload: SearchProps,
  };
};
