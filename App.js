import React from 'react';
import PatientForm from './components/PatientForm';
import ImageCapture from './components/ImageCapture';
import ReportsList from './components/ReportsList';
import PatientList from './components/PatientList';
import ImageCroppingTool from './components/ImageCroppingTool';
import DiagnosisReportSubmission from './components/DiagnosisReportSubmission';

function App() {
  return (
    <div className="App">
      <h1>Medical Screening App</h1>
      <PatientForm />
      <ImageCapture />
      <ReportsList />
      <PatientList />
      <ImageCroppingTool />
      <DiagnosisReportSubmission />
    </div>
  );
}

export default App;
