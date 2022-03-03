import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/user/register",
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
        toast.success("Register Successfully");
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
      <h1 className="text-center">Register</h1>
      <form onSubmit={onSubmitForm} className="mx-auto">
      <div class="form-group form-inline">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3 form-control ml-3 mx-auto"
        />
        </div>
        <div class="form-group form-inline">
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3 form-control ml-3 mx-auto"
        />
        </div>
        <div class="form-group form-inline ">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={e => onChange(e)}
          className="form-control my-3 form-control ml-3 mx-auto"
        />
        </div>
        <div className="text-center">
      <Link className="mt-2 me-2 ml-3 text-center" to="/login">Login</Link>
        <button className="btn btn-success mt-2 me-2 ml-3 mx-auto">Submit</button>
    </div>
      </form>
    </div>
  );
};

export default Register;