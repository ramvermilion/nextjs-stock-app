"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
import "./home.scss";

import DashBoard from "./dashboard/page";
import StockAverageCalculator from "./average/page";
import Filter from "@/components/Filter";

const items = [
  {
    key: "1",
    label: "Watchlist",
    children: <DashBoard />
  },
  {
    key: "2",
    label: "Average Calculator",
    children: <StockAverageCalculator />
  }
];

function Home() {
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  console.log(process.env, "env");

  const handleTableChange = (event) => {
    if (event == 2) {
      console.log(isPanelVisible, "isPanelVisible-1");
      setIsPanelVisible(() => false);
      return;
    } else {
      setIsPanelVisible(true);
    }
    console.log(isPanelVisible, "isPanelVisible-2");
    console.log(event, "event");
  };

  return (
    <div className="main-container">
      <Tabs
        className="tab-container"
        onTabClick={handleTableChange}
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
}
export default Home;
