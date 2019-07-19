import React from "react";
import ReactDOM from "react-dom";
import firebase from "./firebase";
import App from "./Component/App";
import Login from "./Component/Auth/Login";
import Spinner from "./Spinner";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import "semantic-ui-css/semantic.min.css";

import {
  Route,
  withRouter,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Reducer";
import { setUser, clearUser, setLoading } from "./Action";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
        this.props.setUser(user); // save user data to redux state
        this.props.history.push("/");
      } else {
        this.setState({ user: null });
        this.props.clearUser();
        this.props.history.push("/");
        // clear user data from redux state
      }
    });
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Login" component={Login} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    {
      setUser,
      clearUser,
      setLoading
    }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
