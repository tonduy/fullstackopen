import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteReducer";
import {pushNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        let filter = state.filter
        if (filter !== ''){
            let filteredAnecdotes = state.anecdotes.filter(anecdote => {
                return anecdote.content.toLowerCase().includes(filter.toLowerCase())
            })
            return filteredAnecdotes
        }
        return state.anecdotes


    })
    const dispatch = useDispatch()

    const vote = (content) => {
        console.log('vote', content)
        dispatch(voteAnecdote(content))
        dispatch(pushNotification('you voted: ' + content.content, 5));
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList