import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './WorkoutCalendar.css';
import ApiClient from '../../services/ApiClient';

const WorkoutCalendar = ({ setIsOpen, setSelectedDate, setTitle, setComment, setImageList }) => {

    const [events, setEvents] = useState([]);
    const [workoutList, setWorkoutList] = useState([
        {
            workoutTitle: '',
            workoutComment: '',
            workoutImageUris: [],
            workoutCreatedDate: ''
        }
    ]);

    useEffect(() => {
        const fetchWorkoutList = async () => {
            try {
                const response = await ApiClient.get(
                    `/user/workout/getworkout`,
                );
                setWorkoutList(response.data);
            } catch (error) {
                if (error.response) {
                    console.log("서버 응답 오류:", error.response.data);
                    console.error("응답 상태 코드:", error.response.status);
                } else if (error.request) {
                    console.error("서버로부터 응답을 받지 못했습니다:", error.request);
                } else {
                    console.error("요청 설정 오류:", error.message);
                }
            }
        };

        fetchWorkoutList();
    }, []); // 컴포넌트 마운트 시 한 번 실행

    //todo: 공휴일 api 끌고와서 연결하기
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

        // workoutList가 변경될 때마다 실행
        const workoutEvents = workoutList.map(workout => ({
            title: workout.workoutTitle,
            date: workout.workoutCreatedDate,
            color: "blue",
            type: "workout",
            comment: workout.workoutComment,
            imageUris: workout.workoutImageUris
        }));

        // 새로운 이벤트 리스트 설정
        setEvents([...koreanHolidays, ...workoutEvents]);
    }, [workoutList]); // workoutList가 변경될 때마다 실행

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

        //아무 이벤트도 없으면 모든 값 빈 값 설정
        setTitle("");
        setComment("");
        setImageList([]);
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="h-full p-4 bg-gray-50 rounded-lg shadow-md w-full">
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
                    eventClick={(info) => handleSelectDate(info.event.startStr)}
                    dateClick={(info) => handleSelectDate(info.dateStr)}
                />
            </div>
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
