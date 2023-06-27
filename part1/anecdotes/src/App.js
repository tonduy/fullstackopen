import {useState} from 'react'

const Header = ({header}) => <h2>{header}</h2>

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const AnecdoteWithMostVotes = (props) => {
    const maxOfVotes = Math.max(...props.votes)
    const anecdoteWithMostVotesIndex = props.votes.indexOf(maxOfVotes)

    if (maxOfVotes !== 0) {
        return (
            <>
                <p> {props.anecdotes[anecdoteWithMostVotesIndex]} </p>
                <p>has {maxOfVotes} votes</p>
            </>
        )
    }

}


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))

    const setToSelected = () => {
        const random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    const setToVoted = () => {
        const updatedVotes = [...votes]
        updatedVotes[selected] += 1
        setVoted(updatedVotes)
    }

    return (
        <div>
            <Header header='Anecdote of the day'/>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <Button handleClick={setToVoted} text='vote'/>
            <Button handleClick={setToSelected} text='next anecdote'/>

            <Header header='Anecdote with most votes'/>
            <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes}/>
        </div>
    )
}

export default App