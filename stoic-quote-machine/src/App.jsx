import { useEffect, useState } from "react";
import "./App.css";
import stoicquotes from "./lib/stoic-quotes";

export default function App() {
  const [index, setIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    let interval;
    if (isCycling) {
      interval = setInterval(() => {
        setIndex((prevIndex) => {
          prevIndex < stoicquotes.length - 1 ? prevIndex + 1 : 0;
          setIsExpanded(false);
        }); // Loop back to first quote
      }, 5000);
    }

    return () => clearInterval(interval); // Cleanup interval on stop/unmount
  }, [isCycling]);

  function handleStartPauseClick() {
    setIsCycling((prev) => !prev); // Toggle cycling state
  }
  function handleNextQuoteClick() {
    setIndex((prevIndex) => {
      const nextIndex = prevIndex < stoicquotes.length - 1 ? prevIndex + 1 : 0;
      setIsExpanded(false); // Reset expanded state when switching quotes manually
      return nextIndex;
    });
  }
  function toggleExpand() {
    setIsExpanded((prev) => !prev);
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
        />{" "}
        <p id="text" className={isExpanded ? "show-full" : ""}>
          {stoicquotes[index].text}
        </p>
        {stoicquotes[index].text.length > 200 && (
          <span id="read-more" onClick={toggleExpand}>
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        )}
        <p id="author"> - {stoicquotes[index].author}</p>
        {/* icons */}
        <div class="share-icons">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${stoicquotes[index].text}" - ${stoicquotes[index].author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/public/twitter-icon.svg" alt="twitter-icon" width={30} />
          </a>
          <a
            id="facebook-quote"
            href={`https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com&quote=${encodeURIComponent(
              stoicquotes[index].text
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/public/facebook-icon.svg"
              alt="facebook-icon"
              width={30}
            />
          </a>
        </div>
        {/* Buttons */}
        <button
          className="new-quote"
          id="start-pause"
          onClick={handleStartPauseClick}
        >
          {isCycling ? "Pause" : "Start Cycling"}
        </button>
        <button
          className="new-quote"
          id="next-quote"
          onClick={handleNextQuoteClick}
          disabled={isCycling}
        >
          Next Quote
        </button>
      </div>
    </>
  );
}
