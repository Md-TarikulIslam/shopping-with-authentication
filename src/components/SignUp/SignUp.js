import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

const SignUp = () => {
  const [error, setError] = useState(null);

  const { createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    console.log(email, password, confirm);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      setError("Your Password did not match");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("sign up user", user);
        form.reset();
      })
      .catch((error) => console.error("signup error", error));
  };

  return (
    <div>
      <div className="form-container">
        <h1 className="form-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" id="confirm" required />
          </div>
          <input className="btn-submit" type="submit" value="SignUp" />
        </form>
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
        <p className="text-error">{error}</p>
      </div>
    </div>
  );
};

export default SignUp;
