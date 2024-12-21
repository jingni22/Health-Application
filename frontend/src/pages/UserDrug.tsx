import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Popup from './components/Popup.tsx';
import { useState } from "react";
import "./Form.css"

function UserDrug() {

    const navigate = useNavigate();
    const location = useLocation();
    const rows = location.state;
    const user = location.state[0].USERNAME

    const onClickBack = () => {
        axios.post('http://localhost:1337/GetUserFields', {
            username: user,
        })
            .then(function (response) {
                console.log(response.data.rows[0])
                const state = response.data.rows[0]
                state.BIRTHDATE = (state.BIRTHDATE === null) ? "" : state.BIRTHDATE;
                state.RACE = (state.RACE === null) ? "" : state.RACE;
                state.GENDER = (state.GENDER === null) ? "" : state.GENDER;
                state.LOCATION = (state.LOCATION === null) ? "" : state.LOCATION;
                navigate("../Home", { state });
            })
            .catch(function (error) {
                console.log(`Error: ${error}`);
            });
    }

    const onClickAddDrug = () => {
        axios.get('http://localhost:1337/GetDrug')
            .then(function (response) {
                const rows = response.data.rows
                let state = [{ USERNAME: user }];
                for (let key in rows) {
                    state.push(rows[key])
                }
                navigate("../AddDrug", { state });
            })
            .catch(function (error) {
                console.log(`Error: ${error}`);
            });
    }


    return (
        <div className="wrapper">
            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Drug Name</th>
                            <th>Drug Description</th>
                            <th>Drug Side Effect</th>
                            <th>Amount mg</th>
                            <th>Frequency /day</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: any, ind: any) => (
                            <tr key={ind}>
                                <td>{row.DRUG_NAME}</td>
                                <td>{row.DRUG_DESC}</td>
                                <td>{row.SIDE_EFFECT}</td>
                                <td>{row.AMOUNT}</td>
                                <td>{row.FREQUENCY}</td>
                                <td>{row.START_DATE}</td>
                                <td>{row.END_DATE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bottom">
                <button onClick={onClickAddDrug}>Add Drug</button>
                <button onClick={onClickBack}>Back</button>
            </div>
        </div>
    )

}

export default UserDrug;