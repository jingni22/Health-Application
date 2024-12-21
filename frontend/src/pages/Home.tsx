import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Popup from './components/Popup.tsx';
import { useState } from "react";
import './Home.css';


function Home() {

    const navigate = useNavigate();
    const onClickLogout = () => {
        navigate("../");
    }

    const location = useLocation();
    const user = location.state.USERNAME;

    //// DELETE ACCOUNT ////

    const [popup, setPopup] = useState({
        showPopup: false,
        currUser: user
    });

    const onClickDeleteAccount = () => {
        setPopup({ showPopup: true, currUser: user });
    }

    const onClickYes = () => {
        axios.post('http://localhost:1337/DeleteAccount', {
            username: user
        })
            .then(response => {
                console.log("Frontend: successfully deleted account")
                navigate('../')

            })
            .catch(error => {
                console.log(`Error: ${error}`)
            })
    }


    //// EDIT FIELDS ////

    const [birthdate, setBirthdate] = useState(location.state.BIRTHDATE);
    const [race, setRace] = useState(location.state.RACE);
    const [gender, setGender] = useState(location.state.GENDER);
    const [loc, setLocation] = useState(location.state.LOCATION);

    const handleBirthdate = (event: React.ChangeEvent<HTMLInputElement>) => setBirthdate(event.target.value);
    const handleRace = (event: React.ChangeEvent<HTMLInputElement>) => setRace(event.target.value);
    const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => setGender(event.target.value);
    const handleLocation = (event: React.ChangeEvent<HTMLInputElement>) => setLocation(event.target.value);


    const [isEditEnabled, setIsEditEnabled] = useState(true);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const onClickEdit = () => {
        setIsEditEnabled(false);
        setIsSaveEnabled(true);
    };

    const [message, setMesssage] = useState("");

    const onClickSave = () => {

        axios.post('http://localhost:1337/UpdateProfile', {
            user: user,
            bd: (birthdate === null) ? "" : birthdate,
            race: (race === null) ? "" : race,
            gen: (gender === null) ? "" : gender,
            loc: (loc === null) ? "" : loc
        })
            .then(function (response) {
                setIsEditEnabled(true);
                setIsSaveEnabled(false);
                setMesssage("");
            })
            .catch(function (error) {
                console.log(`Error: ${error}`);
                setMesssage("Invalid Edit Fields")
            });
    };


    const onClickMedicalTest = () => {
        axios.post('http://localhost:1337/UserMedicalTest', {
            username: user
        })
            .then(response => {
                console.log(response)
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

    const onClickDrug = () => {
        axios.post('http://localhost:1337/UserDrug', {
            username: user
        })
            .then(response => {
                console.log(response)
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

    const onClickSymptom = () => {
        axios.post('http://localhost:1337/UserSymptom', {
            username: user
        })
            .then(response => {
                console.log(response)
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

    const [prediction, setPrediction] = useState("");
    const [inputData, setInputData] = useState({
        LocationDesc: loc,
        StratificationID1: (gender == "M") ? "SEXM" : "SEXF",
        StratificationCategoryID1: "SEX",
    });
    const onClickPrediction = async () => {
        try {
            setInputData({
                LocationDesc: loc,
                StratificationID1: (gender == "M") ? "SEXM" : "SEXF",
                StratificationCategoryID1: "SEX"
            })
            const response = await fetch("http://localhost:1337/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputData),
            });
            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    }

    return (
        <div className="wrapper">
            <main>
                <h1>{user}'s profile</h1>
                <div>
                    <button onClick={onClickMedicalTest}>Medical Tests</button>
                    <button onClick={onClickDrug}>Drugs</button>
                    <button onClick={onClickSymptom}>Symptoms</button>
                </div>
                <div>
                    <button onClick={onClickPrediction}>Get Prediction Diabetes</button>
                    <span>{prediction}</span>
                </div>

                <div>Birthdate:
                    <input type="date" disabled={isEditEnabled} onChange={handleBirthdate} value={birthdate} />
                </div>
                <div>Race:
                    <input type="text" disabled={isEditEnabled} onChange={handleRace} value={race} />
                </div>
                <div>Gender:
                    <input type="text" disabled={isEditEnabled} onChange={handleGender} value={gender} />
                </div>
                <div>Location:
                    <input type="text" disabled={isEditEnabled} onChange={handleLocation} value={loc} />
                </div>
                <div><span>{message}</span></div>
                <button onClick={onClickEdit} disabled={!isEditEnabled}>Edit</button>
                <button onClick={onClickSave} disabled={!isSaveEnabled}>Save</button>
                <div style={{ display: 'flex', justifyContent: 'right', padding: '20px' }}>
                    <button onClick={onClickLogout}>Logout</button>
                    <button onClick={onClickDeleteAccount}>Delete Account</button>
                </div>

                <Popup trigger={popup.showPopup} setTrigger={setPopup} onClickYes={onClickYes}><h3 style={{ textAlign: 'center' }}>Are you sure?</h3></Popup>
            </main>
        </div>);
}

export default Home;