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

$("#start").click(startGame);

function startGame() {
	showPage = setTimeout(showQuestion , 500);
}

function showQuestion() {
	var questionGroups = $('#question-groups');

	for (var i = 0; i<questions.length; i++) {
		var questionGroup = $('<div>');

		var questionDiv = $('<div>');
		questionDiv.addClass(questions);
		questionDiv.data("q", i);
		questionDiv.html(questions[i].question);
		questionGroup.append(questionDiv);

		for (var j = 0; j < questions[i].choices.length; j++) {
			var choiceBtn = $('<button>');
			choiceBtn.addClass("btn btn-success");
			choiceBtn.data("value", j);
			choiceBtn.text(questions[i].choices[j]);
			questionGroup.append(choiceBtn);

			console.log(choiceBtn.data("value"));
		}

		questionGroups.append(questionGroup);

	}

		countdown();
}

function countdown() {
	setTimeout(stopGame, 1000*10);
}

function stopGame() {
	clearInterval(showPage);
	$("#end").text("The End");
}
