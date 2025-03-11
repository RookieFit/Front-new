import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TipTapEditor from '../Common/TipTapEditor';
import ApiClient from '../../services/ApiClient';

const CommunityEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [communityType, setCommunityType] = useState("바프");
    const [images, setImages] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = (file) => {
        setImages((prev) => [...prev, file]);
    };

    const handleSave = async () => {
        try {
            if (!content) return alert('내용을 입력하세요');
            setIsSaving(true);
            const formData = new FormData();
            if (images.length > 0) {
                images.forEach(image => formData.append("contentImageFiles", image));
            }

            //게시글에 포함된 이미지파일을 백서버에 저장
            const response = await ApiClient.post("/user/community/uploadContentImages",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            //이미지파일 저장후 url를 response로 받고 blob으로 시작하는 주소를 변경
            if (response.data) {
                let updatedContent = content;
                response.data.forEach((url) => {
                    updatedContent = updatedContent.replace(/blob:[^"]+/, url); //blob으로 시작하고 "전까지의 내용을 url로 변경
                });

                const requestData = {
                    communityTitle: title,
                    communityContent: updatedContent,
                    communityType: communityType,
                };

                //img 태그의 이미지 주소 변경후 백에 제목과 함께 콘텐츠 저장
                const saveResponse = await ApiClient.post("/user/community/createCommunity", requestData);

                alert(saveResponse.data.message);
                navigate('/community'); // 저장 후 이동
            }
        } catch (error) {
            console.error("게시글 저장 실패:", error);
        } finally {
            setIsSaving(false);
        }
    };
    return (
        <div className="relative p-4">
            <h1 className="text-xl font-bold mb-2">게시글 작성</h1>
            <input
                type="text"
                placeholder="제목을 입력하세요"
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
            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2">저장</button>

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

export default CommunityEditor;