import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from './menuItems';

const SideBar = () => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (index) => {
        if (openMenu === index) {
            setOpenMenu(null);
        } else {
            setOpenMenu(index);
        }
    };

    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4">
            <h2 className="text-xl font-semibold mb-4">메뉴</h2>
            <ul className="space-y-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <div>
                            <Link
                                to={item.path}
                                className="block p-2 hover:bg-gray-700 rounded cursor-pointer"
                                onClick={() => toggleMenu(index)}
                            >
                                {item.name}
                            </Link>
                        </div>

                        {item.subItems && item.subItems.length > 0 && (
                            <ul
                                className={`pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openMenu === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                        <Link
                                            to={subItem.path}
                                            className="block p-2 hover:bg-gray-600 rounded"
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
        </div>
    );
};

export default SideBar;
