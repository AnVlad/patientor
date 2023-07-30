import axios from 'axios';
import { Entries, EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getById = async (userId: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${userId}`);
  // if (data === undefined) throw Error('doesn`t exist');
  return data;
};

const postEntry = async (userId: string, entryData: EntryWithoutId) => {
  const { data } = await axios.post<Entries>(
    `${apiBaseUrl}/patients/${userId}/entries`,
    entryData
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getById,
  postEntry,
};
