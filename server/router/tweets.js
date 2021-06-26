import express from "express";
import "express-async-errors";

let tweets = [
  {
    id: "1",
    text: "nice day",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "",
  },
  {
    id: "2",
    text: "hellloooo",
    createdAt: Date.now().toString(),
    name: "ellie",
    username: "ellie",
    url: "",
  },
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username ? tweets.filter(t => t.username === username) : tweets;
  res.status(200).json(data);
});

// GET /tweets/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tweet = tweets.find(t => t.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    //  res.sendStatus(404);
    res.status(404).json({ message: `Tweet id ${id} not found` });
  }
});

// POST /tweets
router.post("/", (req, res, next) => {
  const { text, username, name } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find(t => t.id === id);
  if (text) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id ${id} not found` });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter(t => t.id !== id);
  res.sendStatus(204);
});

export default router;
