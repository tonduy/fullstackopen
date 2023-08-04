import {useDispatch, useSelector} from "react-redux";
import {toggleVoteOf} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

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

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(toggleVoteOf(id))
        dispatch(setNotification('you voted: ' + content));
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList