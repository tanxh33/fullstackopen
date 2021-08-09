import { NewDiaryEntry, Weather, Visibility } from "./types";

// Realise that TypeScript cannot validate external data in runtime.
// Here we use JavaScript-level validation to ensure the input is what we expect.

// Unknown type does not allow any operations, so we destructure the object fields.
type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };

// 'unknown' (introduced in TS v3) is a type-safe counterpart to 'any'
// No operations are permitted on 'unknown' without first asserting or narrowing the type.
const toNewDiaryEntry = ({ comment, date, weather, visibility }: Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(comment),
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility),
  };
  return newEntry;
};

// String validation function (works as a type guard)
// Returns a boolean and which has a type predicate as the return type.
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;  // Both conditions just in case.
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
  return comment;  // If the type guard returned true, comment is 'string'.
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error(`Incorrect or missing weather: ${weather}`);
  }
  return weather;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error(`Incorrect or missing visibility: ${visibility}`);
  }
  return visibility;
};

export default toNewDiaryEntry;
