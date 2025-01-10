// src/components/StudentForm.js
import React, { useState } from 'react';
import database from './firebase_m';
import { ref,push } from 'firebase/database';
const StudentForm = () => {
  const [student, setStudent] = useState({ name: '', age: '', grade: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentRef = ref(database, 'students'); 
    push(studentRef, student);
    setStudent({ name: '', age: '', grade: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={student.name} onChange={handleChange} required />
      </label>
      <label>
        Age:
        <input type="text" name="age" value={student.age} onChange={handleChange} required />
      </label>
      <label>
        Grade:
        <input type="text" name="grade" value={student.grade} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
