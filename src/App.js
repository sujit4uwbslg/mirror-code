import React from "react";
import StudentForm from "./pages/student_page";
import FirestoreData from "./pages/readpage";
function App() {
  return (
    <div className="App">
      <h1>Student Data Submission</h1> 
      <FirestoreData/>
    </div>
  );
}

export default App;
