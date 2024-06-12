package com.poo.gofind.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poo.gofind.model.Photo;
import com.poo.gofind.repository.PhotoRepository;

import java.util.List;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    public long countPhotos() {
        return photoRepository.count();
    }

    public Page<Photo> findAll(Pageable pageable) {
        return photoRepository.findAll(pageable);
    }

    public List<Photo> findAll() {
        return photoRepository.findAll();
    }

    public Photo savePhoto(Photo photo) {
        return photoRepository.save(photo);
    }

    public Photo getPhotoById(Long id) {
        return photoRepository.findById(id).orElseThrow(() -> new RuntimeException("Photo not found"));
    }

    public void deletePhoto(Long id) {
        photoRepository.deleteById(id);
    }
}
