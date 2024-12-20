-- Create Database
CREATE DATABASE HEALTH_APPLICATION;

-- The rest of the statements assume that they are executed in the database and schema

-- CREATE TABLE

CREATE OR REPLACE TABLE CHRONIC_ILLNESS (
	ILLNESS_NAME VARCHAR(50) NOT NULL,
	ILLNESS_EASYNAME VARCHAR(30),
	ILLNESS_DESC VARCHAR,
  PRIMARY KEY (ILLNESS_NAME)
);
CREATE OR REPLACE TABLE DRUG (
	DRUG_NAME VARCHAR(50) NOT NULL,
	DOSAGE VARCHAR(20),
	DRUG_DESC VARCHAR,
	SIDE_EFFECT VARCHAR,
	PRIMARY KEY (DRUG_NAME)
);
CREATE OR REPLACE TABLE MEDICAL_TEST (
	TEST_ID VARCHAR(36) NOT NULL DEFAULT UUID_STRING(),
	TEST_NAME VARCHAR(50) NOT NULL,
	TEST_ABV VARCHAR(10),
	TEST_TYPE VARCHAR(50),
	TEST_DESC VARCHAR(16777216),
	UNIQUE (TEST_NAME, TEST_ABV, TEST_TYPE),
	PRIMARY KEY (TEST_ID)
);
CREATE OR REPLACE TABLE RISK_FACTOR (
	FACTOR_ID VARCHAR(36) NOT NULL DEFAULT UUID_STRING(),
	FACTOR_NAME VARCHAR(50) NOT NULL,
	CATEGORY VARCHAR(20),
	PRIMARY KEY (FACTOR_ID)
);
CREATE OR REPLACE TABLE SYMPTOM (
	SYMPTOM_NAME VARCHAR(30) NOT NULL,
	RELIEF_MEASURE VARCHAR(16777216),
	PRIMARY KEY (SYMPTOM_NAME)
);
CREATE OR REPLACE TABLE USER (
	USERNAME VARCHAR(20) NOT NULL,
	BIRTHDATE DATE,
	RACE VARCHAR(50),
	GENDER VARCHAR(1),
	LOCATION VARCHAR(100),
	PRIMARY KEY (USERNAME)
);
CREATE OR REPLACE TABLE USER_DRUG (
	USER_DRUG_ID VARCHAR(36) NOT NULL DEFAULT UUID_STRING(),
	USERNAME VARCHAR(20) NOT NULL,
	DRUG_NAME VARCHAR(50) NOT NULL,
	START_DATE DATE,
	END_DATE DATE,
	AMOUNT NUMBER(2,1),
	FREQUENCY VARCHAR(2),
	PRIMARY KEY (USER_DRUG_ID),
	FOREIGN KEY (USERNAME) REFERENCES HEALTH_APPLICATION.PUBLIC.USER(USERNAME),
	FOREIGN KEY (DRUG_NAME) REFERENCES HEALTH_APPLICATION.PUBLIC.DRUG(DRUG_NAME)
);
CREATE OR REPLACE  TABLE HEALTH_APPLICATION.PUBLIC.USER_MEDICAL_TEST (
	USER_MEDTEST_ID VARCHAR(36) NOT NULL DEFAULT UUID_STRING(),
	TEST_ID VARCHAR(36) NOT NULL,
	USERNAME VARCHAR(20) NOT NULL,
	TEST_DATE DATE,
  PRIMARY KEY (USER_MEDTEST_ID),
	FOREIGN KEY (TEST_ID) REFERENCES HEALTH_APPLICATION.PUBLIC.MEDICAL_TEST(TEST_ID),
  FOREIGN KEY (USERNAME) REFERENCES HEALTH_APPLICATION.PUBLIC.USER(USERNAME)
);
CREATE OR REPLACE  TABLE HEALTH_APPLICATION.PUBLIC.USER_SYMPTOM (
	USER_SYMPTOM_ID VARCHAR(36) NOT NULL DEFAULT UUID_STRING(),
	USERNAME VARCHAR(20) NOT NULL,
	SYMPTOM_NAME VARCHAR(30) NOT NULL,
	START_DATE DATE,
	END_DATE DATE,
  PRIMARY KEY (USER_SYMPTOM_ID),
	FOREIGN KEY (USERNAME) REFERENCES HEALTH_APPLICATION.PUBLIC.USER(USERNAME),
	FOREIGN KEY (SYMPTOM_NAME) REFERENCES HEALTH_APPLICATION.PUBLIC.SYMPTOM(SYMPTOM_NAME)
);

-- INSERT

-- Risk factors
INSERT INTO RISK_FACTOR (FACTOR_NAME, CATEGORY) VALUES
('PHYSICAL INACTIVITY','LIFESTYLE'),
('ALCOHOL CONSUMPTION', 'LIFESTYLE'),
('SUGAR INTAKE', 'LIFESTYLE'),
('HIGH CHOLESTEROL', 'HEREDITARY'),
('INSULIN RESISTANCE', 'HEREDITARY'),
('POOR DIET', 'LIFESTYLE'),
('HIGH BLOOD PRESSURE', 'HEREDITARY'),
('SMOKING', 'LIFESTYLE');

-- Medical tests
INSERT INTO MEDICAL_TEST (Test_name, Test_abv, Test_type, Test_desc) VALUES
('FASTING PLASMA GLUCOSE TEST', 'FPG', 'BLOOD', 'Measures the plasma glucose concentration after an overnight fast to diagnose diabetes or prediabetes.'),
('ORAL GLUCOSE TOLERANCE TEST', 'OGTT', 'BLOOD', 'A test that assesses how the body processes glucose by measuring blood sugar levels after drinking a glucose solution. Used to diagnose diabetes and prediabetes.'),
('GLYCATED HEMOGLOBIN TEST', 'HbA1c', 'BLOOD', 'Measures the percentage of hemoglobin in the blood that is bound to glucose, indicating average blood glucose levels over the past 2-3 months.'),
('RANDOM PLASMA GLUCOSE TEST', 'RPG', 'BLOOD', 'A blood test to measure glucose levels at any time of the day, often used to check for diabetes in symptomatic patients.'),
('C-PEPTIDE TEST', 'N/A', 'BLOOD', 'Measures the amount of C-peptide in the blood, a byproduct of insulin production. It is used to differentiate between Type 1 and Type 2 diabetes.'),
('URINE ALBUMIN-TO-CREATININE RATIO', 'UACR', 'URINE', 'A test that measures the amount of albumin (a protein) in the urine relative to creatinine, used to detect early signs of diabetic nephropathy (kidney disease).'),
('CONTINUOUS GLUCOSE MONITORING', 'CGM', 'MONITORING', 'A method to continuously monitor blood glucose levels throughout the day and night. This is especially useful for patients with Type 1 diabetes.'),
('FRUCTOSAMINE TEST', 'N/A', 'BLOOD', 'A test that measures the average blood glucose levels over the past 2-3 weeks, offering a short-term alternative to HbA1c.'),
('INSULIN ASSAY', 'N/A', 'BLOOD', 'Measures the amount of insulin in the blood, used to evaluate insulin production in patients, particularly in differentiating between Type 1 and Type 2 diabetes.'),
('MICROALBUMINURIA TEST', 'N/A', 'URINE', 'Detects small amounts of albumin in the urine, an early sign of kidney damage in diabetes.'),
('LIPID PROFILE', 'N/A', 'BLOOD', 'A panel of blood tests to measure cholesterol levels, including LDL, HDL, and triglycerides, as diabetes often affects lipid metabolism.'),
('RETINAL SCREENING FOR DIABETIC RETINOPATHY', 'N/A', 'IMAGING', 'A test that uses photography or specialized imaging to check the health of the retina in the eye, looking for signs of diabetic retinopathy, a common complication of diabetes.'),
('A1C-DERIVED AVERAGE GLUCOSE', 'ADAG', 'BLOOD', 'A method used to calculate the average blood glucose levels from the HbA1c result, providing an additional measure for managing diabetes.'),
('THYROID FUNCTION TEST', 'TFT', 'BLOOD', 'A test to evaluate thyroid function, as thyroid disorders can complicate diabetes management.'),
('DIABETIC FOOT EXAMINATION', 'N/A', 'PHYSICAL', 'A thorough physical examination of the feet to check for complications such as neuropathy, ulcers, or infections, common in diabetic patients.');

-- Drug
INSERT INTO drug (drug_name, dosage, drug_desc, side_effect) VALUES 
('Paracetamol', '500mg - 1000mg', 'Pain reliever and fever reducer', 'Nausea, rash, liver issues'),
('Ibuprofen', '200mg - 400mg', 'Anti-inflammatory and pain reliever', 'Nausea, dizziness, stomach pain'),
('Amoxicillin', '500mg - 875mg', 'Antibiotic for bacterial infections', 'Diarrhea, nausea, rash'),
('Cetirizine', '10mg per day', 'Antihistamine for allergies and hay fever', 'Drowsiness, dry mouth'),
('Diphenhydramine', '25mg - 50mg', 'Antihistamine for allergies, sleep aid', 'Drowsiness, dry mouth'),
('Omeprazole', '20mg - 40mg', 'Reduces stomach acid, treats GERD', 'Headache, diarrhea, stomach pain'),
('Metformin', '500mg - 2000mg', 'Lowers blood sugar in people with diabetes', 'Nausea, diarrhea, abdominal pain'),
('Amlodipine', '5mg - 10mg', 'Lowers blood pressure (calcium channel blocker)', 'Swelling, fatigue, dizziness'),
('Atorvastatin', '10mg - 80mg', 'Reduces cholesterol (statin)', 'Muscle pain, headache, nausea'),
('Loratadine', '10mg per day', 'Antihistamine for allergies', 'Dry mouth, headache'),
('Aspirin', '75mg - 325mg', 'Pain reliever, blood thinner', 'Stomach pain, bleeding'),
('Lisinopril', '2.5mg - 40mg', 'Lowers blood pressure (ACE inhibitor)', 'Dizziness, dry cough, headache'),
('Losartan', '25mg - 100mg', 'Lowers blood pressure (ARB)', 'Dizziness, headache, fatigue'),
('Levothyroxine', '25mcg - 200mcg', 'Treats hypothyroidism (thyroid hormone)', 'Weight loss, sweating, anxiety'),
('Simvastatin', '10mg - 80mg', 'Lowers cholesterol (statin)', 'Muscle pain, liver issues'),
('Albuterol', '90mcg (inhaler)', 'Asthma reliever (bronchodilator)', 'Shakiness, fast heartbeat'),
('Insulin (Various)', 'Varies by type', 'Manages blood sugar for diabetes', 'Low blood sugar, sweating'),
('Warfarin', '1mg - 10mg', 'Blood thinner (anticoagulant)', 'Bleeding, bruising'),
('Hydrochlorothiazide', '12.5mg - 50mg', 'Lowers blood pressure (diuretic)', 'Dizziness, dehydration'),
('Gabapentin', '100mg - 800mg', 'Treats nerve pain and seizures', 'Drowsiness, dizziness, fatigue'),
('Metformin', '500mg - 2000mg', 'First-line treatment for type 2 diabetes', 'Nausea, diarrhea, stomach pain'),
('Glipizide', '2.5mg - 40mg', 'Increases insulin production in type 2 diabetes', 'Low blood sugar, dizziness'),
('Glyburide', '1.25mg - 20mg', 'Stimulates insulin secretion in type 2 diabetes', 'Hypoglycemia, weight gain'),
('Glimepiride', '1mg - 8mg', 'Stimulates insulin secretion in type 2 diabetes', 'Low blood sugar, headache'),
('Insulin Aspart', 'Varies', 'Fast-acting insulin (Type 1/2 diabetes)', 'Low blood sugar, weight gain'),
('Insulin Lispro', 'Varies', 'Rapid-acting insulin', 'Low blood sugar, irritation'),
('Insulin Glargine', 'Varies', 'Long-acting insulin for 24-hour blood sugar control', 'Low blood sugar, rash'),
('Dapagliflozin', '5mg - 10mg', 'Reduces glucose reabsorption in kidneys', 'UTIs, low blood sugar'),
('Empagliflozin', '10mg - 25mg', 'SGLT2 inhibitor for Type 2 diabetes', 'UTIs, dehydration, dizziness'),
('Sitagliptin', '25mg - 100mg', 'Inhibits DPP-4 enzyme, increases insulin', 'Upper respiratory infections'),
('Orlistat', '60mg - 120mg', 'Prevents absorption of fats from food', 'Oily stools, flatulence'),
('Phentermine', '15mg - 37.5mg', 'Appetite suppressant (short-term use)', 'Dry mouth, heart palpitations'),
('Liraglutide', '0.6mg - 3.0mg', 'GLP-1 receptor agonist, reduces appetite', 'Nausea, vomiting, diarrhea'),
('Semaglutide', '0.25mg - 2.4mg', 'GLP-1 receptor agonist for chronic weight management', 'Nausea, diarrhea, low blood sugar'),
('Bupropion/Naltrexone', '8mg/90mg', 'Combination drug that reduces hunger', 'Nausea, constipation, headache'),
('Topiramate', '25mg - 200mg', 'Appetite suppressant, also treats epilepsy', 'Dizziness, weight loss'),
('Qsymia', 'Varies', 'Phentermine + topiramate for chronic weight loss', 'Dry mouth, insomnia, headache'),
('Metformin', '500mg - 2000mg', 'Off-label use for weight loss in diabetes', 'Nausea, diarrhea, stomach pain'),
('Lorcaserin (withdrawn)', 'N/A', 'Was used to manage obesity, now discontinued', 'N/A'),
('Contrave (Bupropion/Naltrexone)', '8mg/90mg', 'Combines bupropion and naltrexone', 'Nausea, headache, insomnia');

-- Symptoms
INSERT INTO symptom (symptom_name, relief_measure) VALUES 
('Fever', 'Rest, hydration, and fever reducers (e.g., paracetamol)'),
('Headache', 'Pain relievers, hydration, rest, avoid stress'),
('Nausea', 'Anti-nausea medication, fresh air, ginger, hydration'),
('Vomiting', 'Rest, avoid food for a while, small sips of fluids'),
('Diarrhea', 'Hydration, anti-diarrheal medication, BRAT diet'),
('Muscle Pain', 'Rest, heat/cold therapy, pain relievers (e.g., ibuprofen)'),
('Dizziness', 'Sit or lie down, hydration, avoid sudden movements'),
('Constipation', 'High-fiber diet, hydration, laxatives if necessary'),
('Insomnia', 'Sleep hygiene, relaxation techniques, sleep aids'),
('Chills', 'Warm clothing, blankets, fever treatment'),
('Sweating', 'Remove excess clothing, stay in a cool environment'),
('Runny Nose', 'Antihistamines, nasal sprays, hydration'),
('Sore Throat', 'Warm saltwater gargle, lozenges, throat sprays'),
('Cough', 'Cough syrup, honey, hydration, humidifier'),
('Fatigue', 'Rest, adequate sleep, nutrition, hydration'),
('Excessive Thirst', 'Control blood sugar, stay hydrated with water'),
('Frequent Urination', 'Control blood sugar, avoid excessive fluids'),
('Blurred Vision', 'Control blood sugar, use corrective lenses'),
('Slow Wound Healing', 'Control blood sugar, proper wound care'),
('Numbness in Extremities', 'Control blood sugar, regular foot care'),
('Unexplained Weight Loss', 'Control blood sugar, increase calories'),
('Increased Hunger', 'Control blood sugar, balanced diet'),
('Skin Darkening', 'Control blood sugar, consult a dermatologist'),
('Frequent Infections', 'Control blood sugar, hygiene, see a doctor'),
('Breathlessness', 'Weight loss, breathing exercises, avoid allergens'),
('Joint Pain', 'Weight loss, physical therapy, pain relievers'),
('Low Energy', 'Balanced diet, physical activity, adequate sleep'),
('Excessive Sweating', 'Weight loss, stay in a cool environment'),
('Snoring/Sleep Apnea', 'Weight loss, sleep position changes, CPAP device'),
('Difficulty Moving', 'Weight loss, physical therapy, low-impact exercises'),
('Back Pain', 'Weight loss, physical therapy, pain relievers'),
('Depression', 'Therapy, physical activity, support groups'),
('Anxiety', 'Therapy, relaxation techniques, lifestyle changes');

-- PROCEDURE
CREATE OR REPLACE PROCEDURE HEALTH_APPLICATION.PUBLIC.INSERT_USER("VAL" VARCHAR)
RETURNS BOOLEAN
LANGUAGE JAVASCRIPT
EXECUTE AS OWNER
AS '
    var exists = false;
    var stmt1 = snowflake.createStatement({
        sqlText: "SELECT COUNT(*) AS cnt FROM USER WHERE USERNAME = :1",
        binds: [VAL]});
    var result1 = stmt1.execute();

    if (result1.next()) { exists = result1.getColumnValue(''CNT'') > 0;}
    
    if (exists) { return false;} 
    else {
        var stmt2 = snowflake.createStatement({
            sqlText: "INSERT INTO USER(USERNAME) VALUES (:1)",
            binds: [VAL]});
        var result2 = stmt2.execute();
        return result2.next();
    }
';
