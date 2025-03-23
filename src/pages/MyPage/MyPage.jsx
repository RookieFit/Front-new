import React, { useState } from 'react';
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import MyPageUserTab from '../../components/MyPage/MyPageUserTab';
import MyPageGraphSection from '../../components/MyPage/MyPageGraphSection';
import Modal from '../../components/Common/Modal';
import UpdateProfileModalComponent from '../../components/MyPage/UpdateProfileModalComponent';

const MyPage = () => {
    const [currentName, setCurrentName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [updateProfile, setUpdateProfile] = useState({
        userProfileImageUri: '',
        userProfileGymName: '',
        userProfileMessage: '',
        userProfileName: '',
        userProfileAddress: '',
        userProfileNickname: '',
    });
    const [pageKey, setPageKey] = useState(0);
    return (
        <div className='flex flex-row justify-center gap-5 h-[800px] w-full my-8'>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <UpdateProfileModalComponent
                    updateProfile={updateProfile}
                    setUpdateProfile={setUpdateProfile}
                    setIsOpen={setIsOpen}
                    setPageKey={setPageKey}
                />
            </Modal>

            <section className='flex flex-col gap-5 w-2/5 '>
                <section className='border-2 h-1/4 bg-white shadow-md'>
                    <MyPageProfile
                        setCurrentName={setCurrentName}
                        currentName={currentName}
                        setIsOpen={setIsOpen}
                        setUpdateProfile={setUpdateProfile}
                        pageKey={pageKey}
                    />
                </section>
                <section className='h-3/4 p-5 border-2 bg-white shadow-md'>
                    <div className='h-full overflow-auto'>
                        <MyPageGraphSection />
                    </div>
                </section>
            </section>

            <section className='flex flex-col w-2/5 border-b-2 h-[800px] mr-5'>
                <MyPageUserTab
                    currentName={currentName}
                    setPageKey={setPageKey}
                />
            </section>

        </div>
    );
};

export default MyPage;