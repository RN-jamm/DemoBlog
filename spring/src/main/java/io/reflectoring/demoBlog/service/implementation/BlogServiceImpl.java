package io.reflectoring.demoBlog.service.implementation;

import io.reflectoring.demoBlog.model.Blog;
import io.reflectoring.demoBlog.repository.BlogRepository;
import io.reflectoring.demoBlog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    //Initialize Data
    Blog blogOne = new Blog( 0, "Creating a webApp", "Franek Sinaturz", "Still don't know how...");
    Blog blogTwo = new Blog( 1, "Do i wanna know?", "Luigi Star", "Karamba lorem....");
    Blog blogThree = new Blog( 2, "Take me to church", "Joachim Rogacz", "Worship u like a god...");

    @Autowired
    public BlogServiceImpl(@Qualifier("fakeDao") BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
        this.blogRepository.save(blogOne);
        this.blogRepository.save(blogTwo);
        this.blogRepository.save(blogThree);
    }

    @Override
    public List<Blog> findAll() {
        return (List<Blog>) blogRepository.findAll();
    }

    @Override
    public Optional<Blog> findOne(int id) {
        return blogRepository.findById(id);
    }

    @Override
    public int saveBlog(Blog blog) {
        blogRepository.save(blog);
        return 1;
    }

    @Override
    public int deleteBlogById(int id) {
        blogRepository.deleteById(id);
        return 1;
    }

    @Override
    public Blog updateBlogById(int blogId, Blog blog) {
        Blog blogDB = blogRepository.findById(blogId).get();

        if (Objects.nonNull(blog.getTitle()) && !"".equalsIgnoreCase(blog.getTitle())) {
            blogDB.setTitle(blog.getTitle());
        }

        if (Objects.nonNull(blog.getBody()) && !"".equalsIgnoreCase(blog.getBody())) {
            blogDB.setBody(blog.getBody());
        }

        if (Objects.nonNull(blog.getAuthor()) && !"".equalsIgnoreCase(blog.getAuthor())) {
            blogDB.setAuthor(blog.getAuthor());
        }

        return blogRepository.save(blogDB);
    }
}
