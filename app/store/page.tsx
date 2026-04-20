'use client'

import { useState } from 'react'
import GenericForm from '../components/ui/GenericForm'
import { useGlobalState } from '../context/globalProvider'
import formatDate from '@/app/utils/formatDate'
import Dialog from '../components/ui/Dialog'
import { FormField } from '../components/ui/GenericForm'
import { Alert, AlertDescription } from '../components/ui/Alert'
import { LuOctagonX, LuFilePenLine } from 'react-icons/lu'
// import moment from 'moment'
import axiosInstance from '../axios/axios'
// import { description } from "@/data/siteMetadata";

interface Store {
  id: string
  name: string
  channel: number
  type: number
  address: string
  create_time: string
  status: number
  description: string
}

export default function Commodity() {
  const { stores, setStores } = useGlobalState()
  const [success, setSuccess] = useState<string | null>(null)
  const handleAlertDismiss = () => {
    setSuccess(null)
  }
  enum StoreNames {
    '',
    '收费加盟',
    '加盟参股',
    '参股持有',
    '全资持有',
  }
  enum StatusNames {
    '营业中',
    '闭店中',
    '筹备中',
  }
  const fields: FormField[] = [
    {
      name: 'name',
      label: '店名',
      type: 'text', // Explicitly use literal type
      required: true,
      placeholder: '输入店名',
    },
    {
      name: 'type',
      label: '类型',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '收费加盟' },
        { value: '2', label: '加盟参股' },
        { value: '3', label: '参股持有' },
        { value: '4', label: '全资持有' },
      ],
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: '营业中' },
        { value: '1', label: '闭店中' },
        { value: '2', label: '筹备中' },
      ],
      validate: (value: string | boolean) =>
       typeof value === 'string' && !['0', '1', '2'].includes(value) ? 'Please select a valid type.' : null,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'daterangepicker',
      required: true,
      relatedField: 'endDate',
    },
  ]

  const dialogfields: FormField[] = [
    {
      name: 'name',
      label: '店名',
      type: 'text', // Explicitly use literal type
      required: true,
      placeholder: '输入店名',
    },
    {
      name: 'address',
      label: '地址',
      type: 'text', // Explicitly use literal type
      required: true,
      placeholder: '输入地址',
    },
    {
      name: 'type',
      label: '类型',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '收费加盟' },
        { value: '2', label: '加盟参股' },
        { value: '3', label: '参股持有' },
        { value: '4', label: '全资持有' },
      ],
      validate: (value: string | boolean) =>
         typeof value === 'string' && !['1', '2', '3', '4'].includes(value) ? 'Please select a valid type.' : null,
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: '营业中' },
        { value: '1', label: '闭店中' },
        { value: '2', label: '筹备中' },
      ],
      validate: (value: string | boolean) =>
         typeof value === 'string' && !['0', '1', '2'].includes(value) ? 'Please select a valid type.' : null,
    },
    {
      name: 'description',
      label: '备注',
      type: 'textarea', // Explicitly use literal type
      placeholder: '请输入门店描述信息',
    },
  ]
  const handleSubmit = async (data: Record<string, string | boolean>) => {
    const params = {
      name: data.name,
      type: data.type,
      start_time: data.startDate,
      end_time: data.endDate,
    }
    await axiosInstance
      .get('/api/store', { params })
      .then(function (response) {
        setStores(response.data)
        setSuccess('门店查询成功！')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const onSuccess = async () => {
    const params = { id: null }
    await axiosInstance
      .get('/api/store', { params })
      .then(function (response) {
        setStores(response.data)
        setSuccess('门店添加成功！')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const delAccount = async (data: string) => {
    confirm('确定删除此门店吗？')
    try {
      await axiosInstance.put('/api/store', { params: { id: data, status: 1 } })
      setStores((prev: Store[]) => prev.filter((commodity) => commodity.id !== data))
      setSuccess('门店删除成功！')
    } catch (error) {
      console.log('ERROR updating store: ', error)
    }
  }

  const handleFormSubmit = async (data: Record<string, string | boolean>) => {
    alert('Form submitted: ' + JSON.stringify(data))
    await axiosInstance
      .post('/api/store', {
        name: data.name,
        type: parseFloat(data.type as string),
        address: data.address,
        status: parseFloat(data.status as string),
        description: data.description,
      })
      .then(function () {
        onSuccess()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
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
            门店管理
          </h1>
          <div className="flex justify-between py-3 pr-1 pt-1 md:space-y-1">
            <p className="leading-1 text-lg text-gray-500 dark:text-gray-400">
              你好好赚钱，我好好用钱
            </p>
            <Dialog
              triggerButtonText="添加门店"
              dialogTitle="添加门店"
              fields={dialogfields}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
        <div className="py-3 pt-1 md:space-y-1">
          <GenericForm fields={fields} buttonType={1} onSubmit={handleSubmit} />
        </div>
        <div className="relative flex flex-col overflow-scroll rounded-lg bg-clip-border text-gray-500 shadow-md">
          <table className="">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50 text-slate-500">
                <th className="border-r-2 border-solid border-slate-200 px-4 py-1">
                  <p className="text-sm font-normal leading-none">门店名称</p>
                </th>
                <th className="border-r-2 border-solid border-slate-200 px-2 py-2">
                  <p className="text-sm font-normal leading-none">类型</p>
                </th>
                <th className="border-r-2 border-solid border-slate-200 px-4 py-2">
                  <p className="text-sm font-normal leading-none">
                    {/* <a href="#" className=""> */}
                    创建时间
                    {/* </a> */}
                  </p>
                </th>
                <th className="border-r-2 border-solid border-slate-200 px-4 py-2">
                  <p className="text-sm font-normal leading-none">地址</p>
                </th>
                <th className="border-r-2 border-solid border-slate-200 px-4 py-2">
                  <p className="text-sm font-normal leading-none">状态</p>
                </th>
                <th className="border-r-2 border-solid border-slate-200 px-4 py-2">
                  <p className="text-sm font-normal leading-none">备注描述</p>
                </th>
                <th className="border-r-2 border-solid border-slate-200 px-2 py-4">
                  <p>操作</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {stores &&
                stores.length > 0 &&
                stores.map((store: Store) => {
                  const { id, name, type, status, create_time, description, address } = store
                  return (
                    <tr
                      className="border-2  border-solid border-x-slate-200 hover:bg-pink-100"
                      key={id}
                    >
                      <td className="border-r-2 border-solid border-slate-200 px-4 py-2">
                        <p className="text-sm font-bold  ">{name}</p>
                      </td>
                      <td className="border-r-2 border-solid border-slate-200 px-1 py-4 ">
                        <p className="text-center text-sm">{StoreNames[type]}</p>
                      </td>
                      <td className="border-r-2 border-solid border-slate-200 px-4 py-2 ">
                        <p className="text-center text-sm">{formatDate(create_time)}</p>
                      </td>
                      <td className="border-r-2 border-solid border-slate-200 px-4 py-2">
                        <p className="text-center text-sm">{address}</p>
                      </td>
                      <td className="border-r-2 border-solid border-slate-200 px-4 py-2">
                        <p className="text-center text-sm">{StatusNames[status]}</p>
                      </td>
                      <td className="border-r-2 border-solid border-slate-200 px-4 py-2">
                        <p className="text-center text-sm">{description}</p>
                      </td>
                      <td className="border-r-1 border-solid border-slate-200 px-1 py-2">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => delAccount(id)}
                            className="rounded-md bg-pink-500 px-8 py-2 text-white hover:bg-pink-900 focus:ring-2 focus:ring-pink-400"
                          >
                            <LuOctagonX />
                          </button>
                          <button className="rounded-md bg-pink-500 px-8  py-2 text-white hover:bg-pink-700 focus:ring-2 focus:ring-pink-400">
                            <LuFilePenLine />
                          </button>
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
