import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Popup from './components/Popup.tsx';
import { useState } from "react";
import "./Form.css"

function AddDrug() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state[0].USERNAME;
    let options = location.state.slice(0);

    const onClickBack = () => {
        axios.post('http://localhost:1337/UserDrug', {
            username: user
        })
            .then(response => {
                if (response.data.rows.length == 0) {
                    const state = [{ USERNAME: user }]
                    navigate("../UserDrug", { state });
                }
                else {
                    const rows = response.data.rows
                    let state = [{ USERNAME: user }];
                    for (let key in rows) {
                        state.push(rows[key])
                    }
                    navigate("../UserDrug", { state });
                }
            })
            .catch(error => {
                console.log(`Error: ${error}`)
            })
    }

    const [drug, setDrug] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [amount, setAmount] = useState("");
    const [freq, setFreq] = useState("");
    const handleDrug = (event: React.ChangeEvent<HTMLSelectElement>) => setDrug(event.target.value);
    const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value);
    const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value);
    const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);
    const handleFrequency = (event: React.ChangeEvent<HTMLInputElement>) => setFreq(event.target.value);
    const [message, setMessage] = useState("");

    const onClickAddDrug = () => {
        if ((!drug) || (!startdate) || (!amount) || (!freq)) {
            setMessage("Invalid form");
        }
        else {
            setMessage("");
            axios.post('http://localhost:1337/AddUserDrug', {
                username: user,
                drug: drug,
                startdate: startdate,
                enddate: (enddate === null) ? "" : enddate,
                amount: amount,
                freq: freq
            })
                .then(response => {
                    axios.post('http://localhost:1337/UserDrug', {
                        username: user
                    })
                        .then(response => {
                            const rows = response.data.rows
                            let state = [{ USERNAME: user }];
                            for (let key in rows) {
                                state.push(rows[key])
                            }
                            navigate("../UserDrug", { state });
                        })
                        .catch(error => {
                            console.log(`Error: ${error}`)
                        })
                })
                .catch(error => {
                    console.log(`Error: ${error}`)
                })
        }

    }

    return (
        <div className="wrapper">
            <div>
                <select id="dropdown" value={drug} onChange={handleDrug}>
                    <option value="" disabled>-- Select an Option --</option>
                    {options.map((option: any, index: any) => (
                        <option key={index} value={option.DRUG_NAME}>
                            {option.DRUG_NAME}
                        </option>
                    ))}
                </select>
                <div>Amount (mg):<input type="text" onChange={handleAmount} value={amount} /></div>
                <div>Frequency (per day):<input type="text" onChange={handleFrequency} value={freq} /></div>
                <div>Start Date:<input type="date" onChange={handleStartDate} /></div>
                <div>End Date:<input type="date" onChange={handleEndDate} /></div>
                <button onClick={onClickAddDrug}>Add</button>
                <button onClick={onClickBack}>Back</button>
            </div>
            <div><span>{message}</span></div>
        </div>
    )

}

export default AddDrug;