package com.poo.gofind.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poo.gofind.model.GoUser;
import com.poo.gofind.repository.GoUserRepository;

@Service
public class GoUserService {

    @Autowired
    private GoUserRepository userRepository;

    public long countUsers() {
        return userRepository.count();
    }

    public Page<GoUser> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public List<GoUser> findAll() {
        return userRepository.findAll();
    }

    public GoUser saveUser(GoUser user) {
        return userRepository.save(user);
    }

    public GoUser getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public GoUser findByEmail(String email){
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
