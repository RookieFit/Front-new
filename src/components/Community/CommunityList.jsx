import React from 'react';
import CommunitySearchSection from './CommunitySearchSection';
import CommunityBoard from './CommunityBoard';

const CommunityList = () => {
    return (
        <div className='flex flex-col w-full'>
            <section className='h-[40px] mb-3'>
                <CommunitySearchSection />
            </section>
            <section className='h-2/3'>
                <CommunityBoard />
            </section>
        </div>
    );
};

export default CommunityList;