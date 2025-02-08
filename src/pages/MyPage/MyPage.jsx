import React, { useState } from 'react';
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import MyPageUserTab from '../../components/MyPage/MyPageUserTab';
import MyPageWorkoutGraph from '../../components/MyPage/MyPageWorkoutGraph';

const MyPage = () => {
    const [currentName, setCurrentName] = useState('');
    return (
        <div className='flex flex-row justify-center gap-5 h-[900px] w-full my-8'>

            <section className='flex flex-col gap-5 w-2/5 '>
                <section className='border-2 h-1/5 bg-white shadow-md'>
                    <MyPageProfile setCurrentName={setCurrentName} />
                </section>
                <section className='h-2/3 p-5 border-2 bg-white shadow-md'>
                    <div className='h-full overflow-auto'>
                        <MyPageWorkoutGraph />
                    </div>
                </section>
            </section>

            <section className='flex flex-col w-2/5 border-b-2 h-[800px] mr-5'>
                <MyPageUserTab currentName={currentName} />
            </section>

        </div>
    );
};

export default MyPage;