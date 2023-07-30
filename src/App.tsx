import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis, Patient } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientInformation from './components/PatientInformation/PatientInformation';
import diagnosesService from './services/diagnoses';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosesNameList, setDiagnosesNameList] = useState<Diagnosis[]>([]);

  useEffect(() => {
    // void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnosesNameList(diagnoses);
    };

    fetchDiagnosesList();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path='/'
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path='/:id'
              element={
                <PatientInformation diagnosesNameList={diagnosesNameList} />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
