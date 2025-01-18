package com.example.OutfitPicker.user;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class oldrepo {

private final JdbcClient db;

public oldrepo(JdbcClient db){
    this.db = db;
}

public List<User> findAll(){

    return db.sql("select * from users").query(User.class).list();
}

public Optional<User> findById(Integer id){

    return db.sql("select * from users where id = :id").param("id",id).query(User.class).optional();
}

    public Optional<User> findByUname(String uname){

        return db.sql("select * from users where uname = :uname").param("uname",uname).query(User.class).optional();
    }

public User save(String uname, String password){

    int affectedRows = db.sql("insert into users (uname, password) values (:uname, :password)").param("uname",uname).param("password", password).update();
    Assert.state(affectedRows == 1, "Failed to save user to database: " + uname);
    return new User(uname, password);
}

public void deleteById(Integer id){

    int affectedRows = db.sql("delete from users where id = :id").param("id", id).update();
    Assert.state(affectedRows == 1, "Failed to delete user with id: " + id);
}

}
