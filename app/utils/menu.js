import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "价值分析",
    link: "/blog",
    icon: home,
  },
  {
    id: 2,
    title: "门店管理",
    icon: list,
    link: "/store",
  },
  {
    id: 3,
    title: "材料管理",
    icon: check,
    link: "/commodity",
  },
  {
    id: 4,
    title: "账目管理",
    icon: todo,
    link: "/account",
  },
];

export default menu;
