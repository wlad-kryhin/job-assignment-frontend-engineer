import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./Article";
import ArticleList from "./ArticleList";
import Editor from "./Editor";
import LoginRegister from "./LoginRegister";
import Logout from "./Logout";
import Profile from "./Profile";
import Settings from "./Settings.jsx";
import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState(null);

  // if we reload the page, the user is automatically logged out, maybe it is worth adding a post request to get data on the token?

  const [token, setToken] = useState(null);
  const logout = boolean => {
    if (boolean) {
      setName(""), setToken(null);
    }
  };

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3000/api/user", token)
  //     .then(response => console.log(response.data))
  //     .catch(error => alert(error.message));
  // }, []);

  const submit = values => {
    axios
      .post("http://localhost:3000/api/users/login", values)
      .then(response => response.data.user)
      .then(data => {
        setName(data.username);
        setToken(data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        // window.localStorage.setItem("token", JSON.stringify(data.user.token));
        return;
      })
      .catch(error => console.log(error.message));
  };
  return (
    <Router>
      <Switch>
        <Route path="/editor" exact>
          <Editor name={name} />{" "}
        </Route>
        <Route path="/editor/:slug" exact>
          <Editor name={name} />{" "}
        </Route>
        <Route path="/register" exact>
          <LoginRegister name={name} />{" "}
        </Route>
        <Route path="/logout" exact>
          <Logout name={name} />{" "}
        </Route>
        <Route path="/profile/:username" exact>
          <Profile name={name} />{" "}
        </Route>
        <Route path="/profile/:username/favorites" exact>
          <Profile name={name} />{" "}
        </Route>
        <Route path="/login" exact>
          <LoginRegister submit={submit} name={name} />
        </Route>
        <Route path="/settings" exact>
          <Settings name={name} token={token} logout={logout} />
        </Route>

        <Route path="/:slug" exact>
          <Article name={name} />
        </Route>
        <Route path="/" exact>
          <ArticleList name={name} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
