import React from "react";
import "./App.css";
import {
  Table,
  Modal,
  // Divider,
  Tag,
  Button
} from 'antd';

// Styles
import "antd/es/table/style/css";
import "antd/es/tag/style/css";
import "antd/es/modal/style/css";

// Fake
import data from './fake_invoices';

const { confirm } = Modal;

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
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {

      return (
        <span>
          <Button onClick={showConfirm(record.invoice_number)}  >Approve</Button>
        </span>
      )

    },
  },
];

/**
 * showConfirm function is a closure that return a function that open an modal to Approve the invoice.
 * @param {string} invoiceNumber 
 */
function showConfirm(invoiceNumber) {

  return () => {
    confirm({
      title: 'Do you want to Approve this Invoice?',
      content: 'This action can\'t be rollback',
      onOk() {

        return new Promise((resolve, reject) => {

          // TODO: Call the service
          console.log('Call the service', invoiceNumber);

          // This randomly will fail 
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

        })
          .catch((err) => {

            console.error('err', err);
            // TODO: Show ERROR MESSAGE

          });

      },
      onCancel() { },
    });
  }
}


function App() {
  return (
    <div className="App">
      <h3 style={{ marginBottom: 16 }}>2ulaundry</h3>
      <Table rowKey={record => record.invoice_number} dataSource={data.filter(invoice => invoice.status === 'pending').reverse()} columns={columns} />
    </div>
  );
}

export default App;
