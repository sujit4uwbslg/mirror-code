import React, { useEffect, useState } from 'react';
import { db  } from './firebase_m';
import {collection, getDocs, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import '../styles/edit-style.css'; // Import your CSS file
import firebase from 'firebase/compat/app'; // Import your CSS file

const PlacementDataTable = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    HTNo: '',
    'Name of the Student': '',
    Gender: '',
    dob: '',
    officialEmail: '',
    personalEmail: '',
    contactNumber: '',
    aadhar: '',
    pan: '',
    sscCGPA: '',
    sscPerc: '',
    interPerc: '',
    btechCGPA: '',
    btechPerc: '',
    totalBacklogs: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'placement-data'));
      const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(fetchedData);
      console.log(Object.keys(formData));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setFormData({
      HTNo: record.HTNo,
      'Name of the Student': record['Name of the Student'],
      Gender: record.Gender,
      dob: record.DOB,
      officialEmail: record['Official Email ID'],
      personalEmail: record['Personal Email ID'],
      contactNumber: record['Contact Number'],
      aadhar: record.Aadhar,
      pan: record.PAN,
      sscCGPA: record['SSC CGPA'],
      sscPerc: record['SSC Perc'],
      interPerc: record['INTER %'],
      btechCGPA: record['B.Tech CGPA'],
      btechPerc: record['B.Tech Percentage'],
      totalBacklogs: record['Total Backlogs']
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'placement-data', id));
    setData(data.filter(item => item.id !== id));
  };

  /* backup handleSave
  const handleSave = async () => {
    const docRef = doc(db, 'placement-data', selectedRecord.id);
    await updateDoc(docRef, formData);
    setData(data.map(item => (item.id === selectedRecord.id ? { ...item, ...formData } : item)));
    setShowModal(false);
  };*/

  const handleSave = async () => {
    try {
      console.log('Selected Record ID:', selectedRecord.id);
      console.log('Form Data to be updated:', formData);
  
      const docRef = doc(db, 'placement-data', selectedRecord.id);
      await updateDoc(docRef, formData);
  
      console.log('Document successfully updated!');
  
      setData(data.map(item => (item.id === selectedRecord.id ? { ...item, ...formData } : item)));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>HTNo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Official Email ID</th>
            <th>Personal Email ID</th>
            <th>Contact Number</th>
            <th>Aadhar</th>
            <th>PAN</th>
            <th>SSC CGPA</th>
            <th>SSC Percentage</th>
            <th>INTER Percentage</th>
            <th>B.Tech CGPA</th>
            <th>B.Tech Percentage</th>
            <th>Total Backlogs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr key={record.id}>
              <td>{record.HTNo}</td>
              <td>{record['Name of the Student']}</td>
              <td>{record.Gender}</td>
              <td>{record.DOB}</td>
              <td>{record['Official Email ID']}</td>
              <td>{record['Personal Email ID']}</td>
              <td>{record['Contact Number']}</td>
              <td>{record.Aadhar}</td>
              <td>{record.PAN}</td>
              <td>{record['SSC CGPA']}</td>
              <td>{record['SSC Perc']}</td>
              <td>{record['INTER %']}</td>
              <td>{record['B.Tech CGPA']}</td>
              <td>{record['B.Tech Percentage']}</td>
              <td>{record['Total Backlogs']}</td>
              <td>
                <button onClick={() => handleEdit(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h2>Edit Record</h2>
            <label>
              HTNo:
              <input type="text" name="HTNo" value={formData.HTNo} onChange={handleChange} />
            </label>
            <label>
              Name:
              <input type="text" name="'Name of the Student'" value={formData['Name of the Student']} onChange={handleChange} />
            </label>
            <label>
              Gender:
              <input type="text" name="gender" value={formData.Gender} onChange={handleChange} />
            </label>
            <label>
              DOB:
              <input type="text" name="dob" value={formData.dob} onChange={handleChange} />
            </label>
            <label>
              Official Email ID:
              <input type="email" name="officialEmail" value={formData.officialEmail} onChange={handleChange} />
            </label>
            <label>
              Personal Email ID:
              <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} />
            </label>
            <label>
              Contact Number:
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            </label>
            <label>
              Aadhar:
              <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />
            </label>
            <label>
              PAN:
              <input type="text" name="pan" value={formData.pan} onChange={handleChange} />
            </label>
            <label>
              SSC CGPA:
              <input type="text" name="sscCGPA" value={formData.sscCGPA} onChange={handleChange} />
            </label>
            <label>
              SSC Percentage:
              <input type="text" name="sscPerc" value={formData.sscPerc} onChange={handleChange} />
            </label>
            <label>
              INTER Percentage:
              <input type="text" name="interPerc" value={formData.interPerc} onChange={handleChange} />
            </label>
            <label>
              B.Tech CGPA:
              <input type="text" name="btechCGPA" value={formData.btechCGPA} onChange={handleChange} />
            </label>
            <label>
              B.Tech Percentage:
              <input type="text" name="btechPerc" value={formData.btechPerc} onChange={handleChange} />
            </label>
            <label>
              Total Backlogs:
              <input type="text" name="totalBacklogs" value={formData.totalBacklogs} onChange={handleChange} />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementDataTable;
