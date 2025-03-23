import React, { useEffect, useState } from 'react';
import { IoIosPin } from "react-icons/io";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import ApiClient from '../../services/ApiClient';
import PropTypes from "prop-types";

const MyPageProfile = ({ setCurrentName, setIsOpen, setUpdateProfile, pageKey }) => {
    const [userProfile, setUserProfile] = useState({
        userProfileImageUri: '',
        userProfileGymName: '',
        userProfileMessage: '',
        userProfileName: '',
        userProfileAddress: '',
        userProfileNickname: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await ApiClient.get(
                    `/user/userdata/getprofile`,
                );
                setUserProfile(response.data);
                setUpdateProfile(response.data);
                setCurrentName(response.data.userProfileName || '이름없음');
            } catch (error) {
                if (error.response) {
                    console.log("서버 응답 오류:", error.response.data);
                    console.error("응답 상태 코드:", error.response.status);
                } else if (error.request) {
                    console.error("서버로부터 응답을 받지 못했습니다:", error.request);
                } else {
                    console.error("요청 설정 오류:", error.message);
                }
            }
        };

        fetchProfile();
    }, [setCurrentName, setUpdateProfile, pageKey]); // 컴포넌트 마운트 시 한 번 실행

    return (
        <div className='flex flex-raw justify-center items-center h-full w-full gap-5'>
            <div className='mr-3'>
                <img
                    src={userProfile.userProfileImageUri}
                    className='border-2 rounded-full w-40 h-40 object-cover'
                    alt='Profile'
                />
            </div>
            <div className='flex flex-col gap-1 text-sm font-medium'>
                <div className='flex flex-raw'>
                    <span className='m-2 text-xl'>{userProfile.userProfileNickname}</span>
                    <button className='text-sm' onClick={() => setIsOpen(true)}>수정하기</button>
                </div>
                <div className='flex flex-raw items-center gap-2'>
                    <IoIosPin />
                    <span className='w-[220px]'>{userProfile.userProfileAddress}</span>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <HiOutlineBuildingOffice2 />
                    <span>{userProfile.userProfileGymName}</span>
                </div>
            </div>
        </div>
    );
};

MyPageProfile.propTypes = {
    setCurrentName: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    setUpdateProfile: PropTypes.func.isRequired,
    pageKey: PropTypes.number.isRequired,
};

export default MyPageProfile;