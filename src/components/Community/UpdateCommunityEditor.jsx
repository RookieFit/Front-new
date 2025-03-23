import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TipTapEditor from '../Common/TipTapEditor';
import ApiClient from '../../services/ApiClient';

function UpdateCommunityEditor() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [communityType, setCommunityType] = useState("바프");
    const [images, setImages] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoardList = async () => {
            try {
                const response = await ApiClient.get(`/user/community/detail?communityId=${id}`);
                setTitle(response.data.communityTitle);
                setContent(response.data.communityContent);
                setCommunityType(response.data.communityType);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };

        fetchBoardList();
    }, [id]);

    const handleImageUpload = (file) => {
        setImages((prev) => [...prev, file]);
    };

    const handleUpdate = async () => {
        try {
            if (!content) return alert('내용을 입력하세요');
            setIsSaving(true);
            const formData = new FormData();
            let imageUrls = [];

            if (images.length > 0) {
                images.forEach(image => formData.append("contentImageFiles", image));
                const response = await ApiClient.post("/user/community/uploadContentImages",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (response.data) {
                    imageUrls = response.data;
                }
            }

            let updatedContent = content;
            imageUrls.forEach((url) => {
                updatedContent = updatedContent.replace(/blob:[^"]+/, url);
            });

            const updatedData = {
                communityTitle: title,
                communityContent: updatedContent,
                communityType: communityType,
            };

            const updateResponse = await ApiClient.put(`/user/community/updateCommunity?communityId=${id}`, updatedData);

            alert(updateResponse.data.message);
            navigate(`/community/${id}`);
        } catch (error) {
            console.error("게시글 저장 실패:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="relative p-4 h-full">
            <h1 className="text-xl font-bold mb-2">게시글 수정</h1>
            <input
                type="text"
                placeholder={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <select
                className='w-[120px] h-[40px] px-2 text-xs'
                value={communityType}
                onChange={(e) => setCommunityType(e.target.value)}
            >
                <option>바프</option>
                <option>일상</option>
                <option>등등</option>
                <option>기타</option>
            </select>
            <TipTapEditor content={content} onChange={setContent} onImageUpload={handleImageUpload} />
            <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>수정하기</button>

            {isSaving && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-40 z-10"></div>
            )}
            {isSaving && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20">
                    <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div>
                </div>
            )}
        </div>
    );
};

export default UpdateCommunityEditor;