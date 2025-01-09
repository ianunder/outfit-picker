package com.example.OutfitPicker.user;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

private final JdbcClient db;

public UserRepository(JdbcClient db){
    this.db = db;
}

public List<User> findAll(){

    return db.sql("select * from users").query(User.class).list();
}

public Optional<User> findById(Integer id){

    return db.sql("select id, uname from users where id = :id").param("id",id).query(User.class).optional();
}

public User createUser(String uname){

    int affectedRows = db.sql("insert into users (uname, password) values ('uname1', 'password')").update();
    Assert.state(affectedRows == 1, "Failed to save user to database: " + uname);
    return new User(1,uname);
}

public void deleteById(Integer id){

    int affectedRows = db.sql("delete from users where id = :id").param("id", id).update();
    Assert.state(affectedRows == 1, "Failed to delete user with id: " + id);
}

}
