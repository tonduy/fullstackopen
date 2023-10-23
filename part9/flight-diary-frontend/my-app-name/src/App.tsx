import { useState, useEffect } from "react";
import {DiaryEntry, NewDiaryEntry} from "./types";
import diaryService from "./services/diaryService";
import Diaries from "./components/diaries";
import DiaryForm from "./components/addDiaryForm";
import { v1 as uuid } from "uuid";

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const fetchDiaryList = async () => {
            const diaries = await diaryService.getAll();
            setDiaries(diaries);
        };
        void fetchDiaryList();
    }, []);

    const handleDiaryCreated = (data: NewDiaryEntry) => {
        const uniqueId = uuid();

        const diaryEntry: DiaryEntry = {
            id: uniqueId,
            date: data.date,
            weather: data.weather,
            visibility: data.visibility,
            comment: data.comment,
        };

        setDiaries([...diaries, diaryEntry]);
    };
    return (
        <div>
            <DiaryForm onDiaryCreated={handleDiaryCreated} />
            <Diaries diaries={diaries} />
        </div>
    );
};

export default App;
