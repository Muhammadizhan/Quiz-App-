const div = document.getElementById("quiz");
let Index = 0;
let response = [];
let Total = 0;

const RenderQuestion = (arr) => {
  const allAnswers = [...arr.incorrectAnswers, arr.correctAnswer];
  let shufflearray = [];
  function shuffle(allAnswers) {
    let usedIndex = [];
    let i = 0;
    while (i < allAnswers.length) {
      let randomnumber = Math.floor(Math.random() * allAnswers.length);
      if (!usedIndex.includes(randomnumber)) {
        shufflearray.push(allAnswers[randomnumber]);
        usedIndex.push(randomnumber);
        i++;
      }
    }
    return shufflearray;
  }
  shuffle(allAnswers);
  console.log(allAnswers);

  // Clear previous question
  div.innerHTML = "";

  // Creating a card element for the current question
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-body">
      <h3 class="card-title">Q${Index + 1}: ${arr.question.text}</h3>
      <ul>
        ${shufflearray
          .map(
            (answer, index) => `
              <li>
                <label>
                  <input type="radio" name="question${Index}" value="${answer}">
                  ${answer}
                </label>
              </li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  div.appendChild(card); // Append the card to the quiz container

  document.getElementById("nextButton").disabled = true;
  const radioButtons = document.querySelectorAll(
    `input[name=question${Index}]`
  );
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      var selected = document.querySelector(
        `input[name=question${Index}]:checked`
      ).value;
      if (selected) {
        document.getElementById("nextButton").disabled = false;
      }
      if (selected === arr.correctAnswer) {
        Total += 10;
      }
      console.log(`Selected answer: ${selected}`);
      console.log(Total);
    });
  });
};

const Nextquestion = () => {
  if (Index < response.length - 1) {
    Index++;
    RenderQuestion(response[Index]);
  } else {
    div.innerHTML = `<h2>You have completed the quiz!</h2> <br> </hr> <h2> Your score is : ${Total} </h2>`;
    document.getElementById("nextButton").style.display = "none";
  }
};

const getQuestion = async () => {
  try {
    const data = await fetch("https://the-trivia-api.com/v2/questions");
    response = await data.json();
    console.log(response);
    RenderQuestion(response[Index]);
  } catch (error) {
    console.log("error===>", error);
  }
};
getQuestion();
