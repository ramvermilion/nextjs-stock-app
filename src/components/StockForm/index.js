import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Spin, Input, Radio, Select, message } from "antd";

let formItems = {
  symbol: "",
  market: "NSE"
};

const StockForm = ({ handleDrawer }) => {
  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [radioValue, SetRadioValue] = useState("NSE");
  const [companyList, setCompanyList] = useState([]);
  const [formContent, setFormContent] = useState(formItems);

  useEffect(() => {
    async function fetchCompanyList() {
      try {
        const apiResponse = await fetch("/api/stock?company");
        const { response = [] } = await apiResponse.json();
        if (response.length) {
          setCompanyList(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompanyList();
  }, []);

  const onRadioChange = (e) => {
    const { symbol } = formRef.current.getFieldValue();
    SetRadioValue(e.target.value);

    const companySymbol = symbol.split(":")[1];

    formRef.current.setFieldsValue({
      symbol: `${e.target.value}:${companySymbol}`,
      market: e.target.value
    });
  };

  async function fetchCompanySymbol(id) {
    try {
      const apiResponse = await fetch(`/api/stock?id=${id}`);
      const { response = [] } = await apiResponse.json();
      if (response.length) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onStockSelection = async (id) => {
    const companySymbol = await fetchCompanySymbol(id);
    const { symbol, company } = companySymbol[0];
    formRef.current.setFieldsValue({
      symbol: `${radioValue}:${symbol}`,
      company: company
    });
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleStockAdd = () => {
    const form_data = formRef.current.getFieldValue();
    setSpinning(true);

    const data = fetch("api/sheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form_data)
    }).then((data) => {
      setSpinning(false);
      formRef.current.resetFields();
      setFormContent(formItems);
      messageApi.open({
        type: "success",
        duration: 10,
        top: 500,
        content: "Stock has been successfully added to the list"
      });
      handleDrawer(false);
      console.log(data, "inside");
    });

    setFormContent(form_data);
  };

  return (
    <Form layout="vertical" ref={formRef} initialValues={{ ...formContent }}>
      <Form.Item label="Company Name" name="company">
        <Select
          options={companyList}
          showSearch
          name="company"
          filterOption={filterOption}
          onChange={onStockSelection}
          optionFilterProp="children"
          placeholder="Select Company"
        />
      </Form.Item>

      <Form.Item label="Market" name="market">
        <Radio.Group name="market" onChange={onRadioChange}>
          <Radio value="NSE">NSE</Radio>
          <Radio value="BSE">BSE</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Stock Symbol" name="symbol">
        <Input name="symbol" disabled placeholder="Enter symbol" />
      </Form.Item>

      <Form.Item label="Quantity" name="quantity">
        <Input name="quantity" placeholder="Enter quantity" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleStockAdd}>
          Add Stock
        </Button>
      </Form.Item>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
    </Form>
  );
};
export default StockForm;
