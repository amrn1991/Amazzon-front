import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "./../redux/registerReducer";

const RegisterPage = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  const { loading, error, usersInfo } = useSelector((state) => state.usersList);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (usersInfo !== null) {
      history.push(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersInfo]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Register</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="repass">Re-Enter Password</label>
            <input
              type="password"
              id="repass"
              name="repass"
              onChange={(e) => setRepass(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <Link
              to={redirect === "/" ? "signin" : `signin?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterPage;
