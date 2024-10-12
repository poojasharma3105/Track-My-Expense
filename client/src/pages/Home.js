import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, AreaChartOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import Spinner from "../components/Layout/Spinner.js";
import Analytics from "../components/Analytics.js";
const { RangePicker } = DatePicker;

const Home = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransaction, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState("7");
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState("all");
    const [viewData, setViewData] = useState("table");
    const [editable, setEditable] = useState(null);

    // table data format
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
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
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Actions",
            render: (text, record) => {
                return (
                    <div>
                        <EditOutlined onClick={() => {
                            setEditable(record);
                            setShowModal(true);
                        }} />
                        <DeleteOutlined 
                            className="mx-2"
                            onClick={() => handleDelete(record._id)}
                        />
                    </div>
                );
            }
        },
    ];

    // Fetch all transactions function
    const getAllTransactions = useCallback(async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const res = await axios.post("/transactions/get-transaction", { 
                userid: user._id, 
                frequency,
                selectedDate,
                type,
            });
            setAllTransaction(res.data);
        } catch (err) {
            console.log(err);
            message.error("Fetch issue with transaction");
        } finally {
            setLoading(false);
        }
    }, [frequency, selectedDate, type]); // Add dependencies here

    useEffect(() => {
        getAllTransactions();
    }, [getAllTransactions]); // Add getAllTransactions as a dependency

    // Delete handler
    const handleDelete = async (transactionId) => {
        try {
            setLoading(true);
            await axios.post("/transactions/delete-transaction", { transactionId });
            message.success("Transaction deleted successfully!");
            // Refresh transactions
            await getAllTransactions();
        } catch (error) {
            console.log(error);
            message.error("Failed to delete transaction");
        } finally {
            setLoading(false);
        }
    };

    // Form handling
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            if (editable) {
                await axios.post("/transactions/edit-transaction", { 
                    payload: {
                        ...values,
                        userId: user._id
                    },
                    transactionId: editable._id
                });
                message.success("Transaction Updated Successfully!");
            } else {
                await axios.post("/transactions/add-transaction", { 
                    ...values, 
                    userid: user._id 
                });
                message.success("Transaction Added Successfully!");
            }
            setShowModal(false);
            setEditable(null);
            // Refresh transactions
            await getAllTransactions();
        } catch (err) {
            console.log(err);
            message.error("Failed to add transaction!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters">
                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(values) => setFrequency(values)}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="30">Last 1 Month</Select.Option>
                        <Select.Option value="365">Last 1 Year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {frequency === "custom" && 
                      <RangePicker 
                      value={selectedDate} 
                      onChange={(values) => setSelectedDate(values)} 
                    />}
                </div>

                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">ALL</Select.Option>
                        <Select.Option value="income">INCOME</Select.Option>
                        <Select.Option value="expense">EXPENSE</Select.Option>
                    </Select>
                    {frequency === "custom" && 
                      <RangePicker 
                      value={selectedDate} 
                      onChange={(values) => setSelectedDate(values)} 
                    />}
                </div>

                <div className="switch-icon">
                    <UnorderedListOutlined
                      className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"} `}
                      onClick={() => setViewData("table")}
                    />
                    <AreaChartOutlined 
                      className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"} `}
                      onClick={() => setViewData("analytics")}
                    />
                </div>
                <div>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => setShowModal(true)}
                    >
                        Add New
                    </button>
                </div>
            </div>
            <div className="content">
                { viewData === "table" ? 
                  <Table 
                    columns={columns} 
                    dataSource={allTransaction.map(transaction => ({ 
                        ...transaction, 
                        key: transaction._id // Use a unique key, ideally an ID from your data 
                    }))} 
                  />
                  : <Analytics allTransaction={allTransaction}/>
                }  
            </div>

            <Modal 
                title={editable ? "Edit Transaction" : "Add Transaction"} 
                open={showModal} 
                onCancel={() => setShowModal(false)} 
                footer={false}
            >
                <Form 
                    layout="vertical" 
                    onFinish={handleSubmit} 
                    initialValues={editable}
                >
                    <Form.Item 
                        label="Amount" 
                        name="amount" 
                        rules={[{ required: true, message: "Amount is required" }]} // Added validation rule
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item 
                        label="Type" 
                        name="type" 
                        rules={[{ required: true, message: "Type is required" }]} // Added validation rule
                    >
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Category" 
                        name="category" 
                        rules={[{ required: true, message: "Category is required" }]} // Added validation rule
                    >
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="shopping">Shopping</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fee">Fees</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Date" 
                        name="date" 
                        rules={[{ required: true, message: "Date is required" }]} // Added validation rule
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item 
                        label="Reference" 
                        name="reference"
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item 
                        label="Description" 
                        name="description"
                    >
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary"> SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default Home;
