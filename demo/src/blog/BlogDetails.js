import { useParams, useNavigate, Link } from 'react-router-dom';
import useFetch from './useFetch';
import '../css/BlogDetails.css';

const BlogDetails = () => {
    const { id } = useParams();
    const getBlogDetailsURL = `http://localhost:8080/api/blogs/${id}`;
    const {data: blogDetails, isPending, error} = useFetch(getBlogDetailsURL);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/blogs/${blogDetails.id}`, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        })
    }
    
    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blogDetails && (
                <article>
                    <h2>{blogDetails.title}</h2>
                    <p>Written by {blogDetails.author}</p>
                    <div>{blogDetails.body}</div>
                    <button onClick={handleDelete}>delete</button>
                    <Link to={`/update/${id}`}>
                        <label>change</label>
                    </Link>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;