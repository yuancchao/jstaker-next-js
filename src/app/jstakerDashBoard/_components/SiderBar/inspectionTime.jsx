"use client";
import React, { useState } from "react";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Radio, Select } from "antd";
//自动巡检时间
function InspectionTime() {
  const timePointOptions = [
    {
      label: "0:00",
      value: "0",
    },
    {
      label: "8:00",
      value: "1",
    },
    {
      label: "12:00",
      value: "2",
    },
    {
      label: "20:00",
      value: "3",
      title: "Orange",
    },
  ];
  const timePeriodOptions = [
    {
      label: "0",
      value: "0",
    },
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
  ];
  const openOption = [
    {label:'开启',value:0},
    {label:'关闭',value:1}
  ]
  const [value1, setValue1] = useState("");
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const [value2, setValue2] = useState("");
  const onChange2 = ({ target: { value } }) => {
    console.log("radio2 checked", value);
    setValue2(value);
  };
  return (
    <div className="mb-3">
      <div className="text-base leading-9">
        <DoubleRightOutlined className="mr-1 !text-[#ffbf75]"  />
        自动巡检时间
      </div>
      <div className="text-sm leading-9 ml-2 mb-1">
         <span className="mr-1">每日</span>
        <Radio.Group
          size="small"
          className="space-x-1 "
          options={timePointOptions}
          onChange={onChange1}
          value={value1}
          optionType="button"
        />
      </div>
      <div className="text-sm leading-9 ml-2 ">
        
        <span className="mr-1">间隔</span>
        <Select
          defaultValue="0"
          className="mx-2"
          options={timePeriodOptions}
          size="small"
        />
        小时
      </div>
       <div className="text-sm leading-9 ml-2 ">
        
        <span className="mr-1">自动预报模式</span>
        <Radio.Group
          size="small"
          className=" ml-2"
          options={openOption}
          onChange={onChange2}
          value={value2}
          optionType="button"
        />
     
      </div>
    </div>
  );
}

export default InspectionTime;
