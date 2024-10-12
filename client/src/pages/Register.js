import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./../components/Layout/Spinner.js";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration successful!");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      message.error("Invalid username or password");
    }
  };

  // Prevent logged-in user from accessing the register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register Form</h1>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <div className="d-flex justify-content-between">
          <Link to="/login" className="link">Already registered? Click here to login</Link>
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
