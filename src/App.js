import React from "react";
import "./App.css";

import { List, Typography } from "antd";
import "antd/es/list/style/css";
import "antd/es/typography/style/css";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires."
];

function App() {
  return (
    <div className="App">
      <h3 style={{ marginBottom: 16 }}>Invoices List</h3>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
