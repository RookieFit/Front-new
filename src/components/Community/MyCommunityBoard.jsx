import React, { useMemo } from 'react';
import BoardComponent from './BoardComponent';

const MyCommunityBoard = () => {
    const boardList = useMemo(() => [
        {
            communityId: 1,
            boardType: '일상',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 2,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 3,
            boardType: '기타',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 4,
            boardType: '일상',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 5,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 6,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 7,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 8,
            boardType: '일상',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 9,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 10,
            boardType: '기타',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 11,
            boardType: '일상',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 12,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 13,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 14,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 15,
            boardType: '일상',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 16,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 17,
            boardType: '기타',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 18,
            boardType: '일상',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 19,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 20,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
        {
            communityId: 21,
            boardType: '바프',
            boardTitle: '제목입니다.',
            boardAuthor: '작성자',
            boardCreatedAt: '2025/02/15 12:20'
        },
    ], []);
    const boardTypeList = useMemo(() => {
        const types = boardList.map((board) => board.boardType);
        return ['전체', ...Array.from(new Set(types))];
    }, [boardList]);
    return (
        <div>
            <BoardComponent boardList={boardList} boardTypeList={boardTypeList} />
        </div>
    );
};

export default MyCommunityBoard;