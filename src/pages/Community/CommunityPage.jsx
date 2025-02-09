import React from 'react';
import CommunityHeader from '../../components/Community/CommunityHeader';
import CommunityList from '../../components/Community/CommunityList';

const CommunityPage = () => {
    return (
        <div className='h-screen mt-10'>
            <header className='mt-10'>
                <CommunityHeader />
            </header>
            <body className='h-full'>
                <CommunityList />
            </body>
        </div>
    );
};

export default CommunityPage;