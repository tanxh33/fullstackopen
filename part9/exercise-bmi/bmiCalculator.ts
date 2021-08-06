interface BmiInput {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const inputs = args.slice(2);
  if (inputs.every((value) => !isNaN(Number(value)))) {
    return {
      height: Number(inputs[0]),
      weight: Number(inputs[1]),
    }
  } else {
    throw new Error('Input values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  let result: string;
  if (bmi < 16) {
    result = 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    result = 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    result = 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    result = 'Normal range (healthy)';
  } else if (bmi < 30) {
    result = 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    result = 'Obese (Class I)';
  } else if (bmi < 40) {
    result = 'Obese (Class II)';
  } else {
    result = 'Obese (Class III)';
  }
  return `BMI: ${bmi.toFixed(3)}\n${result}`;
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.error('Error, something bad happened. Error message:', e.message);
}
