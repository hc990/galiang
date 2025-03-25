'use client'

import Accordion from "../components/ui/Accordion";
// import Carousel from "../components/ui/Carousel";
import { LuChevronsDown,LuChevronsLeft,LuBook} from 'react-icons/lu'
import Breadcrumbs from "../components/ui/Breadcrumbs";
import ButtonGroup from "../components/ui/ButtonGroup";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";  
import { Card } from "../components/ui/Card";
// import DatePickerPopover from "../components/ui/DatePickerPopover";
 
 
const images = [
    'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
  ];
const accordionItems = [
    { id: 1, title: "Introduction", content: "This is the introduction content." },
    { id: 2, title: "Features", content: "Here are some features of the product." },
    { id: 3, title: "FAQ", content: "These are the frequently asked questions." },
];

// const customIcon = (isOpen: boolean) => (
//     <span>{isOpen ? < LuChevronsLeft /> : <LuChevronsDown/>}</span>
// );

export default function Staff() {
    const breadcrumbItems = [
      { label: "Home", href: "/", icon: <LuBook /> },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Laptops" }, // 当前页面，无链接
    ];
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const buttons = [
      { label: "Option 1", onClick: () => setActiveIndex(0), isActive: activeIndex === 0 },
      { label: "Option 2", onClick: () => setActiveIndex(1), isActive: activeIndex === 1 },
      { label: "Option 3", onClick: () => setActiveIndex(2), isActive: activeIndex === 2 },
    ];
    return (
    <>
    {/* <div>fdfdsff</div> */}
      {/* <Carousel images={images} autoplay autoplayDelay={5000} /> */}
      {/* <DatePickerPopover></DatePickerPopover> */}
      <Breadcrumbs items={breadcrumbItems} />
      <Card  
         key={'fdfdsf'}
         title={'fdfds'}
        //  description={'fdfd'}
        //  imgSrc={'/thumbnail/123.png'}
        //  href={''}
      ></Card>
      <Accordion
        items={accordionItems} 
        allowMultipleOpen={false}
        className="text-white border w-full bg-origin-padding border-pink-400 rounded "
        // customIcon={customIcon}
      />
      <ButtonGroup buttons={buttons} variant="solid" />
      {/* <Spinner /> */}

      {/* 自定义大小、颜色和速度的 Spinner */}
      {/* <Spinner size={60} color="pink" speed={1.5} className="ml-6  bg-pink-900 p-4 rounded" /> */}
     
      {/* 适配深色模式 */}
      {/* <Spinner size={60} color="white" speed={1.5} className="ml-6 bg-gray-900 p-4 rounded" /> */}
    </>
    )
}