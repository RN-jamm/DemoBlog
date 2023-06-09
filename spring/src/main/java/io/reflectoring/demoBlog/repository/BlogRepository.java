package io.reflectoring.demoBlog.repository;

import io.reflectoring.demoBlog.model.Blog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends CrudRepository<Blog, Integer> {

}
