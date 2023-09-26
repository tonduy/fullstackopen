import {useQuery} from "@apollo/client";
import {ALL_BOOKS, CURRENT_USER} from "./queries";

const BooksRecommendView = ({show}) => {
    const currentUser = useQuery(CURRENT_USER)

    const bookResult = useQuery(ALL_BOOKS, {
        variables: {genre: currentUser.data?.me.favoriteGenre.toString()}
    })

    if (!show){
        return null
    }

    if (bookResult.loading) {
        return <div>loading...</div>
    }


    const books = bookResult.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre <b>{currentUser.data?.me.favoriteGenre.toString()}</b>

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

        </div>
    )
}

export default BooksRecommendView
