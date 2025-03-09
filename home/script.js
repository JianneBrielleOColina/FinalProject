document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "How many SDGs does this advocacy adhere to?",
            options: ["2", "5", "8", "6"],
            answer: 3
        },
        {
            question: "Fill in the Blank: Divorce can lead to ____ as it can help relieve an individual from the mental trauma they experienced in a relationship.",
            options: ["SDG 3: Good Health and Well-Being", "Snoop Dogg", "Scrambled Eggs", "SDG 15: Spiderman in the Matrix"],
            answer: 0
        },
        {
            question: "Which SDG entails that both individuals in a union are supposed to be equals?",
            options: ["Reduced Inequities", "Reversed Illusions", "Equal Rights", "Reduced Inequalities"],
            answer: 3
        },
        {
            question: "How does divorce contribute to Quality Education (SDG 4)?",
            options: ["I am so happy", "I am Snoop Dogg", "It can improve the quality of education access a child has in certain situations.", "It increases the number of schools."],
            answer: 2
        },
        {
            question: "How does divorce contribute to SDG 16 (Peace, Justice, and Strong Institutions)?",
            options: ["SDG 4", "SDG 3", "SDG 11", "SDG 16"],
            answer: 3
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    function loadQuestion() {
        answered = false;
        const questionObj = questions[currentQuestionIndex];
        
        document.getElementById("question").innerText = questionObj.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        questionObj.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.onclick = () => checkAnswer(index, button);
            optionsContainer.appendChild(button);
        });

        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
        document.getElementById("submitBtn").style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
    }

    function checkAnswer(selectedIndex, button) {
        if (answered) return;

        answered = true;
        const questionObj = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll(".option-btn");

        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === questionObj.answer) {
                btn.classList.add("correct");  // ✅ Correct answer turns green
            } else if (idx === selectedIndex) {
                btn.classList.add("incorrect"); // ❌ Wrong answer turns red
            }
        });

        if (selectedIndex === questionObj.answer) {
            score++;
        }

        document.getElementById("nextBtn").style.display = "inline-block";
    }

    function nextQuestion() {
        if (!answered) return;

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }

    function endQuiz() {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("result").style.display = "block";
        document.getElementById("score").innerText = `${score} / ${questions.length}`;
        document.getElementById("feedback").innerText = score >= 3 ? "Great job! Keep learning about SDGs." : "You can do better! Try again.";
    }

    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
    document.getElementById("prevBtn").addEventListener("click", prevQuestion);
    document.getElementById("submitBtn").addEventListener("click", endQuiz);

    loadQuestion();
});
