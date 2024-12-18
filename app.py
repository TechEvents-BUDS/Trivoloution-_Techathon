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
        # Explicitly instruct the AI to format output as bullet points
        model = genai.GenerativeModel("gemini-1.0-pro")
        prompt = (
            "Provide clear and concise recommendations in bullet point format for the following legal case. "
            "Start each recommendation with a dash (-) or bullet point, one per line:\n"
            f"{case_description}"
        )
        response = model.generate_content(prompt)
        
        # Post-process the response to extract bullet points
        recommendations = response.text.splitlines()
        
        # Ensure all valid lines are treated as bullet points
        formatted_recommendations = []
        for line in recommendations:
            line = line.strip()
            if line.startswith("-") or line.startswith("*"):
                formatted_recommendations.append(f" ---{line.lstrip('-*').strip()}---")
            elif line:  # Handle lines that are missing bullets
                formatted_recommendations.append(f"---{line.strip()}---")

        # Return as an unordered HTML list
        if formatted_recommendations:
            return "<ul>" + "".join(formatted_recommendations) + "</ul>"
        else:
            return "<p>No recommendations were generated.</p>"

    except Exception as e:
        print(f"Error: {e}")
        return "<p>The system is processing your request. Please try again later.</p>"

# Frontend templates using render_template_string
landing_page_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LegalMind AI</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #F7F9FC;
            color: #333;
            overflow-x: hidden;
        }
        .header {
            background: #0052CC;
            color: white;
            padding: 20px 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header h1 { margin: 0; font-size: 1.8rem; }
        .header a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            margin-left: 20px;
        }
        .main-banner {
            background: linear-gradient(to right, #0052CC, #0077FF);
            color: white;
            padding: 100px 0;
            text-align: center;
        }
        .main-banner h1 {
            font-size: 3rem;
            margin: 0;
            margin-bottom: 10px;
        }
        .main-banner p {
            font-size: 1.2rem;
            margin: 0 auto;
            max-width: 700px;
            line-height: 1.6;
        }
        .btn-group {
            margin-top: 20px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #FFC107;
            color: black;
            font-weight: bold;
            border: none;
            border-radius: 5px;
            margin: 10px;
            cursor: pointer;
            text-decoration: none;
        }
        .btn:hover { background: #E0A800; }
        .form-container {
            padding: 50px;
            background: #FFFFFF;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            margin: 30px auto;
            border-radius: 8px;
        }
        input, select, textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }
        button {
            background-color: #0052CC;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 5px;
        }
        button:hover {
            background-color: #0041A8;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <h1>LegalMind AI</h1>
        <div>
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
        </div>
    </div>

    <!-- Main Banner -->
    <div class="main-banner">
        <h1>Your AI Legal Advisor: Predict, Analyze, and Succeed</h1>
        <p>
            Harness the power of AI to predict case outcomes, find the right lawyer, 
            and compare your case with relevant historical data. Simplify legal research 
            and decision-making for individuals, businesses, and legal professionals in Pakistan.
        </p>
        <div class="btn-group">
            <a href="#" class="btn">Try Now for Free</a>
            <a href="#" class="btn">Learn More</a>
        </div>
    </div>

    <!-- Form Container -->
    <div class="form-container">
        <h2>Get Started</h2>
        <form method="POST" action="/">
            <label for="case_type">Select Case Type:</label>
            <select name="case_type" id="case_type" required>
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
                <option value="family">Family</option>
                <option value="property">Property</option>
            </select>

            <label for="case_facts">Describe Your Case:</label>
            <textarea name="case_facts" id="case_facts" rows="5" placeholder="Enter your case details..." required></textarea>
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
    <title>Results - LegalMind AI</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #F7F9FC;
            color: #333;
            text-align: center;
        }
        h1 { margin-top: 30px; color: #0052CC; }
        table {
            width: 90%;
            margin: 30px auto;
            border-collapse: collapse;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #0052CC;
            color: white;
        }
        tr:nth-child(even) { background-color: #f2f2f2; }
        .ai-box {
            margin: 20px auto;
            background: #FFF;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <h1>Results</h1>
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
