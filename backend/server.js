const express = require('express');
const connection = require('./db')
const port = 1337;
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/GetUserFields', async (req, res) => {
    const { username } = req.body;
    const sql = `SELECT * FROM USER WHERE USERNAME='${username}'`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });

})


app.post('/CreateAccount', async (req, res) => {
    const { username } = req.body;
    const sql = `CALL INSERT_USER('${username}')`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });

});

app.post('/login', async (req, res) => {

    const { username } = req.body;
    const sql = `SELECT * FROM USER WHERE username = '${username}'`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
});

app.post('/DeleteAccount', async (req, res) => {
    const { username } = req.body;
    const sql = `DELETE FROM USER WHERE username = '${username}'`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
});

app.post('/UpdateProfile', async (req, res) => {
    const { user, bd, race, gen, loc } = req.body;
    const sql = `UPDATE USER SET BIRTHDATE = '${bd}',RACE = '${race}', GENDER = '${gen}', LOCATION = '${loc}' WHERE USERNAME = '${user}'`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
});

app.post('/UserMedicalTest', async (req, res) => {
    const { username } = req.body;
    const sql = `SELECT TEST_NAME, TEST_ABV, TEST_TYPE, TEST_DATE FROM USER_MEDICAL_TEST AS UMT, MEDICAL_TEST AS MT WHERE USERNAME = '${username}' AND MT.TEST_ID = UMT.TEST_ID`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
});

app.get('/GetMedicalTest', async (req, res) => {
    const sql = `SELECT TEST_NAME FROM MEDICAL_TEST`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
})

app.post('/AddUserMedicalTest', async (req, res) => {
    const { username, date, medtest } = req.body;
    const sql = `INSERT INTO USER_MEDICAL_TEST(TEST_ID, USERNAME, TEST_DATE) SELECT TEST_ID, '${username}', '${date}' FROM MEDICAL_TEST WHERE '${medtest}' = TEST_NAME`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.sendStatus(200);
        }
    });
})

app.post('/UserDrug', async (req, res) => {
    const { username } = req.body;
    const sql = `SELECT USERNAME, D.DRUG_NAME, DRUG_DESC, SIDE_EFFECT, AMOUNT, FREQUENCY, START_DATE, END_DATE FROM USER_DRUG AS UD, DRUG AS D WHERE USERNAME = '${username}' AND UD.DRUG_NAME = D.DRUG_NAME`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
})

app.get('/GetDrug', async (req, res) => {
    const sql = `SELECT DRUG_NAME FROM DRUG`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
})

app.post('/AddUserDrug', async (req, res) => {
    const { username, drug, startdate, enddate, amount, freq } = req.body;
    const sql = `INSERT INTO USER_DRUG (USERNAME, DRUG_NAME, START_DATE, END_DATE, AMOUNT, FREQUENCY) VALUES ('${username}', '${drug}', '${startdate}', '${enddate}', '${amount}', '${freq}')`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.sendStatus(200);
        }
    });
})

app.post('/UserSymptom', async (req, res) => {
    const { username } = req.body;
    const sql = `SELECT USERNAME, S.SYMPTOM_NAME, RELIEF_MEASURE, START_DATE, END_DATE FROM SYMPTOM AS S, USER_SYMPTOM AS US WHERE USERNAME = '${username}' AND S.SYMPTOM_NAME = US.SYMPTOM_NAME`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
})

app.get('/GetSymptom', async (req, res) => {
    const sql = `SELECT SYMPTOM_NAME FROM SYMPTOM`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.status(200).json({ rows: rows });
        }
    });
})

app.post('/AddUserSymptom', async (req, res) => {
    const { username, symptom, startdate, enddate } = req.body;
    const sql = `INSERT INTO USER_SYMPTOM (USERNAME, SYMPTOM_NAME, START_DATE, END_DATE) VALUES ('${username}', '${symptom}', '${startdate}', '${enddate}')`;
    connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Error retrieving data');
                return;
            }
            res.sendStatus(200);
        }
    });
})

app.post("/predict", async (req, res) => {
    try {
        // Send user input to the Python API
        console.log(req.body)
        const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
        console.log(response)
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Python model:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => console.log(`server started on port: ${port}`));