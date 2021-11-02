import { useState, useEffect } from "react";
import { Redirect } from "react-router";
export default function LoginRegister({ submit, name }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleInputChange = e => {
    const { value, name } = e.target;
    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;

      default:
        return;
    }
  };
  const handleFormSubmit = e => {
    e.preventDefault();

    submit({
      user: {
        email,
        password,
      },
    });
    e.target.reset();
    return <Redirect push to="/" />;
  };
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <a className="nav-link active" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/login">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                Sign up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">{name}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Log in</h1>
              <p className="text-xs-center">
                <a href="">Don*t have an account?</a>
              </p>

              <ul className="error-messages">
                <li>Please login</li>
              </ul>

              <form onSubmit={handleFormSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
