import * as tweetsRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetsRepository.getAllByUsername(username)
    : tweetsRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetsRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    //  res.sendStatus(404);
    res.status(404).json({ message: `Tweet id ${id} not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text, username, name } = req.body;
  const tweet = await tweetsRepository.create(text, username, name);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetsRepository.update(id, text);
  if (text) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id ${id} not found` });
  }
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  await tweetsRepository.remove(id);
  res.sendStatus(204);
}
