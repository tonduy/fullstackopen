import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import {calculateExercises} from "./exerciseCalculator";


const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }

    const result = calculateBmi(height, weight);
    res.json(result);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || !daily_exercises.every(value => !isNaN(Number(value)))) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }

    const dailyExercisesArray = daily_exercises.map(Number);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyExercisesArray, Number(target));
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});