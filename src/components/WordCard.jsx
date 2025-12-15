

function WordCard( { word, visibility } ) {

    return (
    <div className="card">
        {visibility && <p>{word}</p>}
    </div>
    )
}

export default WordCard;