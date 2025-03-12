import React, { useEffect, useState } from 'react';
import BoardComponent from './BoardComponent';
import ApiClient from '../../services/ApiClient';
import CommunitySearchSection from './CommunitySearchSection';

const MyCommunityBoard = () => {

    const [searchType, setSearchType] = useState('제목만');
    const [searchQuery, setSearchQuery] = useState('');
    const [boardList, setBoardList] = useState([]);
    const [selectedType, setSelectedType] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchBoardList = async () => {
            try {
                let url = `/user/community/mylist?page=${currentPage - 1}&size=${itemsPerPage}`;
                if (selectedType !== '전체') {
                    url += `&communityType=${selectedType}`;
                }

                const response = await ApiClient.get(url);
                setBoardList(response.data.content || []);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
                setBoardList([]);
            }
        };

        fetchBoardList();
    }, [selectedType, currentPage]);

    const handleSearch = (type, query) => {

        setCurrentPage(1);

        const fetchBoardList = async () => {
            try {
                let url = `/user/community/mylist?page=0&size=${itemsPerPage}`;
                if (type !== '전체') {
                    url += `&communityType=${selectedType}`;
                }

                if (query.trim()) {
                    url += `&searchType=${type}&searchQuery=${encodeURIComponent(query)}`;
                }

                const response = await ApiClient.get(url);
                setBoardList(response.data.content || []);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
                setBoardList([]);
            }
        };

        fetchBoardList();
    };

    return (
        <div>
            <section className='h-[40px] mb-3'>
                <CommunitySearchSection
                    searchType={searchType}
                    setSearchType={setSearchType}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                />
            </section>
            <section>
                <BoardComponent
                    boardList={boardList}
                    totalPages={totalPages}
                    setSelectedType={setSelectedType}
                    selectedType={selectedType}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </section>
        </div>
    );
};

export default MyCommunityBoard;