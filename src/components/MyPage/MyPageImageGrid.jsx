import React from 'react';
import testImage from '../assets/images/kangTe-nim.png';

const MyPageImageGrid = () => {
    const images = [
        testImage, // 실제 Base64 데이터로 교체
        testImage,
        testImage,
        testImage, // 실제 Base64 데이터로 교체
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
    ];
    return (
        <div className="grid grid-cols-3 gap-5 m-4">
            {images.map((image, index) => (
                <div key={index} className="flex justify-center items-center">
                    <img
                        src={image}
                        alt={`Image ${index}`}
                        className="w-full h-[200px] max-w-full rounded-lg shadow-lg border-2" />
                </div>
            ))}
        </div>
    );
};

export default MyPageImageGrid;