// Login.js
import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Handle form submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/users/login`, values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler} className="login-form">
        <h1 className="text-center">Login Form</h1>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/register">Not a user? Click here to register</Link>
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
