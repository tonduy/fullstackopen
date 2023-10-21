interface BmiValues {
    value1: number;
    value2: number;
}

interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): BmiResult => {
    const bmi = (weight / ((height / 100)^2));

    let bmiText = "";

    if (bmi < 16.0) {
        bmiText = "Underweight (Severe thinness)";
    }
    else if (bmi < 17) {
        bmiText = "Underweight (Moderate thinness)";
    }
    else if (bmi < 18.5) {
        bmiText = "Underweight (Mild thinness)";
    }
    else if (bmi < 25) {
        bmiText = "Normal (healthy weight)";
    }
    else if (bmi < 30) {
        bmiText = "Overweight (Pre-obese)";
    }
    else if (bmi < 35) {
        bmiText = "Obese (Class I)";
    }
    else if (bmi < 40) {
        bmiText = "Obese (Class II)";
    }
    else if (bmi > 40) {
        bmiText = "Obese (Class III)";
    }

    return {
        weight,
        height,
        bmi: bmiText,
    };

};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
