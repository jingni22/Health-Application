import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import Home from "./Home";
import axios from 'axios';
import showIcon from '../assets/show.svg';
import hideIcon from '../assets/hide.svg';
import './Login.css'

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        //password: ''
    });

    const [userExist, setUserExist] = useState({
        exist: true,
        message: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setUserExist({ exist: true, message: '' })
    };

    //const isFormComplete = formData.username && formData.password;
    const isFormComplete = formData.username;
    const doesUserExist = userExist.exist;

    const navigate = useNavigate();
    const onClickCreateAccount = () => {
        navigate("./CreateAccount");
    };

    const onClickLogin = () => {
        axios.post('http://localhost:1337/login', {
            username: formData.username,
        })
            .then(function (response) {

                if (response.data.rows.length == 0) {
                    console.log("User does not exist")
                    setUserExist({ exist: false, message: 'User does not exist.' });
                }
                else {
                    setUserExist({ exist: true, message: '' });
                    console.log(response.data.rows[0])
                    const state = response.data.rows[0]
                    state.BIRTHDATE = (state.BIRTHDATE === null) ? "" : state.BIRTHDATE;
                    state.RACE = (state.RACE === null) ? "" : state.RACE;
                    state.GENDER = (state.GENDER === null) ? "" : state.GENDER;
                    state.LOCATION = (state.LOCATION === null) ? "" : state.LOCATION;
                    navigate("./Home", { state });
                }

            })
            .catch(function (error) {
                console.log(`Error: ${error}`);
            });
    }

    const [showPassword, setShowPassword] = useState(false)

    const onClickImage = () => {
        setShowPassword(!showPassword);
    }

    const imgsrc = (showPassword) ? hideIcon : showIcon;
    const inputType = (showPassword) ? "text" : "password";

    return (
        <div className="wrapper">
            <div>
                <h1>Welcome!</h1>
                <div className="divItems"><label> Username: </label><input type="text" name="username" onChange={handleInputChange} /></div>
                <div><span>{userExist.message}</span></div>
                <div className="divItems"><button type="button" name="login" disabled={!isFormComplete} onClick={onClickLogin}>Login</button>
                    <button type="button" name="createAccount" onClick={onClickCreateAccount}>Create Account</button></div>
            </div>
        </div >);
}
//<div className="divItems"><label> Password: </label><input type={inputType} autoComplete="off" name="password" onChange={handleInputChange} ></input>
//<img onClick={onClickImage} src={imgsrc} ></img></div>
export default Login
