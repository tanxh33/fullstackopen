import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

// Import from diaries.json and do a type assertion.
// Note that doing this means we are not really using
// TypeScript's power but relying on the coder.
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

// Use the Pick utility type to choose which fields of an existing type we want to use.
// Can be used for function during runtime, or construct a new type.
// Omit utility type can declare which field to exclude.
// Even better, we can declare a new type instead.
const getNonSensitiveEntries =
  // (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
  // (): Omit<DiaryEntry, 'comment'>[] => {
  (): NonSensitiveDiaryEntry[] => {
    // Note that TypeScript only checks for required fields but does not
    // prohibit excess fields. We need to exclude the 'comment' field ourselves.
    return diaries.map(({ id, date, weather, visibility }) =>
      ({ id, date, weather, visibility })
    );
  };

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((d) => d.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};
