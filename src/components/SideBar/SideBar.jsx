import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from './menuItems';
import { useAuth } from '../../contexts/AuthContext';

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // 로그인 상태에 따라 메뉴 필터링
    const normalMenuItems = menuItems.filter(item => item.name !== "로그아웃" && item.name !== "로그인");

    const handleAuthAction = async () => {
        if (isAuthenticated) {
            // 로그아웃 처리
            await logout();
            sessionStorage.removeItem("accessToken");
            navigate("/login", { replace: true });
        } else {
            navigate("/login");
        }
    };

    const toggleMenu = (index) => {
        if (openMenu === index) {
            setOpenMenu(null);
        } else {
            setOpenMenu(index);
        }
    };

    // 마우스 오버 시 사이드바 펼치기
    const handleMouseEnter = () => {
        setIsCollapsed(false);
    };

    // 마우스 떠날 시 사이드바 접기
    const handleMouseLeave = () => {
        setIsCollapsed(true);
        setOpenMenu(null); // 메뉴도 닫기
    };

    // 현재 인증 상태에 따른 아이콘 가져오기
    const authMenuItem = menuItems.find(item =>
        item.name === (isAuthenticated ? "로그아웃" : "로그인")
    );
    const AuthIcon = authMenuItem?.icon; return (
        <aside
            className={`bg-rookieRed h-full flex flex-col justify-between transition-[width] duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        ><nav>
                <ul className="space-y-2">
                    {normalMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <button
                                    onClick={() => toggleMenu(index)}
                                    className="w-full text-left text-white p-4 hover:bg-rookieHover rounded flex items-center justify-start"
                                    aria-expanded={openMenu === index}
                                    aria-controls={`menu-${index}`}
                                >
                                    {Icon && <Icon className="text-2xl flex-shrink-0" />}
                                    <span
                                        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed
                                            ? 'max-w-0 opacity-0 ml-0'
                                            : 'max-w-xs opacity-100 ml-4'
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </button>
                                {/* 하위 메뉴 */}
                                {item.subItems && item.subItems.length > 0 && (
                                    <ul
                                        id={`menu-${index}`}
                                        className={`pl-4 mt-2 ml-4 space-y-1 overflow-hidden 
                        ${openMenu === index && !isCollapsed
                                                ? 'max-h-[500px] opacity-100 transition-[max-height, opacity] duration-200 ease-in-out'
                                                : 'max-h-0 opacity-0 transition-[max-height, opacity] duration-200 ease-in-out'
                                            }`}
                                    >
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    to={subItem.path}
                                                    className="block text-white p-2 hover:bg-rookieHover rounded"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>            {/* 로그인/로그아웃 버튼 */}
            <div className="mb-4">
                <button
                    onClick={handleAuthAction}
                    className="w-full text-left text-white p-4 hover:bg-rookieHover rounded flex items-center justify-start"
                >
                    {AuthIcon && <AuthIcon className="text-2xl flex-shrink-0" />}
                    <span
                        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed
                            ? 'max-w-0 opacity-0 ml-0'
                            : 'max-w-xs opacity-100 ml-4'
                            }`}
                    >
                        {isAuthenticated ? "로그아웃" : "로그인"}
                    </span>
                </button>
            </div>        </aside>
    );
};

export default SideBar;