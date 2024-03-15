const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher said it was a piece of cake!'
    },
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    },
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];

let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    {
        'joke': 'What would the Terminator be called in his retirement?',
        'response': 'The Exterminator'
    }
];

let jokebook = {
    funnyJoke: funnyJoke,
    lameJoke: lameJoke
};

function parseJoke(joke){
    return joke.replace(/[^\w\s]/gi, '');
}

function parseResponse(response){
    return response.trim();
}

app.get('/jokebook/categories', (req, res) => {
    res.json(categories)
});

app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    console.log('Category:', category);
    const limit = req.query.limit;
    console.log('Jokes array:', jokebook[category]);

    if (!jokebook[category]){
        console.log('No category found for:', category);
        return res.status(404).json({error: `No category listed for ${category}`}); 
    }

    let jokes = jokebook[category];
    let selectedJokes = [];

    if (limit && !isNaN(limit) && limit > 0) {
        let availableIndexes = jokes.map((_, index) => index);
        for (let i = 0; i < Math.min(limit, jokes.length); i++) {
            if (availableIndexes.length === 0) break; // Break loop if no more jokes available
            const randomIndex = Math.floor(Math.random() * availableIndexes.length);
            const selectedIndex = availableIndexes.splice(randomIndex, 1)[0];
            const selectedJoke = jokes[selectedIndex];
            if (selectedJoke && selectedJoke.joke) {
                selectedJokes.push({ joke: parseJoke(selectedJoke.joke), response: parseResponse(selectedJoke.response) });
            } else {
                console.log('Selected joke is undefined:', selectedIndex);
            }
        }
        res.json(selectedJokes);
    } else {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex];
        if (randomJoke && randomJoke.joke) {
            res.json({ joke: parseJoke(randomJoke.joke), response: parseResponse(randomJoke.response) });
        } else {
            console.log('Random joke is undefined');
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});



app.post('/jokebook/joke/new', (req, res) => {
    console.log('Received POST request to /jokebook/joke/new');
    console.log('Request body:', req.body);
    const { category, joke, response } = {category:'funnyJoke', joke:'Why did your mom sleep with me?', response:'Because'};

    
    if (!category || !joke || !response) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (category !== 'funnyJoke' && category !== 'lameJoke') {
        return res.status(400).json({ error: 'Invalid category' });
    }
   
    if (!jokebook[category]) {
        return res.status(404).json({ error: `No category found for ${category}` });
    }

    jokebook[category].push({ joke, response });
    console.log(jokebook); 
    res.status(201).json(jokebook[category]);
});


app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});
