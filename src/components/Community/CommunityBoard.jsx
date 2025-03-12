import React, { useEffect, useState } from 'react';
import BoardComponent from './BoardComponent';
import ApiClient from '../../services/ApiClient';

const CommunityBoard = () => {
    const [boardList, setBoardList] = useState([]);
    const [selectedType, setSelectedType] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        const fetchBoardList = async () => {
            try {
                let url = `/user/community/list?page=${currentPage - 1}&size=${itemsPerPage}`;
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
    return (
        <div>
            <BoardComponent
                boardList={boardList}
                totalPages={totalPages}
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default CommunityBoard;