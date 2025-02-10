import React from 'react';

const CommunitySearchSection = () => {
    return (
        <div className='flex flex-row justify-end gap-2 w-full'>
            <select className='w-[120px] h-[40px] px-2 text-xs'>
                <option>제목만</option>
                <option>게시글 + 댓글</option>
                <option>글작성자</option>
                <option>댓글내용</option>
            </select>
            <input
                type='text'
                className='px-3 w-1/6'
                placeholder='검색어를 입력해주세요.'
            />
            <button
                type='submit'
                className='w-[80px] bg-green-400 text-white'
            >
                검색
            </button>
        </div>
    );
};

export default CommunitySearchSection;