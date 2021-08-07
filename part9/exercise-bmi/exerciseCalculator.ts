type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  averageTime: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

interface ExerciseInput {
  target: number;
  exercisePeriod: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const inputs: Array<number> = args.slice(2).map((arg) => Number(arg));

  if (inputs.every((value) => !isNaN(value))) {
    const [target, ...exercisePeriod] = inputs;
    return { target, exercisePeriod };
  } else {
    throw new Error('Input values must be numbers!');
  }
};

export const calculateExercises = (exercisePeriod: Array<number>, target: number): Result => {
  const averageTime = exercisePeriod.reduce((acc, curr) => acc + curr) / exercisePeriod.length;
  const timeDiff = averageTime - target;

  let rating: Rating, ratingDescription: string;

  if (timeDiff <= 0) {
    rating = 1;
    ratingDescription = 'Buck up buddy';
  } else if (timeDiff < 1) {
    rating = 2;
    ratingDescription = 'Not too bad, we\'ve hit the target!';
  } else {
    rating = 3;
    ratingDescription = 'Exceeds expectations!';
  }

  return {
    periodLength: exercisePeriod.length,
    trainingDays: exercisePeriod.filter((hour) => hour !== 0).length,
    target,
    averageTime,
    success: averageTime >= target,
    rating,
    ratingDescription,
  };
};

// Sample hardcoded input:
// const exHours = [3, 0, 2, 4.5, 0, 3, 1];
// const target = 2;

try {
  const { target, exercisePeriod } = parseExerciseArguments(process.argv);
  const result = calculateExercises(exercisePeriod, target);
  console.log(result);
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error('Error, something bad happened. Error message:', e.message);
  }
}
