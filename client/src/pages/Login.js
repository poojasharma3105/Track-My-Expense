import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  // Handle form submission
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/users/login`, values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid credentials. Please try again.");
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      {loading && <Spinner />}
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="text-center fw-bold mb-4">Login</h3>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item 
              label="Email" 
              name="email" 
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" className="form-control" />
            </Form.Item>
            <Form.Item 
              label="Password" 
              name="password" 
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input type="password" placeholder="Enter your password" className="form-control" />
            </Form.Item>
            <button className="btn btn-primary w-100 mt-2" type="submit">Login</button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/register">Not a user? Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
