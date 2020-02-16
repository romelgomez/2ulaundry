// React | Antd | Verdors
import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Table,
  Modal,
  Tag,
  Button,
  notification
} from 'antd';

// Services
import { invoicesRef, updateInvoiceStatus } from './invoices.service';

// Styles
import 'antd/es/table/style/css';
import 'antd/es/tag/style/css';
import 'antd/es/modal/style/css';
import 'antd/es/notification/style/css';


const { confirm } = Modal;

const columns = [
  {
    title: 'Invoice #',
    dataIndex: 'invoice_number'
  },
  // TODO: TO COMMENT, NOT REQUESTED
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: tag => (
      <span>
        {
          <Tag color={tag === 'pending' ? 'volcano' : 'green'} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        }
      </span>
    )
  },
  {
    title: 'Total',
    dataIndex: 'total'
  },
  {
    title: 'Currency',
    dataIndex: 'currency'
  },
  {
    title: 'Invoice Date',
    dataIndex: 'invoice_date'
  },
  {
    title: 'Due Date',
    dataIndex: 'due_date'
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor_name'
  },
  {
    title: 'Remittance Address',
    dataIndex: 'remittance_address'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return (
        <span>
          <Button onClick={showConfirm(record)}>Approve</Button>
        </span>
      );
    }
  }
];

const openNotificationWithIcon = (type, invoice) => {
  notification[type]({
    message: 'DONE',
    description: `The invoce #${invoice.invoice_number} was Approved!`,
  });
};

/**
 * showConfirm function is a closure that return a function that open an modal to Approve the invoice.
 */
function showConfirm(invoice) {
  return () => {
    confirm({
      title: `Do you want to Approve the invoice #${invoice.invoice_number}?`,
      content: 'This action can\'t be rollback',
      onOk() {
        return new Promise((resolve, reject) => {

          updateInvoiceStatus(invoice.objID, 'Approved')
            .then(() => {
              openNotificationWithIcon('success', invoice);
              resolve();
            })
            .catch((reason) => {
              reject(reason);
            });

        }).catch(err => {
          console.error('err', err);
          // TODO: Show ERROR MESSAGE
        });
      },
      onCancel() { }
    });
  };
}

function App() {
  const [invoices, setInvoices] = useState([]);

  // componentDidMount
  useEffect(() => {

    invoicesRef
      .on('value', (snapshot) => {

        var objects = snapshot.val();
        var invoices = [];

        for (var objID in objects) {
          if (objects.hasOwnProperty(objID)) {
            invoices.push({
              ...objects[objID],
              objID: objID
            });
          }
        }

        setInvoices(invoices);
      });

    return () => {
      // UNMOUNTED
      invoicesRef.off();
    };

  }, []);

  return (
    <div className='App'>
      <h3 style={{ marginBottom: 16 }}>2ulaundry</h3>
      <Table
        rowKey={record => record.objID}
        dataSource={invoices
          .filter(invoice => invoice.status === 'pending')
          .reverse()}
        columns={columns}
      />
    </div>
  );
}

export default App;
