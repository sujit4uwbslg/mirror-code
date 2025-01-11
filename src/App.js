import React from "react";
import StudentForm from "./pages/student_page";
import FirestoreData from "./pages/readpage";
import AddData from "./pages/addDataPage";
import BulkUpload from "./pages/uploadBulk";
import PlacementDataTable from "./pages/edit-delte-page";
function App() {
  return (
    <div className="App">
      <h1>Student Data Submission</h1> 
      <PlacementDataTable/>
    </div>
  );
}

export default App;
