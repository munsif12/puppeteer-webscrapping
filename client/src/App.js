import React, { useState } from 'react';

import './App.css';
import 'antd/dist/antd.css';
import DataTable from './components/DataTable';
import DataForm from './components/DataForm';



function App() {

  const [Data, setData] = useState([]);

  return (
    <div className="App ">
      <DataForm setData={setData} />
      <DataTable data={Data} />
    </div>
  );
}

export default App;
