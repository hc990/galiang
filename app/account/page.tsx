'use client'

import { useState } from "react";

import GenericForm from '../components/ui/GenericForm';
import { useGlobalState } from '../context/globalProvider';
import formatDate from '@/app/utils/formatDate'
import Dialog from "../components/ui/Dialog";
import { FormField } from "../components/ui/GenericForm";

import { Alert, AlertDescription } from "../components/ui/Alert";
import { LuOctagonX, LuFilePenLine } from "react-icons/lu";
import moment from "moment";
import axiosInstance from "../axios/axios";

export default function Account() {

  const { accounts, setAccounts, commodities, stores } = useGlobalState();
  const [success, setSuccess] = useState<string | null>(null);
  const handleAlertDismiss = () => {
    setSuccess(null);
  };
  const fields: FormField[] = [
    {
      name: "store_name",
      label: "选择店铺",
      type: "select",
      required: true,
      options: stores.map((store: { id: any; name: any; }) => ({
        value: store.id + '|' + store.name,
        label: store.name,
      })),
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "daterangepicker",
      required: true,
      relatedField: "endDate",
    },
  ];
  enum CommUnits {
    "",
    "包",
    "袋",
    "箱"
  }
  const dialogfields: FormField[] = [
    {
      name: "store_name",
      label: "店名",
      type: "select",
      required: true,
      options: stores.map((store: { id: any; name: any; }) => ({
        value: store.id + '|' + store.name,
        label: store.name,
      })),
    },
    {
      name: "comm_type",
      label: "商品名称",
      type: "select",
      required: true,
      options: commodities.map((commodity: { id: any; name: any; }) => ({
        value: commodity.id + '|' + commodity.name,
        label: commodity.name,
      })),
    },
    { name: "order_time", label: "生成时间", type: "datepicker", required: true },
    { name: "comm_num", label: "商品数量", placeholder: "请填写数字", type: "number", step: 1, min: 0, required: true },
    {
      name: "comm_unit",
      label: "商品类型",
      type: "select",
      required: false,
      options: [
        { value: '1', label: "包" },
        { value: '2', label: "袋" },
        { value: '3', label: "箱" },
      ],
      validate: (value: any) =>
        !['1', '2', '3', '4'].includes(value)
          ? "Please select a valid store."
          : null,
    },
    { name: "price", label: "金额", placeholder: "请填写数字", type: "number", step: 1, min: 0, required: true },
  ];
  const handleSubmit = async (data: any) => {
    // alert("Form submitted: " + JSON.stringify(data));
    const params = { store_id: data.store_id, start_time: data.startDate, end_time: data.endDate };
    await axiosInstance.get("/api/account", { params }).then(function (response) {
      setAccounts(response.data)
      setSuccess("账目查询成功！")
    }).catch(function (error) {
      console.log(error);
    });
  };
  const onSuccess = async (response: any) => {
    const params = { id: null };
    await axiosInstance.get("/api/account", { params }).then(function (response) {
      setAccounts(response.data)
      setSuccess("账目添加成功！")
    }).catch(function (error) {
      console.log(error);
    });
  }
  const delAccount = async (data: any) => {
    confirm("确定删除此账目吗？")
    try {
      await axiosInstance.put("/api/account", { params: { id: data, status: 1 } });
      setAccounts((prev: any[]) => prev.filter((account) => account.id !== data));
      setSuccess("账目删除成功！")
    } catch (error) {
      console.log("ERROR updating BOOK: ", error);
    }
  };

  const handleFormSubmit = async (data: any) => {
    // alert("Form submitted: " + JSON.stringify(data));
    await axiosInstance.post("/api/account", { order_time: moment(data.order_time).toDate(), comm_type: data.comm_type.split('|')[0], comm_name: data.comm_type.split('|')[1], comm_num: parseFloat(data.comm_num), comm_unit: parseFloat(data.comm_unit), price: parseFloat(data.price), store_id: data.store_name.split('|')[0] ,store_name: data.store_name.split('|')[1] , channel: 1 }).then(function (response) {
      onSuccess(response)
    }).catch(function (error) {
      console.log(error);
    });;
  };
  // const buttons = [
  //   { label: "Option 1", onClick: () => setActiveIndex(0), isActive: activeIndex === 0 },
  //   { label: "Option 2", onClick: () => setActiveIndex(1), isActive: activeIndex === 1 },
  //   { label: "Option 3", onClick: () => setActiveIndex(2), isActive: activeIndex === 2 },
  // ];
  return (
    <>
      {success && (
        <Alert variant="destructive" autoDismiss={3000} onDismiss={handleAlertDismiss}>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
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
          <GenericForm fields={fields} buttonType={1} onSubmit={handleSubmit} />
        </div>
        <div className="relative flex flex-col overflow-scroll text-gray-500 shadow-md rounded-lg bg-clip-border">
          <table className="border-pink-300">
            <thead >
              <tr className="text-slate-500 border-b border-x-pink-300 bg-pink-50">
                <th className="px-4 py-1 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    店名
                  </p>
                </th>
                <th className="px-2 py-2 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    品类
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    {/* <a href="#" className=""> */}
                    交易时间
                    {/* </a> */}
                  </p>
                </th>
                {/* <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
                  <p className="text-sm leading-none font-normal">
                    渠道
                  </p>
                </th> */}
                <th className="px-4 py-2 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    数量
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    单位
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    单价(元)
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-pink-200">
                  <p className="text-sm leading-none font-normal">
                    金额(元)
                  </p>
                </th>
                <th className="px-2 py-2 border-r-2 border-solid border-pink-200">
                  <p>操作</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts && accounts.length > 0 && accounts.map((account: {
                id: any; order_time: any;
                price: any; comm_type: any, comm_name: any, comm_num: any, comm_unit: any, channel: any,
                store_name: any
              }) => {
                const { id, order_time, comm_name, comm_num, comm_unit, channel,
                  price,
                  store_name, } = account
                return (
                  <tr className="hover:bg-pink-100 border-2 border-solid border-pink-200" key={id}>
                    <td className="px-4 py-2 border-r-2 border-solid border-pink-200">
                      <p className="text-sm font-bold  ">
                        {store_name}
                      </p>
                    </td>
                    <td className="px-1 py-4 border-r-2 border-solid border-pink-200 ">
                      <p className="text-sm text-center">
                        {comm_name}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r-2 border-solid border-pink-200 ">
                      <p className="text-sm text-center">
                        {formatDate(order_time)}
                      </p>
                    </td>
                    {/* <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
                      <p className="text-sm text-center">
                        {channel}
                      </p>
                    </td> */}
                    <td className="px-4 py-2 border-r-2 border-solid border-pink-200">
                      <p className="text-sm text-center">
                        {comm_num}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r-2 border-solid border-pink-200">
                      <p className="text-sm text-center">
                        {CommUnits[comm_unit]}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r-2 border-solid border-pink-200">
                      <p className="text-sm text-center">
                        {Math.round((price / comm_num + Number.EPSILON) * 100) / 100}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r-2 border-solid border-pink-200">
                      <p className="text-sm text-center">
                        {price}
                      </p>
                    </td>
                    <td className="px-2 py-2 border-r-2 border-solid border-pink-200">
                      <div className="flex justify-between">
                        <a href="#" onClick={() => delAccount(id)} className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-900 focus:ring-2 focus:ring-pink-400">
                          <LuOctagonX />
                        </a>
                        <a href="#" className="bg-pink-500 text-white px-4 pr-4 py-2 rounded-md hover:bg-pink-700 focus:ring-2 focus:ring-pink-400">
                          <LuFilePenLine />
                        </a>
                      </div>
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
