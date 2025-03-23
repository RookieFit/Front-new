import React from 'react';
import MyPageUserWeightGraph from './MyPageUserWeightGraph';
import MyPageUserMuscleGraph from './MyPageUserMuscleGraph';
import MyPageUserFatGraph from './MyPageUserFatGraph';

const MyPageWorkoutGraph = () => {
    return (
        <div className='flex flex-col items-center w-full h-full gap-5'>
            <h1 className='text-3xl mb-5'>체성분 그래프</h1>
            <section className='bg-gray-300 w-full h-1/2 rounded-xl'>
                <MyPageUserWeightGraph />
            </section>
            <section className='bg-gray-300 w-full h-1/2 rounded-xl'>
                <MyPageUserMuscleGraph />
            </section>
            <section className='bg-gray-300 w-full h-1/2 rounded-xl'>
                <MyPageUserFatGraph />
            </section>
        </div>
    );
};

export default MyPageWorkoutGraph;