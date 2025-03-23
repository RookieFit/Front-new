import PropTypes from 'prop-types';
import React from 'react';

const CommunitySearchSection = ({ searchType, setSearchType, searchQuery, setSearchQuery, handleSearch }) => {
    const handleSearchClick = () => {
        handleSearch(searchType, searchQuery); // 버튼 클릭 시 검색 요청 실행
    };
    return (
        <div className='flex flex-row justify-end gap-2 w-full'>
            <select
                className='w-[120px] h-[40px] px-2 text-xs'
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value={"제목만"}>제목만</option>
                <option value={"게시글+댓글"}>게시글 + 댓글</option>
                <option value={"글작성자"}>글작성자</option>
                <option value={"댓글내용"}>댓글내용</option>
            </select>
            <input
                type='text'
                className='px-3 w-1/6'
                placeholder="검색어를 입력해주세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                type='button'
                className='w-[80px] bg-green-400 text-white'
                onClick={handleSearchClick}
            >
                검색
            </button>
        </div>
    );
};

CommunitySearchSection.propTypes = {
    searchType: PropTypes.string.isRequired,
    setSearchType: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    setPageKey: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default CommunitySearchSection;