import React, { useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const CalendarSection = ({ callyRef }) => {
    const [today, setToday] = useState('');

    // 컴포넌트 마운트 시 오늘 날짜 계산
    useEffect(() => {
        const currentDate = new Date();
        setToday(format(currentDate, 'yyyy-MM-dd'));
    }, []);

    return (
        <SectionCard title="캘린더">
            <div className="flex justify-center overflow-x-auto">
                <calendar-date
                    ref={callyRef}
                    class="cally bg-white text-black border border-gray-200 shadow-lg rounded-box p-3 block"
                    style={{
                        minWidth: '300px',
                        maxWidth: '600px',
                        width: '100%',
                        height: '360px',
                        boxShadow: 'none'
                    }}
                    value={today} // 오늘 날짜 설정
                    min="2025-01-01"
                    max="2025-12-31"
                    locale="ko"
                >
                    <svg
                        aria-label="Previous"
                        className="fill-current size-4"
                        slot="previous"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <svg
                        aria-label="Next"
                        className="fill-current size-4"
                        slot="next"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <calendar-month
                        class="text-xl"
                        style={{
                            width: '100%',
                            height: '280px', // 내부 월 표시 영역 높이 고정
                            display: 'grid',
                            gridTemplateRows: 'auto repeat(6, 1fr)', // 요일 헤더 + 최대 6주 표시 (고정 높이)
                            boxShadow: 'none'
                        }}
                    >
                    </calendar-month>
                </calendar-date>
            </div>
            <style>
                {`
                /* 캘린더 내부 스타일 커스터마이징 */
                calendar-date {
                    --cally-cell-size: 38px;
                    --cally-text: #000000;
                    --cally-background: #ffffff;
                    --cally-cell-today-background: rgba(209, 77, 66, 0.1);
                    --cally-cell-today-border: #d14d42;
                }
                
                /* 캘린더 날짜가 6주보다 적을 때도 높이 유지 */
                calendar-month::part(body) {
                    display: grid;
                    grid-template-rows: repeat(6, 1fr);
                }
                `}
            </style>
        </SectionCard>
    );
};

CalendarSection.propTypes = {
    callyRef: PropTypes.object.isRequired,
};

export default CalendarSection;