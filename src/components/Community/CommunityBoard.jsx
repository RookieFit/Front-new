import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '../Common/Pagination';
import writeImage from '../assets/images/community-write-image.png';
import { Link, useNavigate } from 'react-router-dom';

const CommunityBoard = () => {

    const navigator = useNavigate();

    const boardTypeList = [
        '전체', '바프', '일상', '등등', '기타'
    ];
    const boardList = useMemo(() => [
        {
            communityId: 1,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        }
    ], []);

    const [selectedType, setSelectedType] = useState('전체');
    const [filteredBoardList, setFilteredBoardList] = useState(boardList);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const filtered = selectedType === '전체'
            ? boardList
            : boardList.filter((board) => board.boardType === selectedType);
        setFilteredBoardList(filtered);
        setCurrentPage(1);
    }, [selectedType, boardList]);

    const paginatedBoards = filteredBoardList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePosts = () => {
        alert('글쓰러가기');
        navigator('/editor');
    };

    return (
        <div className='flex flex-col items-center w-full my-2'>
            <hr className='w-full border-2' />
            <div className='flex flex-row w-full h-full'>
                <div className='flex flex-col gap-3 my-4 border-r-2 w-1/5'>
                    {boardTypeList.map((boardType, index) => (
                        <button
                            key={index}
                            className="px-4 py-2 "
                            onClick={() => setSelectedType(boardType)}
                        >
                            {boardType}
                        </button>
                    ))}
                </div>
                <div className='w-3/4 mt-4'>
                    {paginatedBoards.map((board, index) => (
                        <div key={index}>
                            <Link to={`/community/${board.communityId}`} className={`flex flex-row m-3 gap-10 ${index !== paginatedBoards.length - 1 ? 'border-b border-gray-300 pb-2' : ''}`}>
                                <p className='ml-3 w-[25px]'>{board.id}</p>
                                <p>[{board.boardType}]</p>
                                <p className='w-1/2'>{board.boardTitle}</p>
                                <p>{board.boardAuthor}</p>
                                <p>{board.boardCreatedAt}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <hr className='w-full border-2' />
            <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex-1 flex justify-center ml-20'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredBoardList.length / itemsPerPage)}
                        onPageChange={setCurrentPage}
                    />
                </div>
                <button
                    className='flex flex-row border-2 p-1 w-[100px]'
                    onClick={() => handlePosts()}
                >
                    <img src={writeImage} alt='writeImage' className='w-6 h-6 mr-2' />
                    글쓰기
                </button>
            </div>
        </div>
    );
};

export default CommunityBoard;