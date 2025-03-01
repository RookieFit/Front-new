import React, { useRef, useState } from 'react';
import PropTypes from "prop-types";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from 'react-router-dom';

const UpdateProfileModalComponent = ({ updateProfile, setUpdateProfile, setIsOpen, setPageKey }) => {

    const navigator = useNavigate();

    const [selectImageFile, setSelectImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectImageFile(file);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (key, value) => {
        setUpdateProfile((prev) => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            if (selectImageFile) {
                formData.append("profileimage", selectImageFile);
            }

            formData.append("profile", new Blob([JSON.stringify({
                ...updateProfile,
                userProfileImageUri: undefined,
            })], { type: "application/json" }));

            const response = await ApiClient.post("/user/userdata/createprofile", formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("프로필 업데이트 성공");
            setIsOpen(false);
            setPageKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("프로필 업데이트 실패:", error);
        }
    };
    const imagePreviewUrl = selectImageFile ? URL.createObjectURL(selectImageFile) : updateProfile.userProfileImageUri;
    return (
        <div className='flex flex-col w-[300px] items-center'>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
            <img
                src={imagePreviewUrl}
                alt='Profile'
                className='border-2 rounded-full w-40 h-40 object-cover mb-4'
                onClick={handleImageClick}
            />
            {[
                { key: "userProfileName", label: "이름" },
                { key: "userProfileNickname", label: "닉네임" },
                { key: "userProfileGymName", label: "헬스장 이름" },
                { key: "userProfileMessage", label: "상태메시지" },
                { key: "userProfileAddress", label: "주소" }
            ].map(({ key, label }) => (
                <div key={key} className="flex flex-col w-full m-3">
                    <label>{label}</label>
                    <input
                        type="text"
                        value={updateProfile[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="border p-1 rounded"
                    />
                </div>
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3" onClick={handleSubmit}>저장하기</button>
        </div>
    );
};

UpdateProfileModalComponent.propTypes = {
    updateProfile: PropTypes.object.isRequired,
    setUpdateProfile: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    setPageKey: PropTypes.func.isRequired,
};

export default UpdateProfileModalComponent;