import React from 'react';
import "cally";

// eslint-disable-next-line react/prop-types
const SectionCard = ({ title, children }) => {
    return (
        <article className="flex-1 h-full bg-mainRed rounded-md p-4 opacity-40">
            <header>
                <h2 className="text-lg text-mainText ml-2">{title}</h2>
            </header>
            <div className="mt-2">
                {children}
            </div>
        </article>
    );
};

const Main = () => {
    return (
        <main className="flex flex-row gap-5 p-4 flex-1 h-full">
            {/* 왼쪽 컨테이너 */}
            <div className="flex flex-col gap-4 flex-1 h-full">
                {/* 상단 두 개 박스 */}
                <div className="flex flex-row gap-4 flex-1">
                    <div className="flex-[3]">
                        <SectionCard title="오늘날씨" />
                    </div>
                    <div className="flex-[2]">
                        <SectionCard title="식단" />
                    </div>
                </div>
                {/* 아래 캘린더 박스 */}
                <SectionCard title="캘린더">
                    <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box p-3 h-[350px]">
                        <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                        <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                        <calendar-month class="text-xl">
                        </calendar-month>
                    </calendar-date>
                </SectionCard>
            </div>

            {/* 오른쪽 박스 */}
            <aside className="w-4/12 flex-2 bg-mainRed rounded-md opacity-40 p-4">
                <header>
                    <h2 className="text-lg text-mainText ml-2">이번주 운동량 추세</h2>
                </header>
            </aside>
        </main>
    );
};

export default Main;