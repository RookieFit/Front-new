import React, { useState } from 'react';
import WorkoutCalendar from './WorkoutCalendar';
import Modal from '../Common/Modal';
import WorkoutModalComponent from './WorkoutModalComponent';

const Workout = () => {
    //페이지 리렌더링을 위한 pagekey
    const [pageKey, setPageKey] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [imageList, setImageList] = useState([]);

    return (
        <div className='h-full w-full'>
            <WorkoutCalendar
                pageKey={pageKey}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setSelectedDate={setSelectedDate}
                setTitle={setTitle}
                setComment={setComment}
                setImageList={setImageList}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <WorkoutModalComponent
                    setPageKey={setPageKey}
                    selectedDate={selectedDate}
                    setIsOpen={setIsOpen}
                    title={title}
                    comment={comment}
                    imageList={imageList}
                />
            </Modal>
        </div>
    );
};

export default Workout;