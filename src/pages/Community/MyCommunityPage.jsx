import React from 'react';
import MyCommunityBoard from '../../components/Community/MyCommunityBoard';
import MyCommunityHeader from '../../components/Community/MyCommunityHeader';

const MyCommunityPage = () => {
    return (
        <div>
            <header className='mt-10'>
                <MyCommunityHeader />
            </header>
            <section>
                <MyCommunityBoard />
            </section>
        </div>
    );
};

export default MyCommunityPage;