package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {

    @Query("SELECT b FROM Book b WHERE CONCAT(b.title, ' ', b.author, ' ', b.genre, ' ', b.status)  LIKE %?1%")
    public Page<Book> search(Pageable pageable, String searchString);

}
