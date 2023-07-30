import React from 'react';
import { OccupationalHealthcareEntry } from '../../../types';

interface OccupationalHealthcareDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails = ({
  entry,
}: OccupationalHealthcareDetailsProps) => {
  return (
    <>
      <p>
        {entry.date} <i>work</i>
      </p>
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
    </>
  );
};

export default OccupationalHealthcareDetails;
