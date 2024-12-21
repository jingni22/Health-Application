import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Popup from './components/Popup.tsx';
import { useState } from "react";
import "./Form.css"

function UserMedicalTest() {

    const navigate = useNavigate();
    const location = useLocation();
    const rows = location.state.slice(1);
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

    const onClickAddMedicalTest = () => {
        axios.get('http://localhost:1337/GetMedicalTest')
            .then(function (response) {
                const rows = response.data.rows
                let state = [{ USERNAME: user }];
                for (let key in rows) {
                    state.push(rows[key])
                }
                navigate("../AddMedicalTests", { state });
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
                            <th>Test Name</th>
                            <th>Test Abvreviation</th>
                            <th>Test Type</th>
                            <th>Test Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: any, ind: any) => (
                            <tr key={ind}>
                                <td>{row.TEST_NAME}</td>
                                <td>{row.TEST_ABV}</td>
                                <td>{row.TEST_TYPE}</td>
                                <td>{row.TEST_DATE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bottom">
                <button onClick={onClickAddMedicalTest}>Add Medical Test</button>
                <button onClick={onClickBack}>Back</button>
            </div>
        </div>
    )

}

export default UserMedicalTest;