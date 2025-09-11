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
// import { description } from "@/data/siteMetadata";


export default function Commodity() {
  const { commodities, setCommodities } = useGlobalState();
  const [success, setSuccess] = useState<string | null>(null);
  const handleAlertDismiss = () => {
    setSuccess(null);
  };
  enum StyleNames {
    "",
    "食品材料",
    "包装材料",
  }
  enum ChannelNames {
    "",
    "供应商",
    "自营",
    "淘宝",
    "其他"
  }
  const fields: FormField[] = [
    //   {
    //     name: "store_name",
    //     label: "选择店铺",
    //     type: "select",
    //     required: true,
    //     options: [
    //       { value: '1', label: "合生汇店" },
    //       { value: '2', label: "北外滩店" },
    //       { value: '3', label: "巴黎春天店" },
    //       { value: '4', label: "太平洋店" },
    //     ],
    //     validate: (value: any) =>
    //       !['1', '2', '3', '4'].includes(value)
    //         ? "Please select a valid store."
    //         : null,
    //   },
    //   {
    //     name: "startDate",
    //     label: "Start Date",
    //     type: "daterangepicker",
    //     required: true,
    //     relatedField: "endDate",
    //   },
    // ];

    // enum StoreNames {
    //   "",
    //   "合生汇店",
    //   "北外滩店",
    //   "巴黎春天店",
    //   "太平洋店"
    // }
    // enum CommTypes {
    //   "",
    //   "芋圆",
    //   "木薯",
    //   "桃胶",
    //   "汤圆",
    //   "百合",
    //   "清心丸",
    //   "莲子",
    //   "冰袋",
    //   "纸巾",
    //   "姜薯",
    //   "鸭母捻",
    //   "垃圾袋/大",
    //   "垃圾袋/小",
    //   "玉米粒",
    //   "苹果粒",
    //   "海石花",
    //   "草果",
    //   "勺子",
    //   "打包袋/堂食",
    //   "打包袋/外卖",
    // }
    // 
    {
      name: "name",
      label: "原材料名称",
      type: "text", // Explicitly use literal type
      // required: true,
      placeholder: "输入原材料名称",
    },
    {
      name: "type",
      label: "类型",
      type: "select",
      // required: true,
      options: [
        { value: '1', label: "食品材料" },
        { value: '2', label: "包装材料" },
      ],
      // validate: (value: any) =>
      //   !['1', '2'].includes(value)
      //     ? "Please select a valid 类型."
      //     : null,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "daterangepicker",
      required: true,
      relatedField: "endDate",
    },
    // {
    //   name: "备注",
    //   label: "备注",
    //   type: "textarea", // Explicitly use literal type
    //   placeholder: "请输入商品描述信息",
    // },
  ]

  const dialogfields: FormField[] = [
    {
      name: "name",
      label: "原材料名称",
      type: "text", // Explicitly use literal type
      required: true,
      placeholder: "输入原材料名称",
    },
    {
      name: "type",
      label: "材料类型",
      type: "select",
      required: true,
      options: [
        { value: '1', label: "食品材料" },
        { value: '2', label: "包装材料" },
      ],
      validate: (value: any) =>
        !['1', '2'].includes(value)
          ? "Please select a valid type."
          : null,
    },
    {
      name: "description",
      label: "备注",
      type: "textarea", // Explicitly use literal type
      placeholder: "请输入商品描述信息",
    },
  ];
  const handleSubmit = async (data: any) => {
    // alert("Form submitted: " + JSON.stringify(data));
    const params = { name: data.name, type: data.type, start_time: data.startDate, end_time: data.endDate };
    await axiosInstance.get("/api/commodity", { params }).then(function (response) {
      setCommodities(response.data)
      setSuccess("材料查询成功！")
    }).catch(function (error) {
      console.log(error);
    });
  };
  const onSuccess = async (response: any) => {
    const params = { id: null };
    await axiosInstance.get("/api/commodity", { params }).then(function (response) {
      setCommodities(response.data)
      setSuccess("材料添加成功！")
    }).catch(function (error) {
      console.log(error);
    });
  }

  const delAccount = async (data: any) => {
    confirm("确定删除此材料吗？")
    try {
      await axiosInstance.put("/api/commodity", { params: { id: data, status: 1 } });
      setCommodities((prev: any[]) => prev.filter((commodity) => commodity.id !== data));
      setSuccess("材料删除成功！")
    } catch (error) {
      console.log("ERROR updating commodity: ", error);
    }
  };

  const handleFormSubmit = async (data: any) => {
    await axiosInstance.post("/api/commodity", { name: data.name, type: parseFloat(data.type), channel: 1, description: data.description }).then(function (response) {
      onSuccess(response)
    }).catch(function (error) {
      console.log(error);
    });;
  };
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
            材料管理
          </h1>
          <div className="flex justify-between pr-1 py-3 pt-1 md:space-y-1">
            <p className="text-lg leading-1 text-gray-500 dark:text-gray-400">
              你好好赚钱，我好好用钱
            </p>
            <Dialog
              triggerButtonText="添加材料"
              dialogTitle="添加材料"
              fields={dialogfields}
              onSubmit={handleFormSubmit}
            /></div>
        </div>
        <div className="py-3 pt-1 md:space-y-1">
          <GenericForm fields={fields} buttonType={1} onSubmit={handleSubmit} />
        </div>
        <div className="relative flex flex-col overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="">
            <thead>
              <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                <th className="px-4 py-1 border-r-2 border-solid border-slate-200">
                  <p className="text-sm leading-none font-normal">
                    材料名称
                  </p>
                </th>
                <th className="px-2 py-2 border-r-2 border-solid border-slate-200">
                  <p className="text-sm leading-none font-normal">
                    品类
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
                  <p className="text-sm leading-none font-normal">
                    {/* <a href="#" className=""> */}
                    交易时间
                    {/* </a> */}
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
                  <p className="text-sm leading-none font-normal">
                    渠道
                  </p>
                </th>
                <th className="px-4 py-2 border-r-2 border-solid border-slate-200">
                  <p className="text-sm leading-none font-normal">
                    备注描述
                  </p>
                </th>
                <th className="px-2 py-4 border-r-2 border-solid border-slate-200">
                  <p>操作</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {commodities && commodities.length > 0 && commodities.map((commodity: {
                id: any; name: any; channel: any; type: any; create_time: any;  description: any;
                
              }) => {
                const { id,  name, type, channel, create_time, description
                   } = commodity
                return (
                  <tr className="hover:bg-slate-50  border-2 border-solid border-x-slate-200" key={id}>
                    <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
                      <p className="text-sm font-bold  ">
                        {name}
                      </p>
                    </td>
                    <td className="px-1 py-4 border-r-2 border-solid border-slate-200 ">
                      <p className="text-sm text-center">
                        {StyleNames[type]}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r-2 border-solid border-slate-200 ">
                      <p className="text-sm text-center">
                        {formatDate(create_time)}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
                      <p className="text-sm text-center">
                        {ChannelNames[channel]}
                      </p>
                    </td>
                      <td className="px-4 py-2 border-r-2 border-solid border-slate-200">
                      <p className="text-sm text-center">
                        {description}
                      </p>
                    </td>
                    <td className="px-1 py-2 border-r-1 border-solid border-slate-200">
                      <div className="flex justify-center space-x-2">
                        <a href="#" onClick={() => delAccount(id)} className="bg-pink-500 text-white px-8 py-2 rounded-md hover:bg-pink-900 focus:ring-2 focus:ring-pink-400">
                          <LuOctagonX />
                        </a>
                        <a href="#" className="bg-pink-500 text-white px-8  py-2 rounded-md hover:bg-pink-700 focus:ring-2 focus:ring-pink-400">
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
