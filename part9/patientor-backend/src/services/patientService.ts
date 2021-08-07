import patients from "../../data/patients";
import { Patient, PublicPatient } from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const getPublicEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation })
  );
};

export default {
  getEntries,
  getPublicEntries
};
