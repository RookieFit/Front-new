import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center bg-black justify-center border-2 border-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* 모달 헤더 */}
                <div className="flex justify-end items-center pb-2 mb-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        ✖
                    </button>
                </div>

                {/* 모달 본문 */}
                <div>{children}</div>
            </div>
        </div>
    );
};

// PropTypes 추가
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // isOpen은 필수 boolean
    onClose: PropTypes.func.isRequired, // onClose는 필수 함수
    children: PropTypes.node, // children을 명시적으로 정의
};

export default Modal;
