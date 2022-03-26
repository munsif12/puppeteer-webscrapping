import React, { useState } from 'react'
import axios from 'axios';
function DataForm({ setData }) {
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
        <div className="formDiv">
            <form>
                {error && <span className='error' >Error : {error}</span>}
                <div className="keyWord" style={{ margin: '25px 0px 0px 0px' }}>
                    <label for="keyword" >Keyword</label>
                    <input disabled={Loading && true} type="text" id="keyword" placeholder='keyword' name='keyword' value={FormDetails.keyword} onChange={setChange} />
                </div>
                <div className="websiteLink" style={{ margin: '25px 0px 0px 0px' }}>
                    <label for="websiteUrl" >Website Url</label>
                    <input disabled={Loading && true} type="text" id="websiteUrl" placeholder='wesite Url' name='websiteUrl' value={FormDetails.websiteUrl} onChange={setChange} />
                </div>
                {/* <Button onClick={onSubmit} type="primary" loading={Loading}>Send</Button> */}
                <button disabled={Loading && true} className={Loading && 'startAimation'} onClick={onSubmit} type="primary" loading={Loading} style={{ margin: '75px 0px 0px 0px' }}>{!Loading ? 'Submit' : 'Loading ...'}</button>
            </form>
        </div>
    )
}

export default DataForm