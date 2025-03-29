document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const counter = document.getElementById('counter');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    const heart = document.getElementById('heart');
    const pause = document.getElementById('pause');
    const likes = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('list');

    // Initial state
    let count = parseInt(counter.textContent) || 0;
    let isPaused = false;
    let timer = setInterval(incrementCounter, 1000);
    const likeCounts = {};

    // Timer function
    function incrementCounter() {
        if (!isPaused) {
            count++;
            updateCounter();
        }
    }

    function updateCounter() {
        counter.textContent = count;
    }

    // Plus button
    plus.addEventListener('click', () => {
        count++;
        updateCounter();
    });

    // Minus button
    minus.addEventListener('click', () => {
        count--;
        updateCounter();
    });

    // Like button
    heart.addEventListener('click', () => {
        likeCounts[count] = (likeCounts[count] || 0) + 1;
        updateLikes();
    });

    function updateLikes() {
        likes.innerHTML = '';
        for (let num in likeCounts) {
            const li = document.createElement('li');
            li.textContent = `${num} has been liked ${likeCounts[num]} time${likeCounts[num] === 1 ? '' : 's'}`;
            likes.appendChild(li);
        }
    }

    // Pause/Resume button
    pause.addEventListener('click', () => {
        isPaused = !isPaused;
        pause.textContent = isPaused ? 'resume' : 'pause';

        [plus, minus, heart].forEach(button => button.disabled = isPaused);
    });

    // Comment form
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = commentInput.value.trim();

        if (comment) {
            const p = document.createElement('p');
            p.textContent = comment;
            commentList.appendChild(p);
            commentInput.value = '';
        }
    });
});
