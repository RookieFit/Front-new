import React, { useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import ApiClient from "../../services/ApiClient";
import GooglePlacesAutocomplete from '../Common/GooglePlacesAutocomplete';

const UpdateProfileModalComponent = ({ updateProfile, setUpdateProfile, setIsOpen, setPageKey }) => {

    const [selectImageFile, setSelectImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(updateProfile.userProfileImageUri);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedAddress, setSelectedAddress] = useState(updateProfile.userProfileAddress || "");

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
        setIsLoading(true);
        try {
            const formData = new FormData();

            if (selectImageFile) {
                formData.append("profileimage", selectImageFile);
            }

            formData.append("profile", new Blob([JSON.stringify({
                ...updateProfile,
                userProfileImageUri: undefined,
                userProfileAddress: selectedAddress || updateProfile.userProfileAddress,
            })], { type: "application/json" }));

            const response = await ApiClient.post("/user/userdata/createprofile", formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert(response.data.message);
            setIsOpen(false);
            setPageKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("프로필 업데이트 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectImageFile) {
            const objectUrl = URL.createObjectURL(selectImageFile);
            setImagePreviewUrl(objectUrl);
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setImagePreviewUrl(updateProfile.userProfileImageUri);
        }
    }, [selectImageFile, updateProfile.userProfileImageUri]);

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
            ].map(({ key, label }) => (
                <div key={key} className="flex flex-col w-full m-1">
                    <label>{label}</label>
                    <input
                        type="text"
                        value={updateProfile[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="border p-1 rounded"
                    />
                </div>
            ))}
            <GooglePlacesAutocomplete onSelectAddress={(address) => setSelectedAddress(address)} placeholder={selectedAddress} />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? "저장중..." : "저장하기"}
            </button>
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