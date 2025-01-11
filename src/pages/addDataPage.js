import React, { useState } from 'react';
import { db, database } from './firebase_m';
import { addDoc,collection } from 'firebase/firestore';
const AddData = () => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'new_sample'), {
        name: name,
        email: roll
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Roll</label>
        <input type="number" value={roll} onChange={(e) => setRoll(e.target.value)} />
      </div>
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddData;
