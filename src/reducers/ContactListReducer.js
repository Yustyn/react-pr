const initialState = {
  List: [],
  CurrectContactIndex: null,
  SearchName: null,
  SearchProps: "Name",
};

const ContactListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        List: action.payload,
      };
    case "LIST_LOADED":
      return {
        ...state,
        List: action.payload,
      };
    case "ADD_CONTACT":
      return {
        ...state,
        List: action.payload,
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        List: state.List.map((contact, i) =>
          i === action.payload.index
            ? { ...contact, Status: action.payload.status }
            : contact
        ),
      };
    case "EDIT_TRIGGER":
      return {
        ...state,
        CurrectContactIndex: action.payload,
      };
    case "ADD_EDIT_CONTACT":
      return {
        ...state,
        List: action.payload,
      };
    case "SHOW_CONTACT":
      return {
        ...state,
        SearchName: action.payload,
      };
    case "SEARCH_PROPS":
      return {
        ...state,
        SearchProps: action.payload,
      };
    default:
      return state;
  }
};
export default ContactListReducer;
