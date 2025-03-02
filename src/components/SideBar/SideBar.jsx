import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { menuItems } from './menuItems';

const SideBar = ({ isCollapsed, toggleSidebar }) => {
    const [openMenu, setOpenMenu] = useState(null);

    // 로그아웃 항목을 분리
    const normalMenuItems = menuItems.filter(item => item.name !== "로그아웃");
    const logoutItem = menuItems.find(item => item.name === "로그아웃");

    const toggleMenu = (index) => {
        if (openMenu === index) {
            setOpenMenu(null);
        } else {
            setOpenMenu(index);
        }
    };

    return (
        <aside className={`bg-rookieRed h-full flex flex-col justify-between transition-[width] duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <nav>
                <ul className="space-y-2">
                    {normalMenuItems.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => toggleMenu(index)}
                                className="block w-full text-left text-white p-4 hover:bg-rookieHover rounded"
                                aria-expanded={openMenu === index}
                                aria-controls={`menu-${index}`}
                            >
                                <div className="flex items-center">
                                    <span className={`ml-4 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100 delay-100'}`}>
                                        {item.name}
                                    </span>
                                </div>
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
                    ))}
                </ul>
            </nav>

            {/* 하단에 로그아웃 버튼 */}
            {logoutItem && (
                <div className="mb-4">
                    <Link
                        to={logoutItem.subItems?.[0]?.path || '/logout'} // 필요에 따라 경로 수정
                        className="block text-white p-4 hover:bg-rookieHover rounded mx-4"
                    >
                        {logoutItem.name}
                    </Link>
                </div>
            )}
        </aside>
    );
};

SideBar.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default SideBar;