import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Create.css';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState("Franek Sinaturz");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, author, body};

        setIsPending(true);

        fetch('http://localhost:8080/api/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog created');
            setIsPending(false);
            navigate('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
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
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Adding blog...</button>}
            </form>
        </div>
    );
}
 
export default Create;