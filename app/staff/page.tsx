'use client'

import Accordion from "../components/ui/Accordion";
// import Carousel from "../components/ui/Carousel";
import { LuChevronsDown,LuChevronsLeft} from 'react-icons/lu'
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
    return (
    <>
    {/* <div>fdfdsff</div> */}
      {/* <Carousel images={images} autoplay autoplayDelay={5000} /> */}
      <Accordion
        items={accordionItems} 
        allowMultipleOpen={false}
        className="border w-full bg-origin-padding border-pink-400 rounded "
        // customIcon={customIcon}
      /></>
    )
}