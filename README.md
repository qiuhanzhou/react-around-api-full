
## Around The U.S.

Around the U.S. is full (MERN) stack web app that allows users to create an account, log in, add, delete, like, and unlike photos and update their avatar. This project connects both frontend and backend and is deployed into a remote server hosted on Google Cloud.

## Technologies:

HTML
CSS
React.js
Express.js
REST APIs
MongoDB
JWT Authorization
website screenshot


## REST API Endpoints
POST /signup Registers a user<br/>
POST /signin Login a user<br/>
GET /users Get JSON list of all the users<br/>
GET /users/:userId Get a specific user profile with an ID POST /users Create a specific user profile<br/>
PATCH /users/me Update the current user profile<br/>
PATCH /users/me/avatar Update the current user avatar<br/>
GET /cards Get JSON list of all the cards<br/>
POST /cards Create a new card<br/>
DELETE /cards/:cardId Delete a card by the given ID<br/>
PUT /cards/:cardId/likes Update a card by liking it<br/>
DELETE /cards/:cardId/likes Delete a like on the card<br/>


## Links

Repository: https://github.com/qiuhanzhou/react-around-api-full

Website: https://loveali.students.nomoredomainssbs.ru

API: https://api.loveali.students.nomoredomainssbs.ru
