import {useMutation, useQuery} from "@apollo/client"
import {ALL_AUTHORS, EDIT_AUTHOR} from './queries'
import {useState} from "react";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
    const [name, setName] = useState('')
    const [year, setYear] = useState('')

    const [ editAuthor ] = useMutation(EDIT_AUTHOR,{
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

  if (!props.show) {
    return null
  }

  if (result .loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

    const authorOptions = authors.map(a => ({value: a.name, label: a.name}))

    const submitNewBirthyear = async (event) => {
        event.preventDefault()
        const yearInt = parseInt(year)
        const authorName = name.value
        editAuthor({variables: {name: authorName, setBornTo: yearInt}})
        setName('')
        setYear('')
    }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submitNewBirthyear}>
          <div>
              <Select default={name} onChange={setName} options={authorOptions}/>
          </div>
          <div>
              born
              <input
                  type="number"
                  value={year}
                  onChange={({ target }) => setYear(target.value)}
              />
          </div>
          <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
