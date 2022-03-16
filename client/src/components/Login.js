import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../api/api-routes";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        baseURL + "/user/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("jwt_token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
        console.log(parseRes)
    } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (   
      <div className="mx-auto">
      <h2 className="text-center">Login</h2>
        <form onSubmit={onSubmitForm} className="mx-auto">
        <div class="form-group form-inline ">
          <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={e => onChange(e)}
            className="form-control ml-3 mx-auto"
          />
          </div>
          <br></br>
          <div class="form-group form-inline">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={e => onChange(e)}
            className="form-control ml-3 mx-auto"
          />
          </div>
          <div className="text-center">
        <Link className="mt-2 me-2 ml-3 text-center" to="/register">Create Account</Link>
          <button className="btn btn-success mt-2 me-2 ml-3 mx-auto">Submit</button>
          </div>
        </form>
    </div>
  );
};

export default Login;