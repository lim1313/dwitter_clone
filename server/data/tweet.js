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

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter(tweet => tweet.username);
}

export async function getById(id) {
  return tweets.find(t => t.id === id);
}

export async function create(text, username, name) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find(t => t.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter(t => t.id !== id);
}
