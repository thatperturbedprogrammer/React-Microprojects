function getRandomId(max) {
  return Math.floor(Math.random() * max);
}

function getRandomQuote(data, randomId) {
  return data.find((quote) => quote.id === randomId);
}

export { getRandomId, getRandomQuote };
