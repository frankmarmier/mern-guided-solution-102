import React from "react";
import { Route, Switch } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import Home from "./pages/Home";
import StreetArtDetail from "./pages/StreetArtDetail";
import NewStreetArt from "./pages/NewStreetArt";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./pages/List";
import Map from "./pages/Map";
import api from "../api";

class App extends React.Component {
  state = {
    user: null,
    isLoggedIn: null,
    isLoading: true,
  };

  componentDidMount() {
    api
      .isLoggedIn()
      .then((data) => {
        console.log(data);
        this.setState({ user: data, isLoggedIn: true, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  signin = (userInfo) => {
    /**
     * By returning the promise here you can chain a .catch when you call the signin
     * function in one of the child components in order to display an error
     */
    return api.login(userInfo).then((data) => {
      this.setState({ isLoggedIn: true, user: data });
    });
  };

  logout = () => {
    /**
     * By returning the promise here you can chain a .catch when you call the logout
     * function in one of the child components in order to display an error
     */
    return api.logout().then(() => {
      this.setState({ user: null, isLoggedIn: false });
    });
  };

  render() {
    return (
      <div className="App">
        <MainNavbar
          isLoggedIn={this.state.isLoggedIn}
          handleLogout={this.logout}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
          <Route
            exact
            path="/street-art-detail/:id"
            component={StreetArtDetail}
          />
          <Route exact path="/new-street-art" component={NewStreetArt} />
          <Route
            exact
            path="/signup"
            render={(historyProps) => (
              <Signup {...historyProps} isLoggedIn={this.state.isLoggedIn} />
            )}
          />

          <Route path="/map" component={Map} />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                isLoggedIn={this.state.isLoggedIn}
                handleSignin={this.signin}
              />
            )}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
