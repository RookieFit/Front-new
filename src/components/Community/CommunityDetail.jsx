import React, { useState } from 'react';
import ApiClient from '../../services/ApiClient';
import { useParams } from 'react-router-dom';

const CommunityDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(
        {
            title: 'ㄴㅇㄻㄴㅇㄹㄹㄴㅇㄹ',
            author: '작성자',
            boardType: '바프',
            content: '<p>hi<p>'
        });
    const [answerList, setAnswerList] = useState([
        {
            answerId: 1,
            answerAuthor: '댓글작성자',
            content: '댓글입니다',
            answerCreatedAt: '2025. 02. 10. 22:06'
        },
        {
            answerId: 2,
            answerAuthor: '댓글작성자',
            content: '댓글입니다',
            answerCreatedAt: '2025. 02. 12. 22:06'
        },
        {
            answerId: 3,
            answerAuthor: '댓글작성자',
            content: '댓글입니다',
            answerCreatedAt: '2025. 02. 13. 22:06'
        },
        {
            answerId: 4,
            answerAuthor: '댓글작성자',
            content: '댓글입니다',
            answerCreatedAt: '2025. 02. 16. 22:06'
        },
    ]);

    const [newAnswer, setNewAnswer] = useState('');

    //todo: 댓글추가 작성자부분 해당 userid나 이름이 들어감
    const handleAddAnswer = async () => {
        if (newAnswer.trim() === '') return;
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const formattedTime = now.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        //todo: 나중에 백엔드 추가 후 answerId삭제
        const newComment = {
            answerId: answerList.length + 1,
            answerAuthor: '댓글 추가 작성자',
            content: newAnswer,
            answerCreatedAt: `${formattedDate} ${formattedTime}`,
            communityId: id
        };
        /*try {
            const response = await ApiClient.post('/api/user/community/answer/create', newComment);
            const createComment = {
                ...newComment,
                id: response.data.answerId
            };
            setAnswerList([...answerList, response, createComment]);
            setNewAnswer('');
        } catch (error) {
            console.log("댓글오류" + error);
        };*/
        setAnswerList([...answerList, newComment]);
        setNewAnswer('');
    };
    return (
        <div className='flex flex-col m-10'>
            <header className='w-full'>
                <h1 className='text-3xl font-bold'>{post.boardType}</h1>
                <hr className='border-2 border-rookieRed my-2' />
            </header>
            <div className='flex flex-col'>
                <div className='border-2 p-2 mb-3'>
                    <h1>제목: {post.title}</h1>
                    <h2>작성자: {post.author}</h2>
                </div>
                <div className='m-2'>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
            <hr className='border-2 border-rookieRed my-2' />
            <section>
                {answerList.map((answer, index) => (
                    <div key={answer.answerId} className='flex flex-col m-2'>
                        <div className='flex flex-raw gap-2 items-baseline border-b-2'>
                            <p>{answer.answerAuthor}</p>
                            <p className='text-xs'>{answer.answerCreatedAt}</p>
                        </div>
                        <p>{answer.content}</p>
                    </div>
                ))}
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