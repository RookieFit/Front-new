import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { menuItems } from './menuItems';

const SideBar = ({ isCollapsed, toggleSidebar }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (index) => {
        if (openMenu === index) {
            setOpenMenu(null);
        } else {
            setOpenMenu(index);
        }
    };

    return (
        <aside
            className={`bg-rookieFitRed h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
        >
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => toggleMenu(index)}
                                className="block w-full text-left text-white p-2 hover:bg-rookieHover rounded"
                                aria-expanded={openMenu === index}
                                aria-controls={`menu-${index}`}
                            >
                                <div className="flex items-center">
                                    <span className="material-icons">{item.icon}</span>
                                    {!isCollapsed && <span className="ml-2">{item.name}</span>}
                                </div>
                            </button>

                            {/* 하위 메뉴 */}
                            {item.subItems && item.subItems.length > 0 && (
                                <ul
                                    id={`menu-${index}`}
                                    className={`pl-4 mt-2 space-y-1 overflow-hidden ${openMenu === index && !isCollapsed
                                        ? 'max-h-96 transition-[max-height] duration-300 ease-in-out'
                                        : 'max-h-0 transition-[max-height] duration-300 ease-in-out'
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
        </aside>
    );
};

// PropTypes 정의
SideBar.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default SideBar;
