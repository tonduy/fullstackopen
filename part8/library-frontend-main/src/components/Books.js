import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "./queries";
import {useState} from "react";

const Books = ({show}) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS , {
    variables: {genre: genre || null}
  })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }


  const books = result.data ? result.data.allBooks : [];

  const allGenres = Array.from(
      new Set(books.flatMap((book) => book.genres))
  )

  async function handleGenreClick(genre) {
    setGenre(genre)
    await result.refetch()
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}

        </tbody>
      </table>

      <div>
          {allGenres.map((genre, index) => (
              <button key={index} onClick={() => handleGenreClick(genre)}>
                {genre}
              </button>
          ))}
        <button onClick={() => handleGenreClick(null)}>all genres</button>
      </div>
      
    </div>
  )
}

export default Books
