//trivia questions
var questions = [{
	question: "Which city in Australia has the highest population?",
	choices: ["Sydney", "Canberra", "Brisbane", "Perth"],
	answer: "Sydney"
	}, {
	question: "Which is the capital city of Australia?",
	choices: ["Canberra", "Perth", "Sydney", "Brisbane"],
	answer: "Canberra"	
	}, {
	question: "A koala's diet consists mainly of what?",
	choices: ["Eucalyptus leaves", "Smaller koalas", "Bamboo", "Avocado toast"],
	answer: "Eucalyptus leaves"
	}, {
	question: "What is the name of the popular Australian food spread used on sandwiches, toast and pastries?",
	choices: ["Kaya", "Vegemite", "Skippy", "Daiya"],
	answer: "Vegemite"
	}, {
	question: "What is a dingo?",
	choices: ["Flower", "Tree", "Bird", "Wild dog"],
	answer: "Wild dog"
	}, {
	question: "Which is not a common name for kangaroo?",
	choices: ["Buck", "Boomer", "Bandicoot", "Old Man"],
	answer: "Bandicoot"
	}]


var time = 60 * 1;
var correct = 0;
var incorrect = 0;
var lockGame = false;
var clockRunning = false;


$("#start").click(function() {
	startGame();
	countTime();
	$(this).hide();
})


function startGame() {
	showQuestion();
}


function countTime() {
	if (!clockRunning) {
		counting = setInterval(countingTime, 1000);
		clockRunning = true;
	}
}


function countingTime() {
	time--;
	var currentTime = showTime(time);
	$("#time-display").html("Time left: " + currentTime);

	if (time === 0) {
		stopGame();
		showAnswer();
	}
}


function showTime() {
	var minutes = Math.floor(time/60);
	var seconds = time - (minutes * 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	if (minutes === 0) {
		minutes = "00";
	} else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}


function showQuestion() {
	var questionGroups = $('#question-groups');

	for (var i = 0; i<questions.length; i++) {
		var questionGroup = $("<div>");
		questionGroup.attr("id", ('group' +i));
		questionGroup.addClass("question-group");
		var questionDiv = $("<div>");
		questionDiv.addClass("qdiv");
		questionDiv.data("q", i);
		questionDiv.html(questions[i].question);
		questionGroup.append(questionDiv);

		for (var j = 0; j < questions[i].choices.length; j++) {
			var choiceBtn = $("<button>");
			choiceBtn.addClass("btn btn-info");
			choiceBtn.data("questionId", i);
			choiceBtn.data("choice", j);
			choiceBtn.text(questions[i].choices[j]);
			questionGroup.append(choiceBtn);
		}

		questionGroups.append(questionGroup);
	}

	countdown();
}



function countdown() {
	saveAnswer();
}


function stopGame() {
	clearInterval(counting);
	compareAnswer();
	lockGame = true;
}


function showAnswer() {
	for (var i = 0; i<questions.length; i++) {
		var ansDiv = $("<div>");
		ansDiv.addClass("ans");
		ansDiv.data("answer", i);
		ansDiv.text("Answer: " + questions[i].answer);
		$("#group" + i).append(ansDiv);
	}
}


function saveAnswer() {
	$("button").click(function (){
		if (!lockGame) {
			var qId = parseInt($(this).data("questionId"));
			var qChoice = parseInt($(this).data("choice"));
			$(this).addClass("selected btn-danger").siblings().removeClass("selected btn-danger");
		}
	})
}


function compareAnswer() {
	$(".question-group").each(function() {
		var selectedButton = $(this).children("button.selected");

		if (selectedButton.length === 1) {
			var data = $(selectedButton).data();
			var qId = data.questionId;
			var choice = data.choice;

			if (questions[qId].choices[choice] == questions[qId].answer) {
				console.log(qId + ": Correct");
				correct++;
			} else {
				console.log(qId + ": Incorrect");
				incorrect++;
			}

		} else {
			console.log(qId + ": Empty");
			incorrect++;
		}
	})	

	setTimeout(displayResult, 1000*5);
}


function displayResult() {
	console.log(correct);
	console.log(incorrect);

	$("#result").append(correct + " Correct! " + incorrect + " Incorrect!");
	$("#result").append("<img src='../trivia-game/assets/images/koala.jpg' alt='koala'>");
	$("#question-groups").hide();
}

$("#reset").click(function() {
	clearInterval(counting);
	$("#question-groups").empty();
	$("#result").empty();
	$("#time-display").empty();
	$("#start").show();
	time = 60 * 1;
	correct = 0;
	incorrect = 0;
	lockGame = false;
	clockRunning = false;
})

