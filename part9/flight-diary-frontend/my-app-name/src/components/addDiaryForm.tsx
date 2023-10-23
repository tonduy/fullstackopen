import {NewDiaryEntry, Visibility, Weather} from "../types";
import {useState} from "react";
import diaryService from "../services/diaryService";
import axios from "axios";

const DiaryForm = ({ onDiaryCreated }: { onDiaryCreated: (data: NewDiaryEntry) => void }) => {
    const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);
    const [error, setError] = useState<string | null>(null);

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        diaryService.createDiary(newDiary)
            .then((data) => {
                onDiaryCreated(data);
                setNewDiary({} as NewDiaryEntry);
                setError(null);
            })
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data as string);
                } else {
                    setError("Error appeared during creating new diary");
                }
            });
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={diaryCreation}>
                <div>
                    <p>date</p>
                    <input
                        type="date"
                        min="1999-01-01"
                        max="2030-12-31"
                        value={newDiary.date}
                        onChange={(event) =>
                            setNewDiary({
                                ...newDiary,
                                date: event.target.value,
                            } as NewDiaryEntry)
                        }
                    />
                </div>
                <div>
                    <p>weather</p>
                    {Object.values(Weather).map((value) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="weather"
                                value={value}
                                checked={newDiary.weather === value}
                                onChange={(event) =>
                                    setNewDiary({
                                        ...newDiary,
                                        weather: event.target.value as Weather,
                                    })
                                }
                            />
                            {value}
                        </label>
                    ))}
                </div>
                <div>
                    <p>visibility</p>
                    {Object.values(Visibility).map((value) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="visibility"
                                value={value}
                                checked={newDiary.visibility === value}
                                onChange={(event) =>
                                    setNewDiary({
                                        ...newDiary,
                                        visibility: event.target.value as Visibility,
                                    })
                                }
                            />
                            {value}
                        </label>
                    ))}
                </div>
                <div>
                    <p>comment</p>
                    <input
                        value={newDiary.comment}
                        onChange={(event) =>
                            setNewDiary({
                                ...newDiary,
                                comment: event.target.value,
                            } as NewDiaryEntry)
                        }
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    );
};

export default DiaryForm;