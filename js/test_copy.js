const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");



start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
}
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    next_btn.classList.remove("show");
}
quit_quiz.onclick = () => {
    window.location.reload();
}
//CREATE RANDOM
function getRandomNumber(min, max) {
  let totalEle = max - min + 1;
  let result = Math.floor(Math.random() * totalEle) + min;
  return result;
}
function createArrayOfNumber(start, end) {
  let myArray = [];
  for (let i = start; i <= end; i++) {
    myArray.push(i);
  }
  return myArray;
}
let numbersArray = createArrayOfNumber(1, 14);
//close Random fuc()
console.log(numbersArray)
const next_btn = document.querySelector(".next_btn");
const bottom_ques_counter = document.querySelector(".test_footer .total_que");
next_btn.onclick = () => {
    //new edit random 
    let randomIndex = getRandomNumber(0, numbersArray.length - 1);
    let randomNumber = numbersArray[randomIndex];
    numbersArray.splice(randomIndex, 1);
    //new edit random 
    if (numbersArray.length != 0) {
        que_count = randomNumber;
        que_numb++;
        showQuetions(randomNumber);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    let que_picture = document.querySelector(".que_picture");

    let que_tag = '<span>' + questions[index].question + '</span>';
    let que_pic = `<video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
    <source src=${questions[index].source} type="video/mp4">
    <source src=${questions[index].source} type="video/ogg">
    Your browser does not support the video tag.
  </video>`;
    console.log(que_pic)

    //switch multiple choice answers
    let option_tag = '';
    let optionsNumber = questions[index].options.length;
    let optionNumberArr = [];

    for (let i = 0; i < optionsNumber; i++) {
        optionNumberArr.push(i);
    }
    console.log(optionNumberArr)

    let optionPositionFirst = Math.floor(Math.random() * optionsNumber);
    let optionPositionSecondArr = [];
    for (i=0; i  < optionsNumber; i ++) {
        if (i!=optionPositionFirst) {
            optionPositionSecondArr.push(i);
        }
    }

    console.log(optionPositionFirst)
    let optionPositionSecond = optionPositionSecondArr[0];
    console.log(optionPositionSecond)
    
    if (questions[index].img == 'understand') {
        option_tag = '<div class="option understand"><span>' + questions[index].options[0] + '</span></div>';
    } else if (questions[index].img == 'type1') {
        option_tag = '<div class="option"><span>' + questions[index].options[optionPositionFirst] + '</span></div>'
            + '<div class="option"><span>' + questions[index].options[optionPositionSecond] + '</span></div>'
    } else if (questions[index].img == 'type2') {
        que_pic = "";
        option_tag = `<div class="option"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
        <source src=${questions[index].options[optionPositionFirst]} type="video/mp4">
        <source src=${questions[index].options[optionPositionFirst]} type="video/ogg">
        Your browser does not support the video tag.
      </video></span></div>`
            + `<div class="option"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
        <source src=${questions[index].options[optionPositionSecond]} type="video/mp4">
        <source src=${questions[index].options[optionPositionSecond]} type="video/ogg">
        Your browser does not support the video tag.
      </video></span></div>`
    } else if (questions[index].img == 'type3') {
        // que_pic = "";
        option_tag = `<div class="option"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
    <source src=${questions[index].options[optionPositionFirst]} type="video/mp4">
    <source src=${questions[index].options[optionPositionFirst]} type="video/ogg">
    Your browser does not support the video tag.
  </video></span></div>`
            + `<div class="option"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
    <source src=${questions[index].options[optionPositionSecond]} type="video/mp4">
    <source src=${questions[index].options[optionPositionSecond]} type="video/ogg">
    Your browser does not support the video tag.
  </video></span></div>`
    }
    // + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    // + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    // + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    console.log("try");
    que_picture.innerHTML = que_pic;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.innerHTML;

    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns.includes(correcAns)) {
        if (option_list.innerHTML.indexOf("understand") !== -1) {
            userScore += 2.5;
        } else {
            userScore += 10;
        }
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");
        for (i = 0; i < allOptions; i++) {
            // if (option_list.children[i] == correcAns) {
            if (userAns.includes(option_list.children[i])) {

                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 60) {
        // let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
        let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + 100 + ' điểm </p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 50 && userScore < 60) {
        // let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
        let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + 100 + ' điểm </p></span>';

        scoreText.innerHTML = scoreTag;
    }
    else {
        // let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
        let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + 100 + ' điểm </p></span>';

        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

