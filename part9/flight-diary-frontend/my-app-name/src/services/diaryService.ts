import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const apiBaseUrl = 'http://localhost:3000/api'

export const getAll = async ()=> {
    const { data } = await axios.get<DiaryEntry[]>(
        `${apiBaseUrl}/diaries`
    );

    return data;
};


const createDiary = async (object: NewDiaryEntry) => {
    const { data } = await axios.post<DiaryEntry>(
        `${apiBaseUrl}/diaries`,
        object
    );

    return data;
};

export default {
    getAll, createDiary
};

