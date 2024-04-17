

let questionList = [

    {
        question : "Who is Naruto's father?",
        answer :[
            { text:"Jiraiya", correct : "false"},
            { text:"Orochimaru", correct : "false"},
            { text:"Minato", correct : "true"},
            { text:"Hashirama", correct : "false"},
        ]
    },

    {
        question : "Who is known as \"The God of Shinobi\" ",
        answer :[
            { text:"Jiraiya", correct : "false"},
            { text:"Madara", correct : "false"},
            { text:"Minato", correct : "false"},
            { text:"Hashirama", correct : "true"},
        ]
    },

    {
        question : "Who was declared as the strongest shinobi by Madara",
        answer :[
            { text:"Might Guy", correct : "true"},
            { text:"Sasuke", correct : "false"},
            { text:"Naruto", correct : "false"},
            { text:"Lee", correct : "false"},
        ]
    },


    {
        question : "Pain was a sibling student of",
        answer :[
            { text:"Sasuke", correct : "false"},
            { text:"Naruto", correct : "true"},
            { text:"Kakazu", correct : "false"},
            { text:"Tsunade", correct : "false"},
        ]
    }

];

const questionName =  document.querySelector("#qstn");
const answerButton =  document.querySelector(".answer-buttons");
const submitButton =  document.querySelector(".submit-button");


let questionIndex = 0;
let score = 0;

function resetState(){
    submitButton.style.display = "none";

    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function showQuesion(){
    resetState();
    let curQuestion = questionList[questionIndex];
    let qstnNo = questionIndex + 1;

    questionName.innerHTML = qstnNo +". "+curQuestion.question;

    curQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("option");
        answerButton.appendChild(button);
        
        if(answer.correct)button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
submitButton.style.display = "block";
}

function startQuiz(){
    questionIndex = 0;
    score = 0;
    submitButton.innerHTML = "Next";
    showQuesion();
}

function showScore(){
    resetState();
    questionName.innerHTML = `You Scored  ${score} out of ${questionList.length}!`;
    submitButton.innerHTML = "Play again";
    submitButton.style.display = "block";
}

function handleNext(){
    questionIndex++;
    if(questionIndex < questionList.length){
    showQuesion();
    }
    else{
        showScore();
    }
}

submitButton.addEventListener("click",()=>{
    if(questionIndex < questionList.length){
        handleNext();
    }
    else{
        startQuiz();
    }
})

startQuiz();