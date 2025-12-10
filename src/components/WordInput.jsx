import { useState } from 'react';

function WordInput( {onSubmit, buttonText}) {

    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(input);
        setInput(''); // clear input form
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
                {buttonText}
            </button>
        </form>
    )
}

export default WordInput; 