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
