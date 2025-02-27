import { useEffect, useRef, useState } from 'react';

const useImageUploader = (initialImages = []) => {
    const [imageList, setImageList] = useState(
        initialImages.map(uri => ({ file: null, preview: uri }))
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const fileInputRef = useRef(null);

    // 이전 imageList를 저장해서 불필요한 revokeObjectURL 방지
    const prevImageListRef = useRef(imageList);

    useEffect(() => {
        return () => {
            prevImageListRef.current.forEach(image => {
                if (image.file) {
                    URL.revokeObjectURL(image.preview);
                }
            });
        };
    }, []);

    useEffect(() => {
        const prevImages = prevImageListRef.current;
        prevImages.forEach(image => {
            if (!imageList.includes(image) && image.file) {
                URL.revokeObjectURL(image.preview);
            }
        });

        prevImageListRef.current = imageList;
    }, [imageList]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImageList(prev => [...prev, ...newImages]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDeleteImage = (index) => {
        setImageList(prev => {
            const newList = prev.filter((_, i) => i !== index);
            setCurrentIndex((prevIndex) => (newList.length === 0 ? 0 : Math.min(prevIndex, newList.length - 1)));
            return newList;
        });
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (imageList.length === 0 ? 0 : (prev + 1) % imageList.length));
    };

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return {
        imageList,
        currentIndex,
        fileInputRef,
        handleFileChange,
        handleDeleteImage,
        handlePrev,
        handleNext,
        handleDivClick
    };
};

export default useImageUploader;
