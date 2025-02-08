import React, { useState } from 'react';
import WorkoutCalendar from './WorkoutCalendar';
import Modal from '../Common/Modal';
import WorkoutModalComponent from './WorkoutModalComponent';

const Workout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [imageList, setImageList] = useState([]);

    return (
        <div className='h-full w-full'>
            <WorkoutCalendar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setSelectedDate={setSelectedDate}
                setTitle={setTitle}
                setComment={setComment}
                setImageList={setImageList}
            />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <WorkoutModalComponent
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