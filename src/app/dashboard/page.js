"use client";
import React, { useState, useEffect, useCallback } from "react";

import StockForm from "@/components/StockForm";

import { Table, Spin, Button, Drawer } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";

const column_labels = {
  key: "Index",
  company: "Stock Company",
  symbol: "Stock Code",
  quantity: "Quantity",
  ltp: "LTP",
  invested: "Invested"
};

function DashBoard(props) {
  console.log(process.env, "env");
  const [spinning, setSpinning] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  const handleDrawer = useCallback((flag) => {
    setOpen(false);
  }, []);

  const fetchSheet = async () => {
    setSpinning(true);
    let sheet = [];
    try {
      const response = await fetch("/api/sheet");
      if (response.ok) {
        const { data = [] } = await response.json();
        const { sheetData, headerData } = data;
        const column_data = headerData.map((i) => {
          const column_items = {
            title: column_labels[i],
            dataIndex: i,
            key: i,
            sorter: (a, b) => a - b
          };

          return column_items;
        });
        setColumns([...column_data]);
        setRows([...sheetData]);
        setSpinning(false);
      }
    } catch (error) {
      return error;
    }
    return sheet;
  };

  useEffect(() => {
    fetchSheet();
  }, []);

  const handleStockRefresh = () => {
    fetchSheet();
  };

  return (
    <div className="dashboard-main-wrapper">
      <div className="border dashboard-container">
        <div className="dash-header-wrapper">
          <h2>List of Stocks</h2>
          <div className="button-wrapper flex gap-2">
            <Button type="primary" onClick={showDrawer}>
              <PlusOutlined />
              Add Stock
            </Button>
            <Button type="primary" onClick={handleStockRefresh}>
              <ReloadOutlined />
              Refresh Stocks
            </Button>
          </div>
        </div>
        <div className="stock-table-wrapper">
          <Table
            dataSource={rows}
            pagination={false}
            columns={columns}
            sticky
            scroll={{ x: 300, y: 400 }}
            className="stock-table"
          />
        </div>
        <Drawer title="Stock Addition" onClose={onClose} open={open}>
          <StockForm handleDrawer={handleDrawer} />
        </Drawer>
      </div>
      <Spin spinning={spinning} fullscreen />
    </div>
  );
}

export default DashBoard;
