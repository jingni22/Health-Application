from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
import os

app = Flask(__name__)

model = joblib.load("chronic_illness_diabetes_predictor.pkl")  
scaler = joblib.load("scaler.pkl")  
label_encoders = joblib.load("label_encoders.pkl")  


@app.route("/predict", methods=["POST"])
def predict():
    input_data = request.json
    print(input_data)
    user_df = pd.DataFrame([input_data])

    for col in label_encoders:
        if col in user_df.columns:
            user_df[col] = label_encoders[col].transform(user_df[col])

    user_df = scaler.transform(user_df)

    prediction = model.predict(user_df)[0]

    return jsonify({"prediction": prediction})



app.run(debug=True, host="0.0.0.0", port=5000)