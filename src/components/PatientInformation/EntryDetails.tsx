import { Diagnosis, Entries, EntryTypes } from '../../types';
import HospitalEntryDetails from './EntryTypes/HospitalEntryDetails';
import OccupationalHealthcareDetails from './EntryTypes/OccupationalHealthcareDetails';

interface EntryDetailsProps {
  entry: Entries;
  diagnosesNameList: Diagnosis[];
}

const EntryDetails = ({ entry, diagnosesNameList }: EntryDetailsProps) => {
  switch (entry.type) {
    case EntryTypes.Hospital:
      return <HospitalEntryDetails entry={entry} />;

    case EntryTypes.OccupationalHealthcare:
      return <OccupationalHealthcareDetails entry={entry} />;

    default:
      break;
  }

  return (
    <>
      <p>{/* {entry.date} {entry.description} */}</p>
      {/* {entry.diagnosisCodes.map((code) => {
        return (
          <li key={code}>
            {code}{' '}
            {diagnosesNameList !== undefined
              ? diagnosesNameList.find((elem) => elem.code === code)?.name
              : null}
          </li>
        );
      })} */}
    </>
  );
};

export default EntryDetails;
