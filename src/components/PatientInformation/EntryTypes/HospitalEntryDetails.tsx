import { HospitalEntry } from '../../../types';

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalEntryDetailsProps) => {
  return (
    <>
      <p>{entry.date}</p>
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
    </>
  );
};

export default HospitalEntryDetails;
