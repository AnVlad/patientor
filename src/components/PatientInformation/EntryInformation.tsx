import { Diagnosis, Patient } from '../../types';
import EntryDetails from './EntryDetails';

interface EntryInformationProps {
  patient: Patient;
  diagnosesNameList: Diagnosis[];
}

const EntryInformation = ({
  patient,
  diagnosesNameList,
}: EntryInformationProps) => {
  return (
    <>
      <h4>entries</h4>
      <div>
        {patient.entries.map((entry) => {
          return (
            <EntryDetails
              key={entry.id}
              diagnosesNameList={diagnosesNameList}
              entry={entry}
            />
          );
        })}
      </div>
    </>
  );
};

export default EntryInformation;
