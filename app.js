const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
const twitconfig = require("./data/twit_config");
const Twit = require("twit");

const twit = new Twit(twitconfig);

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/twitter", (request, response) => {
  const stream = twit.stream("statuses/filter", {
    track: `${request.query.string}`,
    language: `en`
  });

  stream.on("tweet", tweet => {
    console.log(tweet.text + "\n");
  });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
