const questionsElement = document.querySelector("#questions");
const submitButton = document.querySelector("#submit");
const finalScore = document.querySelector('#score');
let score =0;
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    console.log("session storage to comes from the data ", sessionStorage.getItem("progress"));
    let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
    if(typeof userAnswers==="object"){
      console.log("found by a session storage to a user answer ",userAnswers.length);
    }else{
      console.log("not found by a session storage to a user answer ",userAnswers);
    }
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      console.log("choice ",choice);
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      choiceElement.addEventListener('input',(e)=>{
        if(userAnswers.length>1){
        const existingData = sessionStorage.getItem("progress");
        if(existingData){
          try{
            userAnswers = JSON.parse(sessionStorage.getItem("progress"));
            if(!Array.isArray(userAnswers)){
              userAnswers = [];
            }
          }catch(err){
              userAnswers = [];
          }
        }
      }
        userAnswers[i]=e.target.value;
        sessionStorage.setItem("progress",JSON.stringify(userAnswers));
        console.log("updated array ",userAnswers);
        console.log("question ka answer ",question.answer);
	    if(localStorage.getItem("score")!==null){
          score = Number(localStorage.getItem("score"));
        }
        if(e.target.value===question.answer){
          console.log("correct answer")
          score++;
        }else{
          console.log("incorrect answer")
        }
        localStorage.setItem("score",score);
      });
   
      if (i<userAnswers.length && userAnswers[i] === choice) {
        console.log("inside this");
        choiceElement.setAttribute("checked", true);
      }

	     if(localStorage.getItem("score")!==null){
        let FinalScore = localStorage.getItem("score");
        console.log("final score is ",FinalScore)
        finalScore.textContent = `Your score is ${FinalScore} out of 5.`;
      }	
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    // console.log("User Answers ",userAnswers);
    questionsElement.appendChild(questionElement);
  }
}

submitButton.addEventListener('click',(e)=>{
   let FinalScore = localStorage.getItem("score");
   console.log("final score is ",FinalScore)
   finalScore.textContent = `Your score is ${FinalScore} out of 5.`;
});


renderQuestions();
