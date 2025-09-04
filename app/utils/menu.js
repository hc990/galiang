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
    title: "员工考勤",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "效率分析",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "账目管理",
    icon: todo,
    link: "/account",
  },
];

export default menu;
