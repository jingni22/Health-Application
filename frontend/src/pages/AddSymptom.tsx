import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Popup from './components/Popup.tsx';
import { useState } from "react";
import "./Form.css"

function AddSymptom() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state[0].USERNAME;
    let options = location.state.slice(0);

    const onClickBack = () => {
        axios.post('http://localhost:1337/UserSymptom', {
            username: user
        })
            .then(response => {
                if (response.data.rows.length == 0) {
                    const state = [{ USERNAME: user }]
                    navigate("../UserSymptom", { state });
                }
                else {
                    const rows = response.data.rows
                    let state = [{ USERNAME: user }];
                    for (let key in rows) {
                        state.push(rows[key])
                    }
                    navigate("../UserSymptom", { state });
                }
            })
            .catch(error => {
                console.log(`Error: ${error}`)
            })
    }

    const [symptom, setSymptom] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const handleSymptom = (event: React.ChangeEvent<HTMLSelectElement>) => setSymptom(event.target.value);
    const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value);
    const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value);
    const [message, setMessage] = useState("");

    const onClickAddMedicalTest = () => {
        if ((!symptom) || (!startdate)) {
            setMessage("Invalid form");
        }
        else {
            setMessage("");
            axios.post('http://localhost:1337/AddUserSymptom', {
                username: user,
                symptom: symptom,
                startdate: startdate,
                enddate: (enddate === null) ? "" : enddate,
            })
                .then(response => {
                    axios.post('http://localhost:1337/UserSymptom', {
                        username: user
                    })
                        .then(response => {
                            const rows = response.data.rows
                            let state = [{ USERNAME: user }];
                            for (let key in rows) {
                                state.push(rows[key])
                            }
                            navigate("../UserSymptom", { state });
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
                <select id="dropdown" value={symptom} onChange={handleSymptom}>
                    <option value="" disabled>-- Select an Option --</option>
                    {options.map((option: any, index: any) => (
                        <option key={index} value={option.SYMPTOM_NAME}>
                            {option.SYMPTOM_NAME}
                        </option>
                    ))}
                </select>
                <div>Start Date:<input type="date" onChange={handleStartDate} /></div>
                <div>End Date:<input type="date" onChange={handleEndDate} /></div>
                <button onClick={onClickAddMedicalTest}>Add</button>
                <button onClick={onClickBack}>Back</button>
            </div>
            <div><span>{message}</span></div>
        </div>
    )

}

export default AddSymptom;