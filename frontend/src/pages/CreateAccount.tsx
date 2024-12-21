import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ValidPassword(str: string) {
    const hasNumber = /[0-9]/.test(str);
    const hasLetter = /[a-zA-Z]/.test(str);
    const hasSymbol = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(str);
    return hasNumber && hasLetter && hasSymbol && (str.length >= 5) && (str.length <= 20);
}

function ValidUsername(str: string) {
    const hasSymbol = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(str);
    return !hasSymbol && (str.length >= 5) && (str.length <= 20);
}

function CreateAccount() {
    const style = {
        div: {
            padding: '10px',
            alignItem: 'center'
        },
        span: {
            margin: '10px',
            color: 'red',
            fontWeight: 'normal',
            fontSize: '13px'
        },
        button: {
            alignItems: 'center',
            margin: '10px'
        },
        container: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',

        }
    };
    const [username, setUsername] = useState("");

    const [message, setMesssage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        setMesssage("");
    };

    const navigate = useNavigate();

    const onClickLogin = () => {
        navigate("/");
    }

    const isFormComplete = username;
    const isValidUsername = ValidUsername(username);


    const onClickCreateAccount = () => {

        if (!isValidUsername) {
            setMesssage("Username must be alphanumeric and length 5 to 20.");
        }
        else {
            setMesssage('');
            axios.post('http://localhost:1337/CreateAccount', {
                username: username,
            })
                .then(function (response) {
                    console.log(response.data.rows[0].INSERT_USER);
                    if (response.data.rows[0].INSERT_USER == false) {
                        console.log('Username already exists.');
                        setMesssage('Username already taken');
                    }
                    else {
                        navigate("../Home", { state: { USERNAME: username, RACE: "", GENDER: "", LOCATION: "" } });
                    }
                })
                .catch(function (error) {
                    console.log(`Error: ${error}`);
                });
        }
    }

    return (
        <div style={style.wrapper}>
            <div>
                <h1>Create an Account</h1>
                <div style={style.div}><label>Username: <input name="username" autoComplete="off" onChange={handleChange} /></label> </div>
                <div>{<span style={style.span} onChange={handleChange}>{message}</span>}</div>
                <div><button style={style.button} type="submit" name="createAccount" disabled={!isFormComplete} onClick={onClickCreateAccount}>Create Account</button>
                    <button style={style.button} type="submit" name="login" onClick={onClickLogin}>Login</button></div>
            </div>
        </div >);

}

//<div style={style.div}><label>Password: <input type="password" autoComplete="off" name="passwordOne" onChange={handleInputChange} /></label></div>
//<div style={style.div}><label>Confirm Password: <input autoComplete="off" type="password" name="passwordTwo" onChange={handleInputChange} /></label></div>
//<div><span style={style.span} onChange={handleInputChange} hidden={isPasswordSame}>password is not the same</span>
//{message.showMessage && <span style={style.span}>{message.message}</span>}</div>
export default CreateAccount