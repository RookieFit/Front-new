import React from 'react';
import CommunitySearchSection from './CommunitySearchSection';
import BoardComponent from './BoardComponent';

const CommunityList = () => {
    return (
        <div className='flex flex-col w-full'>
            <section className='h-[40px] mb-3'>
                <CommunitySearchSection />
            </section>
            <section className='h-2/3'>
                <BoardComponent />
            </section>
        </div>
    );
};

export default CommunityList;