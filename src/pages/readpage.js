import React, { useEffect, useState } from 'react';
import {database,db} from './firebase_m';
import { collection, getDocs } from 'firebase/firestore';

const FirestoreData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
            const colRef=collection(db, 'sample');
            console.log("Collection Reference: ", colRef);
            const querySnapshot = await getDocs(colRef);
            if (!querySnapshot.empty) {
                 const docs = querySnapshot.docs.map(doc => doc.data()); 
                 console.log("Fetched Docs Data: ", docs); 
                 setData(docs); 
                } else { 
                    console.log("No documents found."); 
                }
            
        }catch(error){
            console.error("Error fetching data: ", error);
        }
        
     
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Firestore</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreData;
