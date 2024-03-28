"use client";
import React, { useState, useRef } from "react";

import { Button, message, Form, Space, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const dynamicForm = [
  {
    type: "input",
    label: "Stock Name",
    name: "stockname",
    component: <Input placeholder="Enter your Stock Name" />
  },
  {
    type: "input",
    label: "Stock Code",
    name: "stockcode",
    component: <Input placeholder="Enter your Stock Code" />
  },
  {
    type: "select",
    label: "Market",
    name: "market",
    component: (
      <Select
        placeholder="Select your market"
        options={[
          {
            value: "NSE",
            label: "NSE"
          },
          {
            value: "BSE",
            label: "BSE"
          }
        ]}
      />
    )
  },
  {
    type: "input",
    label: "Quantity",
    name: "qunatity",
    component: <Input placeholder="Enter your Quantity" />
  }
];

function Filter(props) {
  const [messageApi, contextHolder] = message.useMessage();

  const registrationFormRef = useRef(null);

  const handleForm = () => {
    const data = registrationFormRef.current.getFieldValue();
    console.log(data, "formsubmitdata");
    if (data) {
      messageApi.open({
        type: "success",
        duration: 10,
        top: 500,
        content: "The Registration Form has been saved Successfully"
      });
    }
  };

  const CreateRegistrationForm = () => {
    const formList = dynamicForm.map((item, i) => {
      const { type, label, name, component = <></> } = item;

      return (
        <Form.Item label={label} name={name}>
          {component}
        </Form.Item>
      );
    });

    return (
      <div className="stock-form">
        <Form layout="vertical" ref={registrationFormRef} initialValues={{}}>
          {formList}
          <Space className="flex justify-end">
            <Button htmlType="button">Reset</Button>
            <Button type="primary" onClick={handleForm} htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      </div>
    );
  };

  return (
    <>
      <div className="">
        <div className="text-center text-xl my-2 uppercase">Add Stock</div>
        <CreateRegistrationForm />
        {contextHolder}
      </div>
    </>
  );
}

export default Filter;
