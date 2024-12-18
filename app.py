from flask import Flask, render_template_string, request
import pandas as pd
import google.generativeai as genai

app = Flask(__name__)

# Configure Google Gemini API
def configure_gemini(api_key):
    genai.configure(api_key=api_key)

# Replace with your Gemini API key
configure_gemini(api_key="AIzaSyA3UJ24-RZ_xAGpC3xsZSr7aEcq8kg4AIU")

# Load data
def load_data():
    lawyers = pd.read_excel('C:\\Users\\H-P\\Desktop\\New folder (3)\\lawyers_data.xlsx')

    cases = pd.read_csv('C:\\Users\\H-P\\Desktop\\New folder (3)\\database.csv')
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

# Frontend templates using render_template_string
landing_page_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Case Assistance System</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #fff;
            text-align: center;
        }
        .landing {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: black;
            animation: fadeIn 2s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .app-title { font-size: 3rem; color: #f5f5f5; }
        .description { font-size: 1.2rem; color: #aaa; margin-bottom: 2rem; }
        form {
            display: inline-block;
            text-align: left;
            background: #333;
            padding: 1.5rem;
            border-radius: 8px;
        }
        label, textarea, select { display: block; margin: 1rem 0; width: 100%; }
        button {
            background: #008080; color: #fff; border: none;
            padding: 10px 20px; cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="landing">
        <h1 class="app-title">Case Assistance System</h1>
        <p class="description">Get lawyer recommendations, similar cases, and AI-powered solutions</p>
        <form method="POST" action="/">
            <label for="case_type">Select Case Type:</label>
            <select name="case_type" id="case_type" required>
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
                <option value="family">Family</option>
                <option value="property">Property</option>
            </select>
            <label for="case_facts">Describe Your Case:</label>
            <textarea name="case_facts" id="case_facts" rows="4" required></textarea>
            <button type="submit">Submit</button>
        </form>
    </div>
</body>
</html>
"""

results_page_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; background-color: #121212; color: #fff; text-align: center; }
        table { margin: 2rem auto; border-collapse: collapse; width: 80%; }
        th, td { border: 1px solid #fff; padding: 10px; text-align: center; }
        h1, h2 { margin: 1rem 0; }
        .ai-box { background: #333; padding: 1rem; border-radius: 8px; display: inline-block; margin-top: 1rem; }
    </style>
</head>
<body>
    <h1>Results</h1>
    
    <!-- Lawyer Results -->
    {% if lawyers %}
    <h2>Matching Lawyers</h2>
    <table>
        <tr><th>Name</th><th>Specialization</th><th>Phone</th><th>Email</th></tr>
        {% for lawyer in lawyers %}
        <tr>
            <td>{{ lawyer['Lawyer Name'] }}</td>
            <td>{{ lawyer['Specialization'] }}</td>
            <td>{{ lawyer['Phone'] }}</td>
            <td>{{ lawyer['Email Link'] }}</td>
        </tr>
        {% endfor %}
    </table>
    {% else %}
    <p>No matching lawyers found.</p>
    {% endif %}

    <!-- Similar Cases -->
    {% if cases %}
    <h2>Similar Cases</h2>
    <table>
        <tr><th>Case Name</th><th>Decision Type</th><th>Decision Direction</th></tr>
        {% for case in cases %}
        <tr>
            <td>{{ case['case_name'] }}</td>
            <td>{{ case['decision_type'] }}</td>
            <td>{{ case['decision_direction'] }}</td>
        </tr>
        {% endfor %}
    </table>
    {% else %}
    <p>No similar cases found.</p>
    {% endif %}

    <!-- AI Recommendations -->
    <h2>AI Recommendations</h2>
    <div class="ai-box">
        <p>{{ recommendations }}</p>
    </div>
</body>
</html>
"""

# Flask Routes
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        case_type = request.form["case_type"]
        case_facts = request.form["case_facts"]

        lawyers_result = search_lawyers(case_type)
        cases_result = match_cases(case_facts)
        ai_recommendations = recommend_steps_with_gemini(case_facts)

        return render_template_string(results_page_template,
                                      lawyers=lawyers_result.to_dict(orient="records"),
                                      cases=cases_result.to_dict(orient="records"),
                                      recommendations=ai_recommendations)
    return render_template_string(landing_page_template)

# Run the Flask App
if __name__ == "__main__":
    # Your main function or script execution code here
    app.run(debug=True)
