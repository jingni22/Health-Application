import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Popup from './components/Popup.tsx';
import { useState } from "react";
import "./Form.css"

function AddMedicalTests() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state[0].USERNAME;
    let options = location.state.slice(0);

    const onClickBack = () => {
        axios.post('http://localhost:1337/UserMedicalTest', {
            username: user
        })
            .then(response => {
                if (response.data.rows.length == 0) {
                    const state = [{ USERNAME: user }]
                    navigate("../UserMedicalTest", { state });
                }
                else {
                    const rows = response.data.rows
                    let state = [{ USERNAME: user }];
                    for (let key in rows) {
                        state.push(rows[key])
                    }
                    navigate("../UserMedicalTest", { state });
                }
            })
            .catch(error => {
                console.log(`Error: ${error}`)
            })
    }

    const [medtest, setMedicalTest] = useState("");
    const [date, setDate] = useState("");
    const handleMedtest = (event: React.ChangeEvent<HTMLSelectElement>) => setMedicalTest(event.target.value);
    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value);
    const [message, setMessage] = useState("");

    const onClickAddMedicalTest = () => {
        if ((!medtest) || (!date)) {
            setMessage("Invalid form");
        }
        else {
            setMessage("");
            axios.post('http://localhost:1337/AddUserMedicalTest', {
                username: user,
                date: date,
                medtest: medtest
            })
                .then(response => {
                    axios.post('http://localhost:1337/UserMedicalTest', {
                        username: user
                    })
                        .then(response => {
                            const rows = response.data.rows
                            let state = [{ USERNAME: user }];
                            for (let key in rows) {
                                state.push(rows[key])
                            }
                            navigate("../UserMedicalTest", { state });
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
                <select id="dropdown" value={medtest} onChange={handleMedtest}>
                    <option value="" disabled>-- Select an Option --</option>
                    {options.map((option: any, index: any) => (
                        <option key={index} value={option.TEST_NAME}>
                            {option.TEST_NAME}
                        </option>
                    ))}
                </select>
                <input type="date" onChange={handleDate} />
                <button onClick={onClickAddMedicalTest}>Add</button>
                <button onClick={onClickBack}>Back</button>
            </div>
            <div><span>{message}</span></div>
        </div>
    )

}

export default AddMedicalTests;