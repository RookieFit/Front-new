import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from '../../services/ApiClient';
import { useParams } from 'react-router-dom';
import Pagination from '../Common/Pagination';

const CommunityDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(
        {
            communityTitle: '',
            communityAuthor: '',
            communityType: '',
            communityContent: '',
            communityCreatedAt: ''

        });
    const [newAnswer, setNewAnswer] = useState('');
    const [answerList, setAnswerList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchBoardList = async () => {
            try {
                const response = await ApiClient.get(`/user/community/detail?communityId=${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };

        fetchBoardList();
    }, [id]);

    const fetchAnswerList = useCallback(async () => {
        try {
            const response = await ApiClient.get(`/user/community/${id}/answer/list?page=${currentPage - 1}&size=${itemsPerPage}`);
            setAnswerList(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("댓글 불러오기 실패:", error);
            setAnswerList([]);
        }
    }, [id, currentPage]);

    useEffect(() => {
        fetchAnswerList();
    }, [fetchAnswerList]);


    const handleAddAnswer = async () => {
        if (newAnswer.trim() === '') return;
        const newComment = { communityAnswersContent: newAnswer };

        try {
            await ApiClient.post(`/user/community/${id}/answer/create`, newComment);
            setNewAnswer('');
            fetchAnswerList();
        } catch (error) {
            console.log("댓글오류" + error);
        };
        setNewAnswer('');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='flex flex-col m-10'>
            <header className='w-full'>
                <h1 className='text-3xl font-bold'>{post.communityType}</h1>
                <hr className='border-2 border-rookieRed my-2' />
            </header>
            <div className='flex flex-col'>
                <div className='border-2 p-2 mb-3'>
                    <h1>제목: {post.communityTitle}</h1>
                    <h2>작성자: {post.communityAuthor}</h2>
                    <h3>작성일자: {post.communityCreatedAt}</h3>
                </div>
                <div className='m-2'>
                    <div dangerouslySetInnerHTML={{ __html: post.communityContent }} />
                </div>
            </div>
            <hr className='border-2 border-rookieRed my-2' />
            <section>
                {answerList.map((answer, index) => (
                    <div key={answer.communityAnswersId} className='flex flex-col m-2'>
                        <div className='flex flex-raw gap-2 items-baseline border-b-2'>
                            <p>{answer.communityAnswersAuthor}</p>
                            <p className='text-xs'>{answer.communityAnswersCreatedAt}</p>
                        </div>
                        <p>{answer.communityAnswersContent}</p>
                    </div>
                ))}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <textarea
                    className='w-full p-2 border-2'
                    placeholder='댓글작성'
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                ></textarea>
            </section>
            <div className='flex flex-raw justify-end w-full'>
                <button
                    className='bg-rookieRed text-white px-3 py-1 rounded-lg'
                    onClick={handleAddAnswer}
                >
                    댓글쓰기
                </button>
            </div>
        </div>
    );
};

export default CommunityDetail;