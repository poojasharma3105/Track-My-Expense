import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  // Handle form submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      console.log("Submitting values:", values); 
      await axios.post(`${API_URL}/users/register`, values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      message.error(errorMsg);
    }
  };

  // Prevent logged-in users from accessing the register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler} className="register-form">
        <h1 className="text-center">Register Form</h1>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/login">Already registered? Click here to login</Link>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
