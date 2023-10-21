interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    value1: number[];
    value2: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 12) throw new Error('Not enough arguments');
    if (args.length > 12) throw new Error('Too many arguments');

    if (!Array.isArray((args[3])) && !isNaN(Number(args[2]))) {
        const numberArray: number[] = args.slice(3).map(Number);
        return {
            value1: numberArray,
            value2: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not correct!');
    }
};

export const calculateExercises = (exerciseHours: number[], target: number): ExerciseResult => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const average = exerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = average >= target;

    let rating = 1;
    let ratingDescription = 'bad';

    if (success) {
        rating = 3;
        ratingDescription = 'great job!';
    } else if (average >= target - 0.3) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}


