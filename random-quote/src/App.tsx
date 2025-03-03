import { useState, useEffect } from "react";
import quotes from "./assets/quotes.json";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { fetchRandomImage } from "./api/unsplash";
import "./styles/App.css";

interface Quote {
  quote: string;
  author: string;
}

const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const getRandomColor = (): string => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);

  return `rgb(${red}, ${green}, ${blue})`;
};

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState<Quote>(getRandomQuote());
  const [randomColor, setRandomColor] = useState<string>(getRandomColor());
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchRandomImage("nature");
      if (imageUrl) setBgImage(imageUrl);
    };

    fetchImage();
  }, []);

  const changeQuote = async () => {
    setQuote(getRandomQuote());
    setRandomColor(getRandomColor());

    // Fetch a new image when changing the quote
    const newImage = await fetchRandomImage("nature");
    if (newImage) setBgImage(newImage);
  };

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundColor: randomColor,
        transition,
      }}
    >
      <div id="quote-box">
        <div
          className="quote-content"
          style={{ color: randomColor, transition }}
        >
          <h2 id="text">
            <FaQuoteLeft size="30" style={{ marginRight: "10px" }} />
            {quote.quote}
            <FaQuoteRight size="30" style={{ marginLeft: "10px" }} />
          </h2>
          <h4 id="author">- {quote.author}</h4>
        </div>
        <div className="buttons">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}`}
            id="tweet-quote"
            style={{
              backgroundColor: randomColor,
              marginRight: "10px",
              transition,
            }}
          >
            <FaTwitter color="white" />
          </a>
          <button
            id="new-quote"
            onClick={changeQuote}
            style={{ backgroundColor: randomColor, transition }}
          >
            Change Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
