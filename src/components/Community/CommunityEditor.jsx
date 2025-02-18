import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TipTapEditor from '../Common/TipTapEditor';

const CommunityEditor = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleImageUpload = (file) => {
        setImages((prev) => [...prev, file]);
    };

    //TODO: 백서버 만든후 변경할것 (25/02/11_김민준)
    const handleSave = async () => {
        try {
            if (!content) return alert('내용을 입력하세요');

            /*const formdata = new FormData();
            images.forEach(image => formdata.append('contentImageFiles', image));

            //게시글에 포함된 이미지파일을 백서버에 저장
            const response = await fetch("/api/upload-images", {
                method: "POST",
                body: formData,
            });

            //이미지파일 저장후 url를 response로 받고 blob으로 시작하는 주소를 변경
            const data = await Response.json();
            if (data.imageUrls) {
                let updatedContent = content;
                data.imageUrls.forEach((url) => {
                    updatedContent = updatedContent.replace("blob:", url);
                });

                //img 태그의 이미지 주소 변경후 백에 제목과 함께 콘텐츠 저장
                const saveResponse = await fetch("/api/save-post", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, content: updatedContent }),
                });

                //게시글 내용 저장 성공시 success 반환
                const saveData = await saveResponse.json();
                if (saveData.success) {
                    alert("게시글이 저장되었습니다!");
                    navigate('/community'); // 저장 후 이동
                }
            }*/
            console.log("title: " + title + "/" + "content: " + content);
            alert("게시글이 저장되었습니다!");
            navigate('/community');
        } catch (error) {
            console.error("게시글 저장 실패:", error);
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">게시글 작성</h1>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <TipTapEditor content={content} onChange={setContent} onImageUpload={handleImageUpload} />
            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2">저장</button>
        </div>
    );
};

export default CommunityEditor;