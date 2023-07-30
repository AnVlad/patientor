export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EntryTypes {
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface OccupationalHealthcareEntry {
  id: string;
  date: string;
  type: EntryTypes.OccupationalHealthcare;
  specialist: string;
  employerName: string;
  diagnosisCodes: string[];
  description: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry {
  id: string;
  date: string;
  type: EntryTypes.Hospital;
  specialist: string;
  diagnosisCodes: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entries = OccupationalHealthcareEntry | HospitalEntry;

//////////////////

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entries, 'id'>;

//////////////////

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth: string;
  entries: Array<Entries>;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
