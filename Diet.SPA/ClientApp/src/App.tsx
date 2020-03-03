import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import AuthenticationComponent from "./authorization/authentication";
import Routes from "./routing/routes";
import history from "./history";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthenticationComponent>
          <Router history={history}>
            <Routes />
          </Router>
        </AuthenticationComponent>
      </Provider>
    </div>
  );
};

export default App;
