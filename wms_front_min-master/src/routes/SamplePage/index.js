import React from "react";
import { Tag, Table } from "antd";
import moment from 'moment';
import ReactJson from 'react-json-view';



import { cardsList } from "./fixtures/data";

const SamplePage = () => {
  const renderStatusCol = (text) => {
    switch (text) {
      case "Shipped":
        return <Tag color="success">{text}</Tag>;
        break;
      case "Pending":
        return <Tag color="processing">{text}</Tag>;
        break;
      case "PartiallyShipped":
        return <Tag color="warning">{text}</Tag>;
        break;
      case "Unshipped":
        return <Tag color="error">{text}</Tag>;
        break;
      default:
        return <Tag color="default">{text}</Tag>;
    }
  };

  const columns = [
    {
      title: "Channel",
      dataIndex: ["amazon", "IsPrime"],
      key: 1,
    },
    {
      title: "Id",
      dataIndex: ["amazon", "AmazonOrderId"],
      key: 2,
    },
    {
      title: "Purchase",
      dataIndex: ["amazon", "PurchaseDate"],
      key: 3,
      render: (text) => moment(text).format("MM/DD/YYYY, h:mm:ss a")
    },
    {
      title: "Product",
      dataIndex: ["amazonActionReport", "sku"],
      key: 4,
    },
    {
      title: "Status",
      dataIndex: ["amazon", "OrderStatus"],
      key: 5,
      render: renderStatusCol
    },
  ];
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.amazonActionReport["order-id"]}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>
            <ReactJson 
              displayObjectSize
              displayDataTypes 
              theme={"bright"}
              src={record}
            />
          </p>
        ),
      }}
      dataSource={cardsList}
    />
  );
};

export default SamplePage;
