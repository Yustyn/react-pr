import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import NotFound from "./Components/NotFound/NotFound";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import AddContact from "./Components/AddContact/AddContact";

// API
import EditContact from "./Components/EditContact/EditContact";

// Store
import store from "./store/store";
import { Provider } from "react-redux";

// Actions
class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact render={() => <ContactList />} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/about" exact component={About} />
              <Route path="/add-contact" exact render={() => <AddContact />} />
              <Route
                path="/Edit-contact"
                exact
                render={() => <EditContact />}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
          <Footer />
        </Provider>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
