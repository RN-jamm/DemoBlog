package io.reflectoring.demoBlog.api;

import io.reflectoring.demoBlog.model.Blog;
import io.reflectoring.demoBlog.service.implementation.BlogServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BlogController {

    private final BlogServiceImpl blogServiceImpl;

    @Autowired
    public BlogController(BlogServiceImpl blogServiceImpl) {
        this.blogServiceImpl = blogServiceImpl;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogServiceImpl.findAll();
    }

    @GetMapping(path = "{id}")
    public Blog getBlogById(@PathVariable("id") int id) {
        return blogServiceImpl.findOne(id).get();
    }

    @PostMapping()
    public void addBlog(@RequestBody Blog blog) {
        if (!(blog.getAuthor().isBlank() && blog.getBody().isBlank() && blog.getTitle().isBlank())) {
            blogServiceImpl.saveBlog(blog);
        }
    }

    @DeleteMapping(path = "{id}")
    public void deleteBlogById(@PathVariable("id") int id) {
        blogServiceImpl.deleteBlogById(id);
    }

    @PutMapping(path = "{id}")
    public void updateBlogById(@PathVariable("id") int id, @RequestBody Blog blog) {
        blogServiceImpl.updateBlogById(id, blog);
    }
}
