import React, { useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { List, Icon } from "semantic-ui-react";

import { useStateValue, setPatientDetail } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientDetailPage = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        // Get individual patient data.
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        // Set to global state.
        dispatch(setPatientDetail(patientData));
      } catch (e) {
        console.error(e);
      }
    };

    // We only fetch data when the selectedPatient's ID changes.
    if (!selectedPatient || selectedPatient.id !== id) {
      void fetchPatientDetail();
    }
  }, [dispatch]);

  if (!selectedPatient) {
    return null;
  }

  return (
    <List>
      <List.Header as="h2">
        {selectedPatient.name}
        {selectedPatient.gender === "male" ?
          <Icon name="man" /> :
          selectedPatient.gender === "female" ?
          <Icon name="woman" /> :
          null
        }
      </List.Header>

      <List.Item>
        SSN: {selectedPatient.ssn}
      </List.Item>
      <List.Item>
        Occupation: {selectedPatient.occupation}
      </List.Item>

      {/* <List.Header as="h3">
        Entries
      </List.Header> */}
      {/* {selectedPatient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))} */}
    </List>
  );
};

export default PatientDetailPage;
