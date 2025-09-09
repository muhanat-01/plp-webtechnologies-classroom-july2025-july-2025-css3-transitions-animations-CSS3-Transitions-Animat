document.addEventListener('DOMContentLoaded', () => {
    // Animation Controls
    const toggleBtn = document.getElementById('toggleAnimation');
    const speedControl = document.getElementById('speedControl');
    const demoAnimation = document.querySelector('.demo-animation');
    
    let isPlaying = true;

    toggleBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        demoAnimation.style.animationPlayState = isPlaying ? 'running' : 'paused';
        toggleBtn.textContent = isPlaying ? 'Pause' : 'Play';
    });

    speedControl.addEventListener('input', (e) => {
        const speed = e.target.value;
        demoAnimation.style.animationDuration = `${3/speed}s`;
    });

    // Custom Animation Playground
    const animationType = document.getElementById('animationType');
    const animateBox = document.querySelector('.animate-box');

    animationType.addEventListener('change', (e) => {
        const type = e.target.value;
        animateBox.className = 'animate-box';
        requestAnimationFrame(() => {
            animateBox.classList.add(`animate-${type}`);
        });
    });

    // Code Snippet Highlighting
    document.querySelectorAll('.code-snippet').forEach(snippet => {
        snippet.addEventListener('click', () => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(snippet);
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});// filepath: script.js

// Global scope variables
const quizState = {
    score: 0,    document.addEventListener('DOMContentLoaded', () => {
        const quizState = {
            score: 0,
            totalQuestions: 2,
            answeredQuestions: new Set()
        };
    
        // Select all option buttons
        const options = document.querySelectorAll('.option');
        const submitButton = document.getElementById('submit-quiz');
        const scoreDisplay = document.getElementById('score');
    
        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from siblings
                const parentCard = this.closest('.quiz-card');
                parentCard.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
    
        // Handle quiz submission
        submitButton.addEventListener('click', () => {
            let score = 0;
            const questions = document.querySelectorAll('.quiz-card');
            
            questions.forEach(question => {
                const selectedOption = question.querySelector('.option.selected');
                if (selectedOption) {
                    if (selectedOption.dataset.correct === 'true') {
                        score++;
                        selectedOption.classList.add('correct');
                    } else {
                        selectedOption.classList.add('incorrect');
                        // Show correct answer
                        question.querySelector('[data-correct="true"]').classList.add('correct');
                    }
                }
            });
    
            // Update and animate score
            animateScore(quizState.score, score);
            quizState.score = score;
            
            // Disable all options after submission
            options.forEach(option => option.disabled = true);
            submitButton.disabled = true;
        });
    
        function animateScore(start, end) {
            const duration = 1000;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
    
                const current = Math.floor(start + (end - start) * progress);
                scoreDisplay.textContent = current;
    
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
    
            requestAnimationFrame(update);
        }
    });
    currentQuestion: 0,
    totalQuestions: 1
};

// Function to check answer and return score update
function checkAnswer(button) {
    const isCorrect = button.dataset.correct === "true";
    const scoreChange = isCorrect ? 10 : 0;
    
    // Add appropriate animation class
    button.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Update score
    updateScore(scoreChange);
    
    return isCorrect;
}

// Function to update score with animation
function updateScore(points) {
    const scoreDisplay = document.getElementById('score');
    const oldScore = quizState.score;
    quizState.score += points;
    
    // Animate score change
    animateValue(scoreDisplay, oldScore, quizState.score, 1000);
}

// Function to animate number changes
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (range * progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialize quiz functionality
document.addEventListener('DOMContentLoaded', () => {
    const quizCard = document.querySelector('.quiz-card');
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = checkAnswer(this);
            
            // Flip card after short delay
            setTimeout(() => {
                quizCard.classList.add('flipped');
            }, 1000);
        });
    });
    
    // Reset card on next question
    document.querySelector('.next-question').addEventListener('click', () => {
        quizCard.classList.remove('flipped');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    });
});