import { FaUser, FaUtensils, FaDumbbell, FaUsers, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

export const menuItems = [
    {
        name: "마이페이지",
        icon: FaUser,
        path: "",
        subItems: [
            { name: "마이페이지", path: "/mypage" },
            { name: "ToDo List", path: "/todolist" },
        ],
    },
    {
        name: "식단 관리",
        icon: FaUtensils,
        path: "",
        subItems: [
            { name: "식단", path: "/diet" },
        ],
    },
    {
        name: "운동 일지",
        icon: FaDumbbell,
        path: "",
        subItems: [
            { name: "운동일지", path: "/workout" },
        ],
    },
    {
        name: "커뮤니티",
        icon: FaUsers,
        path: "",
        subItems: [
            { name: "커뮤니티", path: "/community" },
            { name: "내 게시글", path: "/mycommunity" },
        ],
    },
    {
        name: "로그아웃",
        icon: FaSignOutAlt,
        path: "",
        subItems: [],
    },
    {
        name: "로그인",
        icon: FaSignInAlt,
        path: "",
        subItems: [],
    },
];
