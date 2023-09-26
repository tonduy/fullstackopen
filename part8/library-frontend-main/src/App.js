import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {useApolloClient} from "@apollo/client";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import BooksRecommendView from "./components/BooksRecommendView";

const App = () => {
  const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <div>
                <Notify errorMessage={errorMessage} />
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('login')}>login</button>


                <Authors setError={notify} show={page === 'authors'} />

                <Books show={page === 'books'} />
                <LoginForm
                    show={page === 'login'}
                    setToken={setToken}
                    setError={notify}
                />
            </div>
        )
    }

  return (
    <div>
      <div>
          <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('booksRecommendView')}>recommend</button>
          <button onClick={logout}>logout</button>
      </div>

      <Authors setError={notify} show={page === 'authors'} showEditAuthor={true} />

      <Books show={page === 'books'} />

      <NewBook setError={notify} show={page === 'add'} />

        <BooksRecommendView show={page === 'booksRecommendView'} />
    </div>
  )
}

export default App
