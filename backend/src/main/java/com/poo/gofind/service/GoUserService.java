package com.poo.gofind.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poo.gofind.model.GoUser;
import com.poo.gofind.model.Photo;
import com.poo.gofind.repository.GoUserRepository;
import com.poo.gofind.repository.PhotoRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class GoUserService {
  @Autowired
  private EntityManager entityManager;

  @Autowired
  private GoUserRepository userRepository;
  @Autowired
  private PhotoRepository photoRepository;

  public long countUsers() {
    return userRepository.count();
  }

  public Page<GoUser> findAll(Pageable pageable) {
    return userRepository.findAll(pageable);
  }

  public List<GoUser> findAll() {
    return userRepository.findAll();
  }

  @Transactional
  public GoUser saveUser(GoUser user) {
    System.out.println("Got the user " + user);

    Photo newPhoto;
    System.out.println("Got the photo" + user.getPhoto());

    if (user.getPhoto() != null) {
      newPhoto = photoRepository.save(user.getPhoto());
      System.out.println("Saved the photo " + newPhoto);
      user.setPhoto(newPhoto);
    }

    System.out.println("Saved the user");
    userRepository.save(user);

    return user;
  }

  public GoUser getUserById(String id) {
    return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
  }

  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  public GoUser findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public Page<GoUser> searchUsers(String name, String email, String phone, Pageable pageable) {
    return userRepository.findByNameIgnoreCaseContainingOrEmailIgnoreCaseContainingOrPhoneIgnoreCaseContaining(
      name != null ? name : "",
      email != null ? email : "",
      phone != null ? phone : "",
      pageable);
  }
}
