document.addEventListener("DOMContentLoaded", function() {
    fetch('/jokebook/categories')
        .then(response => response.json())
        .then(categories => {
            const categoryContainer = document.getElementById('category-container');

            
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
               categoryContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
});

document.getElementById('category-container').addEventListener('click', function(event){
    if(event.target && event.target,nodeName === 'BUTTON'){
        fetchJokesByCategory(event.target.textContent);
    }
});


window.getJokes = function(){
    const selectedCategory = document.getElementById('category').value;
    fetch(`/jokebook/joke/${selectedCategory}`) 
    .then(response => response.json())
    .then(jokes => {
        const jokesContainer = document.getElementById('jokes');
        jokesContainer.innerHTML = '';
        jokes.forEach(joke =>{
            const jokeElement = document.createElement('div');
            jokeElement.innerHTML = `<p><strong>Joke:</strong> ${joke.joke}</p><p><strong>Response:</strong> ${joke.response}</p>`;
            jokesContainer.appendChild(jokeElement);
        });
    });
};

document.getElementById('jokeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const joke = document.getElementById('newJoke').value;
    const response = document.getElementById('response').value;
    const category = document.getElementById('newJokeCategory').value; 

    if (category !== 'funnyJoke' && category !== 'lameJoke') {
        console.error('Invalid category');
        return;
    }

    const requestBody = {
        category: category,
        joke: joke,
        response: response
    };

    fetch('/jokebook/joke/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add joke');
        }
        return response.json();
    })
    .then(updatedJokes => {
        console.log(updatedJokes);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

