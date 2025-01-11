import React, { useEffect, useState } from 'react';
import {database,db} from './firebase_m';
import { collection, getDocs } from 'firebase/firestore';

const FirestoreData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'student'));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setData(docs);
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
