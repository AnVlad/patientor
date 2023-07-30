import React, { useState } from 'react';
import { Diagnosis, EntryTypes, EntryWithoutId, Patient } from '../../types';
import patients from '../../services/patients';
import { AxiosError } from 'axios';
import useField from '../../hooks/useField';

interface AddNewEntryProps {
  diagnosesNameList: Diagnosis[];
  userId: string;
  setPatient?: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddNewEntry = ({ diagnosesNameList, userId }: AddNewEntryProps) => {
  const [diagnosisCodesArray, setDiagnosisCodesArray] = useState<string[]>([]);

  console.log(diagnosisCodesArray);

  const description = useField('description');
  const startDate = useField('startDate');
  const endDate = useField('endDate');
  const specialist = useField('specialist');
  const employerName = useField('employerName');
  const criteria = useField('criteria');

  const [type, setType] = useState<EntryTypes>(EntryTypes.Hospital);

  const [errorMessage, setErrorMessage] = useState('');

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const currentDate = getCurrentDate();

  console.log(endDate);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (type === EntryTypes.Hospital) {
        const entryData: EntryWithoutId = {
          type: EntryTypes.Hospital,
          date: currentDate,
          description: description.value,
          specialist: specialist.value,
          diagnosisCodes: diagnosisCodesArray,
          discharge: {
            date: endDate.value,
            criteria: criteria.value,
          },
        };
        const updatedPatient = await patients.postEntry(userId, entryData);
        console.log(updatedPatient);

        return;
      }

      if (type === EntryTypes.OccupationalHealthcare) {
        const entryData: EntryWithoutId = {
          type: EntryTypes.OccupationalHealthcare,
          date: currentDate,
          description: description.value,
          specialist: specialist.value,
          employerName: employerName.value,
          diagnosisCodes: diagnosisCodesArray,
          sickLeave: {
            startDate: startDate.value,
            endDate: endDate.value,
          },
        };
        const updatedPatient = await patients.postEntry(userId, entryData);
        console.log(updatedPatient);
        return;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const value = event.target.value as EntryTypes;

    setType(value);
  };

  const handleSelectCodes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);

    const value = event.target.value;

    setDiagnosisCodesArray([...diagnosisCodesArray, value]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New HealthCheck entry</h1>

      {errorMessage.length > 3 && (
        <h2>
          <i>{errorMessage}</i>
        </h2>
      )}

      <div>
        <select value={type} onChange={handleSelectChange}>
          <option value={EntryTypes.Hospital}>Hospital</option>
          <option value={EntryTypes.OccupationalHealthcare}>
            Occupational Healthcare
          </option>
        </select>
      </div>

      <div>
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' {...description} />
      </div>

      <div>
        <label htmlFor='specialist'>Specialist</label>
        <input type='text' id='specialist' {...specialist} />
      </div>
      <div>
        <label htmlFor='diagnosisCodes'>Diagnosis Codes</label>
        <select onChange={handleSelectCodes}>
          {diagnosesNameList.map((code, index) => {
            return (
              <option value={code.code} key={index}>
                {code.code} {code.name}{' '}
              </option>
            );
          })}
        </select>

        <span> [{diagnosisCodesArray.map((elem) => `${elem}, `)}] </span>
        <button type='button' onClick={() => setDiagnosisCodesArray([])}>
          clear
        </button>
      </div>

      {type === EntryTypes.OccupationalHealthcare && (
        <div>
          <label htmlFor='employerName'>Employer Name</label>
          <input type='text' id='employerName' {...employerName} />
        </div>
      )}

      {type === EntryTypes.OccupationalHealthcare && (
        <div>
          <label htmlFor='startDate'>
            Start date of sick leave (YYYY-MM-DD)
          </label>
          <input type='date' id='startDate' {...startDate} />
        </div>
      )}

      <div>
        <label htmlFor='endDate'>End date (YYYY-MM-DD)</label>
        <input type='date' id='endDate' {...endDate} />
      </div>

      {type === EntryTypes.Hospital && (
        <div>
          <label htmlFor='criteria'>Criteria</label>
          <input type='text' id='criteria' {...criteria} />
        </div>
      )}

      <button type='submit'>submit</button>
    </form>
  );
};

export default AddNewEntry;
