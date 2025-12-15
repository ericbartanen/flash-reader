import { useEffect, useState } from 'react'
import './App.css'
import { wordList } from './wordlist';
import PointsDisplay from './components/PointsDisplay';
import WordInput from './components/WordInput';
import WordCard from './components/WordCard';

function App() {

  const [points, setPoints] = useState(0);
  const [word, setWord] = useState('')
  const [buttonText, setButtonText] = useState('Start!');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (word) {
      // initialise speech utterance 
      const utterance = new SpeechSynthesisUtterance(word);
      
      // speak each new word
      speechSynthesis.speak(utterance);

      // cleanup
      return () => {
        speechSynthesis.cancel();
      };
    }
  }, [word]);

  useEffect(() => {
    if (word) {
      // resets word to visible when new word is generated
      setIsVisible(true)

      // Set timer so word is invisible after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000)

      return () => clearTimeout(timer);
    }
  }, [word]);


  function randomWord() {
    let randomNumber = Math.floor(Math.random() * wordList.length);
    return wordList[randomNumber];
  }

  function handleAnswer(userAnswer) {
      if (buttonText === 'Start!') {
        setWord(randomWord());
        setButtonText('Check Word');
    } else if (userAnswer === word) {
        setPoints(points + 1);
        setWord(randomWord());
    } else {
        setWord(randomWord());
    };
  }

  return (
    <>
      <PointsDisplay points={points}/>

      <WordCard 
        visibility={isVisible}
        word={word}
      />

      <WordInput 
        onSubmit={handleAnswer}
        buttonText={buttonText}
      />

    </>
  )
}

export default App
