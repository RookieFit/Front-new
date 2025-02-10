import React from 'react';
import CommunityHeader from '../../components/Community/CommunityHeader';
import CommunityList from '../../components/Community/CommunityList';

const CommunityPage = () => {
    return (
        <div>
            <header className='mt-10'>
                <CommunityHeader />
            </header>
            <section className='h-full'>
                <CommunityList />
            </section>
        </div>
    );
};

export default CommunityPage;