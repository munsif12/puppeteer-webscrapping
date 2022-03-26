import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Tag, Button } from 'antd';

const columns = [
  {
    title: 'Tag Name',
    dataIndex: 'tag',
    key: 'tag',
    render: text => <p style={{ fontSize: '18px', color: 'blue', margin: '0', padding: '0' }}>{text}</p>,
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    render: text => <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0', padding: '0' }}>{text}</p>,
  },
  {
    title: 'Keyword',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: 'Match',
    key: 'count',
    dataIndex: 'count',
    render: tag => (
      <Tag color={tag > 0 ? 'green' : 'volcano'} key={tag}>
        {tag > 0 ? 'True' : 'False'}
      </Tag>
    ),
  },

  {
    title: 'Found',
    dataIndex: 'tagFound',
    key: 'tagFound',
    render: text => (
      <Tag color={text ? 'green' : 'volcano'} key={text}>
        {text ? 'Tag Found' : 'Tag Not Found'}
      </Tag>
    ),
  },
];

function App() {

  const [Data, setData] = useState([]);
  const [error, setError] = useState('');
  const [Loading, setLoading] = useState(false);
  const [FormDetails, setFormDetails] = useState({
    keyword: '',
    websiteUrl: ''
  });

  function setChange(e) {
    setError('')
    setFormDetails({ ...FormDetails, [e.target.name]: e.target.value })
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true)
      let response = await axios.get(`http://localhost:4000/get-keyword-details?keyword=${FormDetails.keyword}&websiteURL=${FormDetails.websiteUrl}`);
      console.log('-', response)
      if (response.data.success) {
        setData(response.data.data);
        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data.message)
        setLoading(false);
      }
    }
  }
  return (
    <div className="App">
      <h1 style={{ color: 'red' }}>{error}</h1>
      <form>
        <label for="keyword" >Keyword</label>
        <input type="text" id="keyword" placeholder='keyword' name='keyword' value={FormDetails.keyword} onChange={setChange} />
        <label for="websiteUrl" >Website Url</label>
        <input type="text" id="websiteUrl" placeholder='wesite Url' name='websiteUrl' value={FormDetails.websiteUrl} onChange={setChange} />
        {/* <Button onClick={onSubmit} type="primary" loading={Loading}>Send</Button> */}
        <button>Send</button>
      </form>

      {
        Data.length > 0 && <div className="data" style={{ maxWidth: '80%', margin: '25px auto' }}>
          <Table columns={columns} dataSource={Data} pagination={false} />
        </div>
      }

    </div>
  );
}

export default App;
