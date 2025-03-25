
'use client'

// import projectsData from '@/data/projectsData'
// import Card from '@/app/components/ui/Card'  
// import { genPageMetadata } from 'app/seo'
import Form from '../components/ui/Form'
import { useGlobalState } from '../context/globalProvider';

// export const metadata = genPageMetadata({ title: 'Arrange' })

export default function Arrange() {
  const { allAccounts,accounts,setAccounts } = useGlobalState();
  return (
    <>
   
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="w-full py-2 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
             做账
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          </p>
          <div className="w-full py-2 pt-6 md:space-y-5"><Form /></div>
        </div>
        <div className="w-full relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max text-slate-800">
          <thead>
          <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
          <th className="p-4">
            <p className="text-sm leading-none font-normal">
              Project Name
            </p>
          </th>
          <th className="p-4">
            <p className="text-sm leading-none font-normal">
            Start Date
            </p>
          </th>
          <th className="p-4">
            <p className="text-sm leading-none font-normal">
              End Date
            </p>
          </th>
          <th className="p-4">
            <p className="text-sm leading-none font-normal">
              Owner
            </p>
          </th>
          <th className="p-4">
            <p className="text-sm leading-none font-normal">
              Budget
            </p>
          </th>
          <th className="p-4">
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
        <tr className="hover:bg-slate-50" key={id}>
          <td className="p-4">
            <p className="text-sm font-bold">
              {store_name}
            </p>
          </td>
          <td className="p-4">
            <p className="text-sm">
            {price}
            </p>
          </td>
          <td className="p-4">
            <p className="text-sm">
            {order_time}
            </p>
          </td>
          <td className="p-4">
            <p className="text-sm">
            {order_time}
            </p>
          </td>
          <td className="p-4">
            <p className="text-sm">
            {order_time}
            </p>
          </td>
          <td className="p-4">
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
