// let selectionSubmitBtn = document.getElementById("selction-submit");
// selectionSubmitBtn.addEventListener("click",(e)) 

  

/*Section form submit */

let quizSelection = document.getElementsByClassName("quiz-select-form")[0];

let category =  document.getElementsByName("category")[0];
let difficulty =  document.getElementsByName("difficulty")[0];
let limit =  document.getElementsByName("limit")[0];



quizSelection.addEventListener("submit", async(e)=>{
    e.preventDefault();

    // console.log("category ",category.value);
    // console.log("difficulty ",difficulty.value);
    // console.log("limit ",limit.value);
    // console.log("tagInput ",Array.from(selectedTags));
    const data = {
      category : category.value,
      difficulty : difficulty.value,
      limit : limit.value
    }

    let url = "http://localhost:3000/select-quiz"
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    
      const responseData = await response.json();
      console.log(responseData);
      window.location.href ="http://localhost:3000/quiz";
    
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
    

    
    

})



// Review Form

const reviewForm = document.getElementsByClassName("review-form")[0];
const userName = document.getElementById("user-name");
const userReview = document.getElementById("user-review");


reviewForm.addEventListener("submit", async(e) => {
  e.preventDefault();
  const review = {
    userName : userName.value,
    userReview: userReview.value
  }
  const response = await fetch("http://localhost:3000/submit-review",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  });

  alert(response);


})