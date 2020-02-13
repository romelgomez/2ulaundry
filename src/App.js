import React from "react";
import "./App.css";

import {
  Table,
  // Divider,
  Tag
} from 'antd';


import "antd/es/table/style/css";
import "antd/es/tag/style/css";

import data from './fake_invoices';

// TODO: 
// "invoice_number": 0,
// "total": "3,550.39",
// "currency": "PEN",
// "invoice_date": "2020-02-13",
// "due_date": "2020-02-14",
// "vendor_name": "ZILLIDIUM",
// "remittance_address": "428 Bragg Court, Chalfant, Colorado, 4185"
// "status": "Approved"

const columns = [
  {
    title: 'Invoice #',
    dataIndex: 'invoice_number',
  },
  // TODO: TO COMMENT, NOT REQUESTED 
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: tag => (
      <span>
        {<Tag color={tag === 'pending' ? 'volcano' : 'green'} key={tag}>
          {tag.toUpperCase()}
        </Tag>}
      </span>
    ),
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
  },
  {
    title: 'Invoice Date',
    dataIndex: 'invoice_date',
  },
  {
    title: 'Due Date',
    dataIndex: 'due_date',
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor_name',
  },
  {
    title: 'Remittance Address',
    dataIndex: 'remittance_address',
  },
];

function App() {
  return (
    <div className="App">
      <h3 style={{ marginBottom: 16 }}>2ulaundry</h3>
      <Table rowKey={record => record.invoice_number} dataSource={data.filter(invoice => invoice.status === 'pending').reverse()} columns={columns} />
    </div>
  );
}

export default App;
