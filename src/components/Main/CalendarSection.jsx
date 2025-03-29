import React from 'react';
import SectionCard from './SectionCard';
import PropTypes from 'prop-types';

const CalendarSection = ({ callyRef }) => {
    return (
        <SectionCard title="캘린더">
            <div className="flex justify-center overflow-x-auto">
                <calendar-date
                    ref={callyRef}
                    class="cally bg-base-100 border border-base-300 shadow-lg rounded-box p-3 block"
                    style={{ minWidth: '300px', maxWidth: '600px', width: '100%' }}
                    value="2025-03-02"
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
                    <calendar-month class="text-xl" style={{ width: '100%' }}>
                    </calendar-month>
                </calendar-date>
            </div>
        </SectionCard>
    );
};

CalendarSection.propTypes = {
    callyRef: PropTypes.object.isRequired,
};

export default CalendarSection;