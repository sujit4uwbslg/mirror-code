import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { db, database } from './firebase_m';
import loadingGif from '../images/loading.gif'; // Make sure to update the path to your loading GIF
import { addDoc,collection,query,where,getDocs } from 'firebase/firestore';
import '../styles/main.css'
import isEqual from 'lodash/isEqual'; // Import the CSS file

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      for (const record of jsonData) {
        try {
          // Ensure fields are defined before querying
          if (record.HTNo !== undefined) {
            // Check for existing document
            const q = query(collection(db, 'placement-data'), where('HTNo', '==', record.HTNo));
            const querySnapshot = await getDocs(q);
            let exists = false;

            querySnapshot.forEach((doc) => {
              if (isEqual(doc.data(), record)) {
                exists = true;
              }
            });

            // Add document if it doesn't exist
            if (!exists) {
              //record.DOB=new Date(record.DOB).toISOString();
              await addDoc(collection(db, 'placement-data'), record);
              console.log('Document successfully written!', record);
            } else {
              console.log('Duplicate document found:', record);
            }
          } else {
            console.log('Record has undefined field values:', record);
          }
        } catch (error) {
          console.error('Error writing document: ', error);
        }
      }

      setLoading(false);
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setLoading(false);
    };

    if (file) {
      reader.readAsBinaryString(file);
    } else {
      console.error('No file selected');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Bulk Data from Excel</h1>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <button onClick={handleUpload} disabled={loading}>Upload</button>

      {loading && (
        <div className="overlay">
          <img src={loadingGif} alt="Uploading..." />
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
