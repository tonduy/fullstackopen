import {DiaryEntry} from "../types";

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {diaries.map((diary) => (
                <div key={diary.id}>
                    <div>
                        <h3>
                            {diary.date}
                        </h3>
                    </div>
                    <div>
                        <p>visibility: {diary.visibility}</p>
                        <p>weather: {diary.weather}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};



export default Diaries;
