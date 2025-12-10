import { useState } from 'react'
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

  function hideWord() {
    setTimeout(() => {
      setIsVisible(false)
    }, 3000);
  }

  function randomWord() {
    let randomNumber = Math.floor(Math.random() * wordList.length);
    let utterance = new SpeechSynthesisUtterance(wordList[randomNumber]);
    speechSynthesis.speak(utterance);
    hideWord();
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
