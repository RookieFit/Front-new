import React from 'react';
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    return (
        <div className="flex justify-center gap-3 my-4">
            <button
                className="px-3 py-1 bg-gray-300 rounded-md"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className="px-3 py-1 bg-gray-300 rounded-md"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.string.isRequired,
    totalPages: PropTypes.string.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;