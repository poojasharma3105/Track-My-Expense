import React, { useState, useEffect, useCallback } from "react";
import { Input, Modal, Select, Form, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import Analytics from "../components/Analytics";
import "bootstrap/dist/css/bootstrap.min.css";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            className="text-primary mx-2"
          />
          <DeleteOutlined
            onClick={() => handleDelete(record._id)}
            className="text-danger mx-2"
          />
        </div>
      ),
    },
  ];

  const getAllTransactions = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(`${API_URL}/transactions/get-transaction`, {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  }, [frequency, selectedDate, type, API_URL]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post(`${API_URL}/transactions/edit-transaction`, {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        message.success("Transaction updated successfully");
      } else {
        await axios.post(`${API_URL}/transactions/add-transaction`, {
          ...values,
          userid: user._id,
        });
        message.success("Transaction added successfully");
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/transactions/delete-transaction`, { transactionId: id });
      message.success("Transaction deleted successfully");
      setLoading(false);
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        {loading && <Spinner />}
        
        {/* Frequency and Type Selectors */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-3">
          <div className="mb-3 mb-lg-0">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)} style={{ width: 200 }}>
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>
              <Select.Option value="365">LAST 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(dates) => setSelectedDate(dates)}
                className="mt-2"
              />
            )}
          </div>

          <div className="mb-3 mb-lg-0">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)} style={{ width: 200 }}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </div>

          {/* View Options (Table / Analytics) */}
          <div className="d-flex mb-3 mb-lg-0 align-items-center">
            <UnorderedListOutlined
              className={`mx-2 ${viewData === "table" ? "text-primary" : "text-secondary"}`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${viewData === "analytics" ? "text-primary" : "text-secondary"}`}
              onClick={() => setViewData("analytics")}
            />
          </div>

          {/* Add New Button */}
          <button className="btn btn-primary mb-3 mb-lg-0" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>

        {/* Table / Analytics View */}
        <div className="container-fluid">
  {viewData === "table" ? (
    <div className="table-responsive">
      <Table 
        columns={columns} 
        dataSource={allTransaction} 
        rowKey="_id" 
        pagination={{ pageSize: 10 }} 
        scroll={{ x: "max-content" }} 
      />
    </div>
  ) : (
    <div className="d-flex flex-wrap justify-content-center">
      <Analytics allTransaction={allTransaction} />
    </div>
  )}
</div>


        {/* Modal Form */}
        <Modal
          title={editable ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
          width="90%"
          maxWidth={500}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={
              editable ? { ...editable, date: moment(editable.date) } : {}
            }
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;
