'use client'

import { useState } from "react";
import Button from "../components/ui/Button"; 
import DatePickerPopover from '../components/ui/DatePickerPopover';
import GenericForm from '../components/ui/GenericForm';
// import projectsData from '@/data/projectsData'
// import Card from '@/app/components/ui/Card'  
// import { genPageMetadata } from 'app/seo'
import { useGlobalState } from '../context/globalProvider';
import formatDate from '@/app/utils/formatDate'
import ButtonGroup from "../components/ui/ButtonGroup";
import Dialog from "../components/ui/Dialog";
import { FormField } from "../components/ui/GenericForm";
import axios from 'axios'
import siteMetadata from '@/data/siteMetadata'
import { Alert, AlertDescription } from "../components/ui/Alert";

export default function Arrange() {
  const axiosInstant = axios.create({  
    baseURL: siteMetadata.siteUrl ,
    timeout: 3000
  }) 
  const { allAccounts,accounts,setAccounts } = useGlobalState();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const fields: FormField[] = [
    {
      name: "selectname",
      label: "选择店铺",
      type: "select",
      required: true,
      options: [
         { value: '1', label: "合生汇店" },
         { value: '2', label: "北外滩店" },
         { value: '3', label: "巴黎春天店" },
         { value: '4', label: "太平洋店" },
      ],
    validate: (value: any) =>
      !['1', '2', '3', '4'].includes(value)
        ? "Please select a valid store."
        : null,
    },
    { name: "startTime", label: "StartTime", type: "datepicker", required: true },
    { name: "endTime", label: "EndTime", type: "datepicker", required: true },
    // {
    //   name: "username",
    //   label: "Username",
    //   type: "text", // Explicitly use literal type
    //   required: true,
    //   placeholder: "Enter your username",
    // },
    // {
    //   name: "email",
    //   label: "Email",
    //   type: "email", // Explicitly use literal type
    //   required: true,
    //   validate: (value: any) =>
    //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    //       ? "Invalid email format."
    //       : null,
    //   placeholder: "Enter your email",
    // },
    // {
    //   name: "age",
    //   label: "Age",
    //   type: "number", // Explicitly use literal type
    //   required: true,
    //   min: 18,
    //   max: 100,
    //   step: 1,
    //   placeholder: "Enter your age",
    // },
    // {
    //   name: "bio",
    //   label: "Bio",
    //   type: "textarea", // Explicitly use literal type
    //   placeholder: "Tell us about yourself",
    // },
    // {
    //   name: "newsletter",
    //   label: "Subscribe to Newsletter",
    //   type: "checkbox", // Explicitly use literal type
    // },
    // { name: "createTime", label: "CreateTime", type: "datepicker", required: true },
    // {
    //   name: "role",
    //   label: "Role",
    //   type: "select", // Explicitly use literal type
    //   required: true,
    //   options: [
    //     { value: "admin", label: "Admin" },
    //     { value: "user", label: "User" },
    //     { value: "guest", label: "Guest" },
    //   ],
    //   validate: (value: any) =>
    //     !["admin", "user", "guest"].includes(value)
    //       ? "Please select a valid role."
    //       : null,
    // },
    // {
    //   name: "status",
    //   label: "Status",
    //   type: "radio", // Explicitly use literal type
    //   required: true,
    //   options: [
    //     { value: "active", label: "Active" },
    //     { value: "inactive", label: "Inactive" },
    //   ],
    // },
  ];

  const dialogfields: FormField[]  = [
    // { name: "storename", label: "Storename", type: "text", required: true },
     {
      name: "storename",
      label: "Storename",
      type: "select",
      required: true,
      options: [
         { value: '1', label: "合生汇店" },
         { value: '2', label: "北外滩店" },
         { value: '3', label: "巴黎春天店" },
         { value: '4', label: "太平洋店" },
      ],
    validate: (value: any) =>
      !['1', '2', '3', '4'].includes(value)
        ? "Please select a valid store."
        : null,
    },
    {
      name: "comtype",
      label: "类型",
      type: "select",
      required: true,
      options: [
         { value: '1', label: "芋圆" },
         { value: '2', label: "木薯" },
         { value: '3', label: "桃胶" },
         { value: '4', label: "汤圆" },
      ],
    validate: (value: any) =>
      !['1', '2', '3', '4'].includes(value)
        ? "Please select a valid store."
        : null,
    },
    { name: "createTime", label: "CreateTime", type: "datepicker", required: true },
    { name: "amount", label: "Amount", type: "number", step: 1 ,min: 0, required: true },
    { name: "comnumber", label: "数量", type: "number", step: 1 ,min: 0, required: true },
     {
      name: "comPer",
      label: "类型",
      type: "select",
      required: false,
      options: [
         { value: '1', label: "包" },
         { value: '2', label: "袋" },
      ],
    validate: (value: any) =>
      !['1', '2', '3', '4'].includes(value)
        ? "Please select a valid store."
        : null,
    },
  ];
  const handleSubmit = (data: any) => {
    alert("Form submitted: " + JSON.stringify(data));
  };
  const onSuccess = (response: any) => {
        <Alert variant="destructive">
          <AlertDescription>成功添加账目</AlertDescription>
        </Alert>
  }
  const handleFormSubmit = async (data: any) => {
          await axiosInstant.put("/api/blog",{ params: { id: '68ad765bc6ddd8462d90fb63',comment: data.storename, status: 1}}).then(function (response) {
          onSuccess(response)
       }).catch(function (error) {
          console.log(error);
    });;
  };
  const buttons = [
      { label: "Option 1", onClick: () => setActiveIndex(0), isActive: activeIndex === 0 },
      { label: "Option 2", onClick: () => setActiveIndex(1), isActive: activeIndex === 1 },
      { label: "Option 3", onClick: () => setActiveIndex(2), isActive: activeIndex === 2 },
    ];
  return (
    <>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className=" py-1 pt-1 md:space-y-1">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-5 md:text-4xl md:leading-14">
             账目管理
          </h1>
          <div className="flex justify-between pr-1 py-3 pt-1 md:space-y-1">
             <p className="text-lg leading-1 text-gray-500 dark:text-gray-400">
                你好好赚钱，我好好用钱
             </p>
            <Dialog 
              triggerButtonText="添加账目"
              dialogTitle="添加账目"
              fields={dialogfields}
              onSubmit={handleFormSubmit}
          /></div>
        </div>
        <div className="py-3 pt-1 md:space-y-1">
             <GenericForm fields={fields} onSubmit={handleSubmit}/>
        </div>
        <div className="relative flex flex-col overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="">
          <thead>
          <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
          <th className="px-4 py-1 border-r-2 border-solid border-slate-200">
            <p className="text-sm leading-none font-normal">
              Project Name
            </p>
          </th>
          <th className="px-2 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm leading-none font-normal">
                品类
            </p>
          </th>
          <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm leading-none font-normal">
               交易时间
            </p>
          </th>
          <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm leading-none font-normal">
              渠道
            </p>
          </th>
          <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm leading-none font-normal">
              Budget
            </p>
          </th>
          <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p></p>
          </th>
        </tr>
      </thead>
      <tbody>
      {accounts && accounts.length > 0 && accounts?.slice(0, 5).map((account: { id: any; order_time:any;
            price:any;  
            store_name:any }) => {
          const { id , order_time,
            price,
            store_name, } = account
           return ( 
        <tr className="hover:bg-slate-50  border-2 border-solid border-x-slate-200" key={id}>
          <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm font-bold  ">
              {store_name}
            </p>
          </td>
          <td className="px-1 py-4 border-r-2 border-solid border-slate-200 ">
            <p className="text-sm text-center">
              芋圆
            </p>
          </td>
           <td className="px-4 py-2 border-r-2 border-solid border-slate-200 ">
            <p className="text-sm">
               {formatDate(order_time)}
            </p>
          </td>
          <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm">
                淘宝直营店
            </p>
          </td>
          <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <p className="text-sm">
            {price}
            </p>
          </td>
          <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
            <a href="#" className="text-sm font-semibold ">
              Edit
            </a>
          </td>
        </tr>
        )
      })}
    </tbody>
  </table>
</div>
      </div>
    </>
  )
}
