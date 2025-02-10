import React from 'react';


const MyPageImageGrid = () => {
    const images = [
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