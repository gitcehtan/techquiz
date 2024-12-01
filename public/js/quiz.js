
let boxes = document.querySelectorAll("input[type=checkbox]");
let labels = document.querySelectorAll("label");

let ans_choice = document.getElementsByClassName("ans_choice");

let questionElement = document.getElementById("question");
let optionsElement = document.getElementById("options");

let saveBtn = document.getElementById("saveBtn");
let submitBtn = document.getElementById("submitBtn");

let scorePara = document.getElementById("score");
let scoreDetails = document.getElementById("score-details");

let timer = document.getElementById("timer");
let timeLeft = document.getElementById("time-left");

let score = 0;
let selected_ans = "";

let timerInterval;



/********************* Full Screen Mode **********************/

let fullScrnBtn = document.getElementById("fullscreenBtn");

let exitBtn = document.getElementById("exitfullscreenBtn");

let elementToFullscreen = document.getElementById("container"); // Replace "container" with your element's ID
  let warningMessage = document.getElementById("warningMessage");
  
//   const questions = getQuestions();
  
//   if(questions.error){
//     console.log(questions.error);
    
//       alert("No Questions Found with tags");
//       fullScrnBtn.disabled = true;
//   }
  
  
  fullScrnBtn.addEventListener("click", () => {
      
      if (elementToFullscreen.requestFullscreen) {
          elementToFullscreen.requestFullscreen();
        } else if (elementToFullscreen.webkitRequestFullscreen) { // Safari
            elementToFullscreen.webkitRequestFullscreen();
    } else if (elementToFullscreen.msRequestFullscreen) { // IE/Edge
      elementToFullscreen.msRequestFullscreen();
    }
  });

  exitBtn.addEventListener("click", exitQuiz);
  
  function exitQuiz(){
    if (document.fullscreenElement) {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }

    exitBtn.disabled = true;
  }
  
  // Listen for changes to the fullscreen state
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      // showWarning();

      submitBtn.disabled = false; // enable the submit button
      saveBtn.disabled = true;
      
      submitBtn.click(); // incase you get out of full screen mode then thes test will be auto submited
      exitBtn.disabled = true;
      
      submitBtn.disabled = true; // finally disable the submit button
    }
  });
  
  // Function to display the warning message
  function showWarning() {
    warningMessage.style.display = "block";
  }
  
  // Optional: Hide the warning message when the user clicks on it
  warningMessage.addEventListener("click", () => {
    warningMessage.style.display = "none";
  });
  



/******************* Timer Section ***************/
function startTimer(){
  let totalSeconds = 600;

  exitBtn.disabled = true;
  saveBtn.disabled = false;
  

  function updateTime() {
    if (totalSeconds > 0) {
      totalSeconds--;
  
      // Calculate hours, minutes, and seconds
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds % 3600) / 60);
      let seconds = totalSeconds % 60;
  
      // Format time as HH:MM:SS
      let displayHours = hours < 10 ? "0" + hours : hours;
      let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
      let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
      
      timeLeft.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;

      
      

    } else {
      timeLeft.textContent = `00:00:00`;
      // clearInterval(timerInterval); // Stop the timer when it reaches 0
      
      stopTimer();
      submitBtn.disabled = false; // enable the submit button
      saveBtn.disabled = true; // disbale the submit button

      submitBtn.click(); // to automatically submit the quiz.

      submitBtn.disabled = true; // finally disable the submit button
      // alert("Time's up!"); // Optionally, alert the user

      exitBtn.disabled = false;
      

    }
  }

 timerInterval = setInterval(updateTime, 1000);

  
}

function stopTimer(){
  clearInterval(timerInterval);
}

fullScrnBtn.addEventListener('click',(e) =>{
  e.preventDefault();


  scoreDetails.style.display = "none";
  exitBtn.disabled = true;
  saveBtn.disabled = false;

  timeLeft.textContent = `00:00:00`;
  
  startTimer();
  allQuestions();


})



function boxCheckColor_Check_State(){
  

  boxes.forEach(b => b.addEventListener("change", tick));
  
  boxes.forEach(b => b.checked = false); // clear all checkboxes
  labels.forEach(label => label.style.backgroundColor = "lightgray");

  function tick(e) {
      let state = e.target.checked; // save state of changed checkbox
      
      
      boxes.forEach(b => b.checked = false); // clear all checkboxes
      labels.forEach(label => label.style.backgroundColor = "lightgray");

      e.target.checked = state; // restore state of changed checkbox

      if(state){
        e.target.parentNode.style.backgroundColor = "rgb(211, 252, 211)";
      }
      else{
        e.target.parentNode.style.backgroundColor = "lightgray";
      }
      
      
      
      selected_ans = e.target.parentNode.innerText.substring(0,1).toLowerCase();
      
    }

}
boxCheckColor_Check_State();

/*********************** Get Questions ***********************/

async function getQuestions(){
 
    const response = await fetch("https://techquiz-i5sx.onrender.com/get-questions");
    const questions = await response.json();
    
    
    return questions;


}
  
async function showQuestion(question){
    // let questions = await getQuestions();

    console.log(question);
    
    let answers = Object.values(question?.answers);

    questionElement.innerText = question.question;


    let ansNotNull = answers.filter(ans => ans !== null);
    // console.log(ansNotNull);
    
    
    
    for(let i = 0; i < ansNotNull.length; i++){
      let optn_alp = 65+i; 

      ans_choice[i].innerText = String.fromCharCode(optn_alp) +". "+ ansNotNull[i];
      
    }
    for(let i = ansNotNull.length; i < labels.length; i++){  
        labels[i].classList.add("hideOptn");    
    }
    
    optionsElement.style.display = "grid";
  
    // optionsElement.appendChild(content);


    
  }


  


async function allQuestions(){
    let questions = await getQuestions();
 
    await showQuestion(questions[0]);
    let i = 0;
    let no_of_questions = questions.length-1;

    
   const saveAnswer = async(e)=>{
      
      e.preventDefault();

      /************ Score Calculation *************/
      
    let correct_ans = questions[i].correct_answers;
    let correct_optns = Object.keys(correct_ans);
    let correct_T_F =  Object.values(correct_ans);

    if(selected_ans !== ""){
      for(let i  = 0; i < correct_T_F.length; i++){
        
        if(correct_T_F[i] === "true"){
          console.log(i," ", correct_T_F[i]," option ",correct_optns[i]);
          let correct_option = correct_optns[i].substring(7,8);
  
          console.log("selected_ans "+selected_ans);
          console.log("correct_option "+correct_option);
          
          if(selected_ans === correct_option)
          {
            score += 1;
            break;
            
          } else{
            score -= 1;
            break;
          }
        }
      }
      
      console.log("Score: ",score);
    }
      
      
      ++i;
      
      if(i > no_of_questions){ // at the last question
        submitBtn.disabled = false;
        saveBtn.disabled = true;

      }

     
      
      
      if(i > no_of_questions){
        console.log("i : ",i," total ",no_of_questions);
        saveBtn.removeEventListener('click',saveAnswer);
        
      }
      else{
        boxCheckColor_Check_State();

       await showQuestion(questions[i]);
      }

      console.log("Save Btn Clicked ");
      
      
    } // saveAnswer Function
    
    saveBtn.addEventListener("click", saveAnswer);
    
    submitBtn.addEventListener("click",(e)=>{
      e.preventDefault();
      submitBtn.disabled = true;
      exitBtn.disabled = false;  // false means enabled

      scorePara.innerText = score;
      scoreDetails.style.display = "block";
      stopTimer();
      console.log("Submit Btn Clicked ");
    })

 } // end of function allQuestions

  
