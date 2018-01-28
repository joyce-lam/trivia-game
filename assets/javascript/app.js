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
	choices: ["Kaya", "Vegemite", "Skippy's", "Daiya"],
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




var showPage;
var lockGame = false;
var clockRunning = false;
var time = 60 * 3;


$("#start").click(function() {
	startGame();
	countTime();
	$(this).hide();
})


function startGame() {
	showPage = setTimeout(showQuestion , 500);
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
	$("#display").text(currentTime);
}


function showTime() {
	var minutes = Math.floor(time/60);
	var seconds = time - (minutes * 60);
	if (seconds <10) {
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
		var questionGroup = $('<div>');
		var questionGroupId = questionGroup.attr("id", ('group' +i));
		var questionDiv = $('<div>');
		questionDiv.addClass("qdiv");
		questionDiv.data("q", i);
		questionDiv.html(questions[i].question);
		questionGroup.append(questionDiv);

		for (var j = 0; j < questions[i].choices.length; j++) {
			var choiceBtn = $('<button>');
			choiceBtn.addClass("btn btn-success");
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
	setTimeout(stopGame, 1000*5);
	setTimeout(showAnswer, 1000*5);
}


function stopGame() {
	clearInterval(showPage, counting);
	compareAnswer();
	$("#end").text("The End");
}


function showAnswer() {
	for (var i = 0; i<questions.length; i++) {
		var ansDiv = $("<div>");
		ansDiv.addClass("ans");
		ansDiv.data("answer", i);
		ansDiv.text(questions[i].answer);
		$("#group" + i).append(ansDiv);
	}
}


function compareAnswer() {
	$("button").click(function (){
		if (lockGame !== true) {
			var qId = parseInt($(this).data("questionId"));
			var qChoice = parseInt($(this).data("choice"));
			var userAns = questions[qId].choices[qChoice];

			if (questions[qId].answer === userAns) {
				$("#group" + qId).append("<div>" + "Correct" + "</div>");
			} else {
				$("#group" + qId).append("<div>" + "Wrong" + "</div>");
			}
			lockGame = true;
		}
	})
}



