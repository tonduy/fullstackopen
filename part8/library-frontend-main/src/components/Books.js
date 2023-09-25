import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "./queries";
import {useState} from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null);

  if (!props.show) {
    return null
  }

  if (result .loading) {
    return <div>loading...</div>
  }


  const books = result.data.allBooks

  const allGenres = Array.from(
      new Set(books.flatMap((book) => book.genres))
  )

  const filteredBooks = genre
      ? books.filter((book) => book.genres.includes(genre))
      : books

  function handleGenreClick(genre) {
    setGenre(genre);
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
          {filteredBooks.map((a) => (
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
