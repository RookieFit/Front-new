// eslint-disable-next-line react/prop-types
const SectionCard = ({ title }) => {
    return (
        <article className="flex-1 h-full bg-mainRed rounded-md p-4 opacity-40">
            <header>
                <h2 className="text-lg text-mainText ml-2">{title}</h2>
            </header>
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
                    <SectionCard title="오늘날씨" />
                    <SectionCard title="식단" />
                </div>
                {/* 아래 박스 */}
                <SectionCard title="캘린더" />
            </div>

            {/* 오른쪽 박스 */}
            <aside className="w-2/5 flex-1 bg-mainRed rounded-md opacity-40 p-4">
                <header>
                    <h2 className="text-lg text-mainText ml-2">이번주 운동량 추세</h2>
                </header>
            </aside>
        </main>
    );
};

export default Main;
