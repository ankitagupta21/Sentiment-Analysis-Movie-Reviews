from flask import Flask, render_template, request, jsonify as flask_jsonify
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
app = Flask(__name__)
with open('model_and_preprocessing.pkl', 'rb') as f:
    data = pickle.load(f)
    model = data['model']
    features = data['features']
    
columns=['reviewText','rating','genre']

@app.route('/',methods=['GET'])
def Home():
    return render_template('index.html')


@app.route("/", methods=['POST'])
def predict():
    review = request.form['review']
    rating = request.form['rating']
    genre = request.form['genre']
    
    input_data = pd.DataFrame([[review, rating, genre]], columns=columns)
    input_data_scaled = features.transform(input_data)
    prediction = model.predict(input_data_scaled)
    
    if prediction[0] == "NEGATIVE":
        return flask_jsonify({"prediction_neg": "You provided a negative review."})
    else:
        return flask_jsonify({"prediction_pos": "Thanks for providing positive review."})
    
if __name__=="__main__":
    app.run()
