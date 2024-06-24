import { useState } from "react"

const BlogForm = ({handleBlogSubmission}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title:title,
            author:author,
            url:url
        }

        setTitle('')
        setAuthor('')
        setUrl('')

        handleBlogSubmission(newBlog)
    }

    return (
    <div>
      <h2>create new Blog</h2>
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    text="text"
                    value={title}
                    name="title"
                    onChange = { ({ target }) => setTitle(target.value) }
                />
            </div>

            <div>
                author
                <input
                    text="text"
                    value={author}
                    name="author"
                    onChange = { ({ target }) => setAuthor(target.value) }
                />
            </div>

            <div>
                url
                <input
                    text="text"
                    value={url}
                    name="url"
                    onChange = { ({ target }) => setUrl(target.value) }
                />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
    )
}

export default BlogForm