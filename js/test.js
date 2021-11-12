const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const video = document.getElementById("video");

let path = window.location.pathname;
let page = path.split("/").pop();
console.log( page ); 


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
const next_btn = document.querySelector(".next_btn");
const bottom_ques_counter = document.querySelector(".test_footer .total_que");
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
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

    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let que_pic = `<video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline id="video">
    <source src=${questions[index].source} type="video/mp4">
    <source src=${questions[index].source} type="video/ogg">
    Your browser does not support the video tag.
  </video>`;
    console.log('hello')
    console.log(que_pic)
    let option_tag = '';
    if (questions[index].img == 'understand') {
        option_tag = '<div class="option understand"><span>' + questions[index].options[0] + '</span></div>';
        // video.style.height == "95px"
    } else if (questions[index].img == 'type1') {
        option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
            + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    } else if (questions[index].img == 'type2') {
        que_pic = "";
        option_tag = `<div class="option option_video"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
        <source src=${questions[index].options[0]} type="video/mp4">
        <source src=${questions[index].options[0]} type="video/ogg">
        Your browser does not support the video tag.
      </video></span></div>`
            + `<div class="option option_video"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
        <source src=${questions[index].options[1]} type="video/mp4">
        <source src=${questions[index].options[1]} type="video/ogg">
        Your browser does not support the video tag.
      </video></span></div>`
    } else if (questions[index].img == 'type3') {
        // que_pic = "";
        option_tag = `<div class="option option_video"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
    <source src=${questions[index].options[0]} type="video/mp4">
    <source src=${questions[index].options[0]} type="video/ogg">
    Your browser does not support the video tag.
  </video></span></div>`
            + `<div class="option option_video"><span><video width="320" height="240"  muted autoplay loop disablepictureinpicture playsinline>
    <source src=${questions[index].options[1]} type="video/mp4">
    <source src=${questions[index].options[1]} type="video/ogg">
    Your browser does not support the video tag.
  </video></span></div>`
    }
    // + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    // + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    // + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
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
    

    if (page == "test.html" || page == "test_level2.html") {
        if (userScore > 60) {
            // let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + 100 + ' điểm </p></span> <span class="ta-center"> Bạn đã sẵn sàng để chinh phục vòng tiếp theo!</span>';
            scoreText.innerHTML = scoreTag;
        }
        else if (userScore > 50 && userScore < 60 ) {
            // let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + 100 + ' điểm </p></span> <span class="ta-center">Hãy ôn tập lại để đủ điều kiện chinh phục vòng tiếp theo!</span>';
    
            scoreText.innerHTML = scoreTag;
        }
        else {
            // let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + 100 + ' điểm </p></span> <span class="ta-center">Hãy ôn tập lại để đủ điều kiện chinh phục vòng tiếp theo!</span>';
    
            scoreText.innerHTML = scoreTag;
        }
    } else if (page == "test_lv3.html" || page == "test_level4_1.html" || page == "test_level4_2.html") {
        if (userScore > 84) {
            // let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + 140 + ' điểm </p></span> <span class="ta-center"> Bạn đã sẵn sàng để chinh phục vòng tiếp theo!</span>';
            scoreText.innerHTML = scoreTag;
        }
        else if (userScore > 70 && userScore < 84 ) {
            // let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> Một chút nữa thôi! Bạn đạt <p>' + userScore + '</p> trên <p>' + 140 + ' điểm </p></span> <span class="ta-center">Hãy ôn tập lại để đủ điều kiện chinh phục vòng tiếp theo!</span>';
            scoreText.innerHTML = scoreTag;
        }
        else {
            // let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + 140 + ' điểm </p></span> <span class="ta-center">Hãy ôn tập lại để đủ điều kiện chinh phục vòng tiếp theo!</span>';
    
            scoreText.innerHTML = scoreTag;
        }
    } else {
        if (userScore > 102) {
            // let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> và chúc mừng, bạn đạt <p>' + userScore + '</p> trên <p>' + 170 + ' điểm </p></span> <span class="ta-center"> Bạn đã sẵn sàng để chinh phục vòng tiếp theo!</span>';
            scoreText.innerHTML = scoreTag;
        }
        else if (userScore > 85 && userScore < 102 ) {
            // let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> tuyệt, bạn đạt <p>' + userScore + '</p> trên <p>' + 170 + ' điểm </p></span> <span class="ta-center">Hãy ôn tập lại để đủ điều kiện chinh phục vòng tiếp theo!</span>';
    
            scoreText.innerHTML = scoreTag;
        }
        else {
            // let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + questions.length + ' điểm </p></span>';
            let scoreTag = '<span> ôi không, bạn đạt <p>' + userScore + '</p> trên <p>' + 170 + ' điểm </p></span> <span class="ta-center">Hãy ôn tập lại để đủ điều kiện chinh phục vòng tiếp theo!</span>';
    
            scoreText.innerHTML = scoreTag;
        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

