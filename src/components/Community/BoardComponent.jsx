import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Common/Pagination';
import writeImage from '../assets/images/community-write-image.png';
import PropTypes from 'prop-types';

const BoardComponent = ({
    boardList,
    totalPages,
    setSelectedType,
    selectedType,
    currentPage,
    setCurrentPage
}) => {
    const navigate = useNavigate();
    const boardTypeList = ['전체', '바프', '일상', '등등', '기타'];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePosts = () => {
        navigate('/editor');
    };

    return (
        <div className='flex flex-col items-center w-full my-2'>
            <hr className='w-full border-2' />
            <div className='flex flex-row w-full h-full'>
                <div className='flex flex-col gap-3 my-4 border-r-2 w-1/5'>
                    {boardTypeList.map((communityType, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 ${selectedType === communityType ? 'bg-gray-200 font-bold' : ''}`}
                            onClick={() => {
                                setSelectedType(communityType);
                                setCurrentPage(1);
                            }}
                        >
                            {communityType}
                        </button>
                    ))}
                </div>
                {boardList.length === 0 ?
                    (
                        <div className='flex flex-col justify-center w-full h-[380px] text-center text-2xl mt-4'>
                            작성된 게시글이 없습니다
                        </div>
                    )
                    :
                    (<div className='w-full h-[397px]'>
                        {boardList.map((board, index) => (
                            <div key={board.communityId}>
                                <Link to={`/community/${board.communityId}`} className={`flex flex-row m-3 gap-10 text-xs ${index !== boardList.length - 1 ? 'border-b border-gray-300 pb-2' : ''}`}>
                                    <p className='ml-3 w-[20px]'>{board.communityId}</p>
                                    <p>[{board.communityType}]</p>
                                    <p className='w-1/2'>{board.communityTitle}</p>
                                    <p className='w-1/6'>{board.communityAuthor}</p>
                                    <p>{board.communityCreatedAt}</p>
                                </Link>
                            </div>
                        ))}
                    </div>)}
            </div>


            <hr className='w-full border-2' />

            <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex-1 flex justify-center ml-20'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
                <button
                    className='flex flex-row border-2 p-1 w-[100px]'
                    onClick={handlePosts}
                >
                    <img src={writeImage} alt='writeImage' className='w-6 h-6 mr-2' />
                    글쓰기
                </button>
            </div>
        </div>
    );
};
BoardComponent.propTypes = {
    boardList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    setSelectedType: PropTypes.func.isRequired,
    selectedType: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default BoardComponent;
