import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './WorkoutCalendar.css';

const WorkoutCalendar = ({ setIsOpen, setSelectedDate, setTitle, setComment, setImageList }) => {
    const [events, setEvents] = useState([]);

    // 날짜 변환 함수 (YYMMDD -> YYYY-MM-DD)
    const formatDate = (shortDate) => {
        const year = `20${shortDate.substring(0, 2)}`;
        const month = shortDate.substring(2, 4);
        const day = shortDate.substring(4, 6);
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const koreanHolidays = [
            { title: "신정", date: "2025-01-01", color: "green", type: "holiday" },
            { title: "설날", date: "2025-01-29", color: "green", type: "holiday" },
            { title: "삼일절", date: "2025-03-01", color: "green", type: "holiday" },
            { title: "어린이날", date: "2025-05-05", color: "green", type: "holiday" },
            { title: "광복절", date: "2025-08-15", color: "green", type: "holiday" },
            { title: "추석", date: "2025-09-07", color: "green", type: "holiday" },
            { title: "개천절", date: "2025-10-03", color: "green", type: "holiday" },
            { title: "크리스마스", date: "2025-12-25", color: "green", type: "holiday" },
        ];

        const workoutList = [
            { comment: 'comment 1', workout_title: 'title 1', workoutCreatedData: '250101', imageUris: [{ url: "image1.jpg" }] },
            { comment: 'comment 2', workout_title: 'title 2', workoutCreatedData: '250129', imageUris: [{ url: "image2.jpg" }] },
            { comment: 'comment 3', workout_title: 'title 3', workoutCreatedData: '250130', imageUris: [{ url: "image3.jpg" }] },
        ];

        const workoutEvents = workoutList.map(workout => ({
            title: workout.workout_title,
            date: formatDate(workout.workoutCreatedData),
            color: "blue",
            type: "workout",
            comment: workout.comment,
            imageUris: workout.imageUris,
        }));

        // 이벤트 목록을 설정
        setEvents([...koreanHolidays, ...workoutEvents]);
    }, []);

    // 날짜 클릭 시 실행되는 함수
    const handleSelectDate = (date) => {
        setIsOpen(true);
        setSelectedDate(date);

        // 해당 날짜의 모든 이벤트 가져오기
        const matchedEvents = events.filter(event => event.date === date);

        //운동 일정이 있으면 해당 데이터 설정
        const workoutEvent = matchedEvents.find(event => event.type === "workout");
        if (workoutEvent) {
            setTitle(workoutEvent.title);
            setComment(workoutEvent.comment);
            setImageList(workoutEvent.imageUris);
            return;
        }

        //운동 일정이 없고 공휴일만 있으면 공휴일 제목 설정 (댓글 & 이미지 리스트는 빈 값)
        const holidayEvent = matchedEvents.find(event => event.type === "holiday");
        if (holidayEvent) {
            setTitle(holidayEvent.title);
            setComment("");
            setImageList([]);
            return;
        }

        //아무 이벤트도 없으면 모든 값 빈 값 설정
        setTitle("");
        setComment("");
        setImageList([]);
    };

    return (
        <div className="h-[800px] p-4 bg-gray-50 rounded-lg shadow-md">
            <FullCalendar
                height="100%"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                editable={true}
                selectable={true}
                locale={'ko'}
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next",
                }}
                // 이벤트 클릭 시
                eventClick={(info) => handleSelectDate(info.event.startStr)}
                // 날짜 클릭 시, 운동 일정이 있으면 운동 제목, 없으면 공휴일 제목 반환
                dateClick={(info) => handleSelectDate(info.dateStr)}
            />
        </div>
    );
};

WorkoutCalendar.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setComment: PropTypes.func.isRequired,
    setImageList: PropTypes.func.isRequired,
};

export default WorkoutCalendar;
