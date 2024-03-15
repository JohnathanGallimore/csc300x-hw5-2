#Jokebook API Documentation

##Endpoint 1 - Jokebook Categories

**Request Format:**
-Method: GET
-Endpoint: '/jokebook/categories'

**Returned Data Format**:
-JSON array of strings representing joke categories

**Description:**
This endpoint retrieves a list of all avaiable joke categories in the jokebook.

**Example Request:**
'''bash
GET/jokebook/categories

**Example Response:**
["funnyJoke", "lameJoke"]

**Error Handling:**
None.

##Endpoint 2 - Jokes in a Category

**Request Format:**
-Method: GET
-Endpoint: '/jokebook/joke/:category'
-Query Parameters: 'limit' limits the number of jokes returned.

**Returned Data Format:**
-JSON array of objects, each containing a joke and its response

**Description:**
This endpoint retrieves jokes from specified category.

**Example Request:**
GET/jokebook/joke/funnyJoke?limit=2

**Example Response:**
[
    {"joke": "Why did the student eat his homework?", "response": "Because the teacher told him it was a piece of cake!"},
    {"joke": "What kind of tree fits in your hand?", "response": "A palm tree"}
]

**Error Handling:**
-If the specified category is not found, the response will have the 404 status code with the error message:
'''json
{"error": "No category listed for [category]"}

##Endpoint 3 - Add a new Joke

**Request Format:**
-Method: POST
-Endpoint: '/jokebook/joke/new'
-Body Parameters:
    'category'- should ethier be funnyJoke or lameJoke
    'joke'- text of joke
    'response'- response of joke

**Returned Date Format:**
-JSON array of objects, each containing a joke and its response

**Description:**
This endpoint allows adding a new joke, I could not get it to run on the actual webpage but tested it with ThunderClient and had it set right would not run correctly.

**Example Request:**
POST/jokebook/joke/new

**Example Response:**
{
  "category": "funnyJoke",
  "joke": "Why don't scientists trust atoms?",
  "response": "Because they make up everything!"
}

**Error Handling:**
-If missing one of the parametrs the service should print out {'error': 'invalid or insufficient user input'}  and a status error of 400