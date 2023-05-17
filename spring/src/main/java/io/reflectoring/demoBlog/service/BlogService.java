package io.reflectoring.demoBlog.service;

import io.reflectoring.demoBlog.model.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogService {

    List<Blog> findAll();
    Optional<Blog> findOne(int id);
    int saveBlog(Blog blog);
    int deleteBlogById(int id);
    Blog updateBlogById(int id, Blog blog);
}
