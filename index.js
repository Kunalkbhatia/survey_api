const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Questions data
const questionBank = {
  technology: {
    JavaScript: [
      "How many years of experience do you have with JavaScript?",
      "What projects have you worked on using JavaScript?",
      "How often do you use JavaScript in your current role?",
    ],
    Python: [
      "How many years of experience do you have with Python?",
      "What types of applications do you develop with Python?",
      "Do you use Python for data analysis or machine learning?",
    ],
    Java: [
      "How many years of experience do you have with Java?",
      "Which frameworks or libraries do you frequently use with Java?",
      "What kind of systems or applications have you built using Java?",
    ],
    CSharp: [
      "How many years of experience do you have with C#?",
      "Are you familiar with .NET development using C#?",
      "What is your favorite IDE for C# development?",
    ],
  },
  health: {
    Daily: [
      "What type of exercises do you do daily?",
      "How long is your daily workout routine?",
      "What motivates you to exercise every day?",
    ],
    Weekly: [
      "What type of exercises do you do weekly?",
      "How long is your weekly workout routine?",
      "Do you follow any specific workout plan or program?",
    ],
    Monthly: [
      "What type of exercises do you do monthly?",
      "How long is your monthly workout routine?",
      "How do you track your progress with monthly exercises?",
    ],
    Rarely: [
      "What type of exercises do you do when you exercise?",
      "What are the main reasons for exercising rarely?",
      "What could motivate you to exercise more frequently?",
    ],
    Vegetarian: [
      "How long have you been a vegetarian?",
      "What are your favorite vegetarian dishes?",
      "Do you follow any specific vegetarian diet plan?",
    ],
    Vegan: [
      "How long have you been a vegan?",
      "What are your favorite vegan dishes?",
      "What challenges have you faced as a vegan?",
    ],
    NonVegetarian: [
      "How often do you include meat in your diet?",
      "What are your favorite non-vegetarian dishes?",
      "Do you follow any specific diet plan that includes meat?",
    ],
  },
  education: {
    HighSchool: [
      "What subjects did you excel in during high school?",
      "Did you participate in any extracurricular activities?",
      "What are your plans after high school?",
    ],
    Bachelors: [
      "What was your major during your bachelor's degree?",
      "Did you complete any internships during your studies?",
      "What are your career plans after obtaining your bachelor's degree?",
    ],
    Masters: [
      "What was your major during your master's degree?",
      "Did you complete a thesis or a major project during your studies?",
      "How has your master's degree helped you in your career?",
    ],
    PhD: [
      "What was your research topic during your PhD?",
      "Did you publish any papers during your PhD studies?",
      "How has your PhD influenced your career path?",
    ],
  },
};

// Endpoint to get survey questions
app.post("/getSurveyQuestions", (req, res) => {
  try {
    const { surveyTopic, fields } = req.body;

    // Validate if surveyTopic and fields are provided
    if (!surveyTopic || !fields) {
      throw new Error(
        "Please provide both surveyType and fields in the request body."
      );
    }

    // Destructure fields object to get field1 and field2
    const [field1, field2] = Object.values(fields);

    // Check if the surveyTopic and fields exist in questionBank
    if (!questionBank[surveyTopic]) {
      throw new Error(
        `Survey topic "${surveyTopic}" not found in question bank.`
      );
    }

    if (!questionBank[surveyTopic][field1]) {
      throw new Error(
        `Field "${field1}" not found in survey topic "${surveyTopic}" in question bank.`
      );
    }

    // Fetch questions based on field1
    let questions = [...questionBank[surveyTopic][field1]];

    // If field2 exists in fields and questionBank, append its questions
    if (field2 && questionBank[surveyTopic][field2]) {
      questions = [...questions, ...questionBank[surveyTopic][field2]];
    }

    // Send response with questions
    res.status(200).json({ questions });
  } catch (error) {
    // Handle errors
    console.error("Error fetching survey questions:", error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("server si listening");
});
