import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import '../css/Update.css'

const Update = () => {
    const { id } = useParams();
    const getBlogDetailsURL = `http://localhost:8080/api/blogs/${id}`;
    const {data: blogDetails, isPendingFetch, error} = useFetch(getBlogDetailsURL);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('Franek Sinaturz');
    const [body, setBody] = useState('');
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, author, body}

        setIsPendingUpdate(true);
        fetch(`http://localhost:8080/api/blogs/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(() => {
            console.log('Blog updated')
            setIsPendingUpdate(false);
            navigate('/')
        })
    }

    useEffect(() => {
        if (blogDetails) {
            setAuthor(blogDetails.author);
            setTitle(blogDetails.title);
            setBody(blogDetails.body);
        }
    }, [blogDetails]);
    
    return (
        <div className="update">
            <h2>Update page</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label>Blog body:</label>
                <textarea required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}/>
                <label>Blog author:</label>
                <select 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Franek Sinaturz">Franek Sinaturz</option>
                    <option value="Luigi Star">Luigi Star</option>
                    <option value="Joachim Rogacz">Joachim Rogacz</option>
                </select>
                {!isPendingUpdate && <button>Update blog</button>}
                {isPendingUpdate && <button>Updating blog...</button>}
            </form>
        </div>
    );
}
 
export default Update;