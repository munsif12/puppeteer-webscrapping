import React from 'react'
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

function DataTable({ data }) {
    return (
        <div className="data" style={{ width: 'calc(100% - 25px)' }}>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}

export default DataTable