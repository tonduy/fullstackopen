import {useState} from 'react'

const Header = ({header}) => <h2>{header}</h2>

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const Statistics = (props) => {
    let collectedFeedbackCounter = props.good + props.neutral + props.bad
    let average = ((props.good * 1) + (props.bad * -1)) / collectedFeedbackCounter
    let positive = (props.good / collectedFeedbackCounter) * 100

    if (collectedFeedbackCounter !== 0) {
        return (
            <table>
                <tbody>
                <StatisticLine text='good' value={props.good}/>
                <StatisticLine text='neutral' value={props.neutral}/>
                <StatisticLine text='bad' value={props.bad}/>
                <StatisticLine text='all' value={collectedFeedbackCounter}/>
                <StatisticLine text='average' value={average}/>
                <StatisticLine text='positive' value={positive}/>
                </tbody>
            </table>
        )
    }
    return (
        <div>
            No feedback given
        </div>
    )
}

const StatisticLine = (props) => {
    if (props.text === 'positive') {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value} %</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = good => {
        setGood(good)
    }

    const setToNeutral = neutral => {
        setNeutral(neutral)
    }
    const setToBad = bad => {
        setBad(bad)
    }

    return (
        <div>
            <Header header='give feedback'/>
            <Button handleClick={() => setToGood(good + 1)} text='good'/>
            <Button handleClick={() => setToNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={() => setToBad(bad + 1)} text='bad'/>

            <Header header='statistics'/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App