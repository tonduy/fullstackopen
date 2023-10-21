import express from 'express';
import cors from 'cors';
import diagnoseRouter from "./routes/diagnoseRouter";
import patientRouter from "./routes/patientRouter";

const app = express();
app.use(express.json());

const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});