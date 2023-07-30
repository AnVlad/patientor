import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { useEffect, useState } from 'react';
import { Diagnosis, Patient } from '../../types';
import EntryInformation from './EntryInformation';
import AddNewEntry from './AddNewEntry';

const PatientInformation = ({
  diagnosesNameList,
}: {
  diagnosesNameList: Diagnosis[];
}) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id === undefined) {
      console.log('id undefined');
    } else {
      const getPatient = async () => {
        const result = await patients.getById(id);
        setPatient(result);
      };
      getPatient();
    }
  }, [id]);

  if (patient === undefined || id === undefined) return null;

  return (
    <div>
      <h4>{patient.name}</h4>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <AddNewEntry
        diagnosesNameList={diagnosesNameList}
        userId={id}
        setPatient={setPatient}
      />

      {patient.entries === undefined || patient.entries.length < 1 ? null : (
        <EntryInformation
          patient={patient}
          diagnosesNameList={diagnosesNameList}
        />
      )}
    </div>
  );
};

export default PatientInformation;
