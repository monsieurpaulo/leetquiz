const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");
const question=document.querySelector(".question");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
let questionIndex;
let index=0;
let myArray=[];
let score=0;


const questions=[
    {
        q:'What is the hottest continent on Earth?',
        options: ['Asia', 'Africa', 'North America'],
        answer: 1
    },

    {
        q:'Which country is the origin of the cocktail Mojito?',
    options: ['Italy', 'Jamaica', 'Cuba'],
    answer: 2
    },

    {
        q:'What is the capital of Westeros in Game of Thrones?',
    options: ['Kings Landing', 'The Westerlands', 'The Reach'],
    answer: 0

    },

    {
        q:'Who scored the first Premier League hat-trick?',
        options: ['Eric Cantona', 'Thierry Henry', 'Brian Dean'],
        answer: 0
    },
    {
        q:'How many sides does a hexagon have?',
        options: ['Seven', 'Nine', 'Six'],
        answer: 2
    }
    
]

totalQuestionSpan.innerHTML=questions.length;
function load() {
    questionNumberSpan.innerHTML=index+1;
    question.innerHTML=questions[questionIndex].q;
    op1.innerHTML=questions[questionIndex].options[0];
    op2.innerHTML=questions[questionIndex].options[1];
    op3.innerHTML=questions[questionIndex].options[2];
    index++;
}

function check(element) {
    if (element.id==questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
        console.log("score:"+score)
    }

    else {
        element.classList.add("wrong");
        updateAnswerTracker("wrong");
    }

    disabledOptions()
}

function disabledOptions() {
    for(let i=0; i<options.length; i++) {
            options[i].classList.add("disabled");
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");  
        }
    }
}

function enableOptions() {
    for(let i=0; i<options.length; i++) {
            options[i].classList.remove("disabled", "correct", "wrong");

        }
    }

    function validate(){
        if(!options[0].classList.contains("disabled")){
            alert("You Gotta Select An Answer")
        }
        else {
            enableOptions();
            randomQuestions();
        }
    }

    function next() {
        validate();
    }


function randomQuestions() {
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
        if(index==questions.length){
            quizOver();
    }

    else {
        if(myArray.length>0) {
            for(let i=0; i<myArray.length; i++){
                if(myArray[i]==randomNumber){
                    hitDuplicate=1;
                    break;
                }

            }    
            if(hitDuplicate==1) {
                randomQuestions();
            }    

            else {
                questionIndex=randomNumber;
                load(); 
            }
        
    }

    if(myArray.length==0) {
        questionIndex=randomNumber;
        load();
    }

    myArray.push(randomNumber);
        }

    }

function answerTracker() {
            for(let i=0; i<questions.length; i++){
                const div=document.createElement("div")
                answerTrackerContainer.appendChild(div);
            }
}

function updateAnswerTracker(classNam) {
    answerTrackerContainer.children[index-1].classList.add(classNam);
}

function quizOver() {
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}

function tryAgain() {
    window.location.reload();

}

window.onload=function() {
    randomQuestions();
    answerTracker();
}
