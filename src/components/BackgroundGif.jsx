import { useState, useEffect } from "react";

export default function BackgroundGif({ visible, gifChange, isBright}) {
  const [index, setIndex] = useState(0);
  const [shuffledArr, setShuffledArr] = useState([]);

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const GIFS = [
    "/tenor.gif",
    "/tenor2.gif",
    "/tenor3.gif",
    "/tenor4.gif",
    "/tenor5.gif",
    "/tenor6.gif",
    "/universe-star.gif",
    "/vintage-mood.gif",
  ];

  useEffect(() => {
    setShuffledArr(shuffleArray(GIFS));
  }, []);

  useEffect(() => {
    if (!shuffledArr.length) return;

    setIndex(prev => (prev + 1) % shuffledArr.length);
  }, [gifChange, shuffledArr]);

  if (!shuffledArr.length) return null;

  return (
    <img
      src={shuffledArr[index]}
      alt="background-gif"
      className={`fixed inset-0 h-screen w-screen transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }
      ${isBright ? "brightness-100" : "brightness-50"}`}
    />
  );
}
