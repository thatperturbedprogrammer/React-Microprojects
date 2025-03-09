import { useState } from "react";
import "./App.css";
import data from "./lib/data";
import { getRandomId, getRandomQuote } from "./lib/helpers";

export default function App() {
  let randomId = getRandomId(data.length);
  let initialQuote = getRandomQuote(data, randomId);

  const [quote, setQuote] = useState(initialQuote);

  function handleQuoteChangeClick() {
    randomId = getRandomId(data.length);
    setQuote(getRandomQuote(data, randomId));
  }

  return (
    <>
      <div id="quote-box">
        {/* quotes */}
        <img
          id="#quote-icon"
          src="/public/quote.png"
          alt="quote-icon"
          width={40}
        />
        <p id="text">{quote.text}</p>
        <p id="author"> - {quote.author}</p>

        {/* icons */}
        <div class="share-icons">
          <a id="tweet-quote" href="https://twitter.com/intent/tweet">
            <img src="/public/twitter-icon.svg" alt="twitter-icon" width={30} />
          </a>
          <a id="facebook-quote" href="https://facebook.com/sharer/sharer.php">
            <img
              src="/public/facebook-icon.svg"
              alt="facebook-icon"
              width={30}
            />
          </a>
        </div>

        {/* button */}
        <button id="new-quote" onClick={handleQuoteChangeClick}>
          New Quote
        </button>
      </div>
    </>
  );
}
