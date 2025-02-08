import React from 'react';

const MyPageWorkoutGraph = () => {
    return (
        <div className='flex flex-col items-center w-full h-full gap-5'>
            <h1 className='text-3xl mb-5'>운동량 추세</h1>
            <section className='bg-gray-300 w-full h-1/2 rounded-xl'>그래프</section>
            <section className='bg-gray-300 w-full h-1/2 rounded-xl'>그래프</section>
        </div>
    );
};

export default MyPageWorkoutGraph;