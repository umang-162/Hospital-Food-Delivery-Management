import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Modal from "../components/Modal";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Fetch patients from the backend
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Add or Edit Patient
  const handleSave = async (patient) => {
    try {
      if (patient._id) {
        await axios.put(
          `http://localhost:5000/api/patients/${patient._id}`,
          patient
        );
      } else {
        await axios.post("http://localhost:5000/api/patients", patient);
      }
      fetchPatients();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  // Delete Patient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Open Modal for Add/Edit
  const openModal = (patient = null) => {
    setCurrentPatient(
      patient || { name: "", age: "", gender: "", roomNumber: "", diseases: [] }
    );
    setShowModal(true);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Patient
        </button>
      </div>

      <Table
        headers={["Name", "Age", "Gender", "RoomNumber"]}
        data={patients}
        actions={[
          { label: "Edit", type: "edit", onClick: openModal },
          {
            label: "Delete",
            type: "delete",
            onClick: (patient) => handleDelete(patient._id),
          },
        ]}
      />

      <Modal
        isOpen={showModal}
        title={currentPatient?._id ? "Edit Patient" : "Add Patient"}
        onClose={() => setShowModal(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(currentPatient);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold">Name</label>
            <input
              type="text"
              value={currentPatient?.name || ""}
              onChange={(e) =>
                setCurrentPatient({ ...currentPatient, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Age</label>
            <input
              type="number"
              value={currentPatient?.age || ""}
              onChange={(e) =>
                setCurrentPatient({ ...currentPatient, age: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </Modal>
    </Layout>
  );
};

export default PatientManagement;
