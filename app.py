from flask import Flask, request, render_template, jsonify
import numpy as np
import pickle
import os

app = Flask(__name__, template_folder="frontend")

# Load the trained model
model_path = 'decision_tree_model.pkl'
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file '{model_path}' not found.")

with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Feature names
feature_names = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_values = [float(request.form[field]) for field in feature_names]
        input_as_numpy = np.asarray(input_values)
        input_reshaped = input_as_numpy.reshape(1, -1)
        prediction = model.predict(input_reshaped)[0]
        if prediction == 1:
            result = 1
        else:
            result = 0

        return jsonify({'result': result})
    except Exception as e:
        app.logger.error("Error during prediction: %s", e)  # Log the error
        return jsonify({'error': 'Internal Server Error'}), 500
        # return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

