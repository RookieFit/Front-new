import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import Pagination from '../Common/Pagination';
import writeImage from '../assets/images/community-write-image.png';

const BoardComponent = ({ boardTypeList = [], boardList = [] }) => {
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredBoardList = useMemo(() => {
        return selectedType === '전체'
            ? boardList
            : boardList.filter((board) => board.boardType === selectedType);
    }, [boardList, selectedType]);

    const paginatedBoards = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredBoardList.slice(start, start + itemsPerPage);
    }, [filteredBoardList, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedType]);

    const handlePosts = () => {
        alert('글쓰러가기');
        navigate('/editor');
    };

    return (
        <div className='flex flex-col items-center w-full my-2'>
            <hr className='w-full border-2' />
            {paginatedBoards.length === 0 ?
                (<div className='flex flex-col justify-center h-[400px] text-2xl'>작성된 게시글이 없습니다</div>) :
                (<div className='flex flex-row w-full h-full'>
                    <div className='flex flex-col gap-3 my-4 border-r-2 w-1/5'>
                        {boardTypeList.map((boardType, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 ${selectedType === boardType ? 'bg-gray-200 font-bold' : ''}`}
                                onClick={() => setSelectedType(boardType)}
                            >
                                {boardType}
                            </button>
                        ))}
                    </div>
                    <div className='w-3/4 mt-4'>
                        {paginatedBoards.map((board, index) => (
                            <div key={board.communityId}>
                                <Link to={`/community/${board.communityId}`} className={`flex flex-row m-3 gap-10 ${index !== paginatedBoards.length - 1 ? 'border-b border-gray-300 pb-2' : ''}`}>
                                    <p className='ml-3 w-[25px]'>{board.communityId}</p>
                                    <p>[{board.boardType}]</p>
                                    <p className='w-1/2'>{board.boardTitle}</p>
                                    <p>{board.boardAuthor}</p>
                                    <p>{board.boardCreatedAt}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>)}
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
BoardComponent.propTypes = {
    boardTypeList: PropTypes.array.isRequired,
    boardList: PropTypes.array.isRequired
};

export default BoardComponent;