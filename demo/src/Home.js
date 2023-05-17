import BlogList from './blog/BlogList';
import useFetch from './blog/useFetch';

const Home = () => {
    const pageTitle = "All Blogs..";
    const getBlogsURL = 'http://localhost:8080/api/blogs';
    const{data: blogs, isPending, error} = useFetch(getBlogsURL);
    
    return ( 
        <div className="home">
            {/* showing message of error */}
            {error && <div> {error} </div>}
            {/* isPending waits for data to download etc.
            While isPending is true it shows something
            In this case "Loading..." */}
            { isPending && <div>Loading...</div> }

            {/* If blogs is null then it stops because of and 
            BUT if blogs is there then it outputs data
            Big brain time */}
            {blogs && <BlogList blogs={blogs} title={pageTitle}/>}
            {blogs && <BlogList blogs={blogs.filter((blog) =>
                blog.author === 'Franek Sinaturz')} 
                title="Franek Blogs"/>}
        </div>
    );
}
 
export default Home;