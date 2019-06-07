const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const Twitter = require("twitter-node-client").Twitter;
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/twitter", (request, response) => {
  console.log(request.query.string);
  response.send("POTATO RECEIVED");
});

// create route to get single book by its isbn
app.get("/books/:isbn", (request, response) => {
  // make api call using fetch
  fetch(
    `http://openlibrary.org/api/books?bibkeys=ISBN:${
      request.params.isbn
    }&format=json&jscmd=data`
  )
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      console.log(results); // logs to server
      response.send(results); // sends to frontend
    });
});

// create a search route
app.get("/search", (request, response) => {
  fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      console.log(results);
      response.send(results);
    });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
