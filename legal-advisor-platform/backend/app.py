from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure Google Gemini API
def configure_gemini(api_key):
    genai.configure(api_key=api_key)

# Replace with your Gemini API key
configure_gemini(api_key="AIzaSyA3UJ24-RZ_xAGpC3xsZSr7aEcq8kg4AIU")

# Load data
def load_data():
    lawyers = pd.read_excel('backend/data/lawyers_data.xlsx')
    cases = pd.read_csv('backend/data/database.csv')
    return lawyers, cases

lawyers, cases = load_data()

# Search for lawyers
def search_lawyers(case_type):
    return lawyers[lawyers['Specialization'].str.contains(case_type, case=False, na=False)]

# Match similar cases
def match_cases(case_facts):
    import re
    escaped_facts = re.escape(case_facts)
    return cases[cases['case_name'].str.contains(escaped_facts, case=False, na=False)]

# Generate AI recommendations
def recommend_steps_with_gemini(case_description):
    try:
        model = genai.GenerativeModel("gemini-1.0-pro")
        response = model.generate_content(f"Provide recommendations for the following legal case: {case_description}")
        return response.text
    except Exception as e:
        return "The system is processing your request. Please try again later."

@app.route("/api/case-assistance", methods=["POST"])
def case_assistance():
    data = request.json
    case_type = data.get("case_type")
    case_facts = data.get("case_facts")

    lawyers_result = search_lawyers(case_type)
    cases_result = match_cases(case_facts)
    ai_recommendations = recommend_steps_with_gemini(case_facts)

    return jsonify({
        "lawyers": lawyers_result.to_dict(orient="records"),
        "cases": cases_result.to_dict(orient="records"),
        "recommendations": ai_recommendations
    })

if __name__ == "__main__":
    app.run(debug=True)

