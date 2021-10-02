import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signinHandle } from "./../redux/usersReducer";
import LoadingBox from "./../comps/LaodingBox";
import AlertBox from "./../comps/AlertBox";

const SigninPage = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, usersInfo } = useSelector((state) => state.usersList);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinHandle(email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (usersInfo !== null) {
      history.push(redirect);
    }
  }, [usersInfo, history, redirect]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <LoadingBox />}
            {error && <AlertBox>{error}</AlertBox>}
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
            <button type="submit" className="button primary">
              Sign In
            </button>
          </li>
          <li>new to Amazzon?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : `register?redirect=${redirect}`
              }
              className="button secondary text-center"
            >
              Create an account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SigninPage;
