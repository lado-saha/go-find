package com.poo.gofind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poo.gofind.model.Photo;
import com.poo.gofind.service.PhotoService;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @PostMapping
    public ResponseEntity<Photo> createPhoto(@RequestBody Photo photo) {
        Photo savedPhoto = photoService.savePhoto(photo);
        return new ResponseEntity<>(savedPhoto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable String id) {
        Photo photo = photoService.getPhotoById(id);
        return new ResponseEntity<>(photo, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Photo> updatePhoto(@PathVariable String id, @RequestBody Photo photo) {
        photo.setId(id);
        Photo updatedPhoto = photoService.savePhoto(photo);
        return new ResponseEntity<>(updatedPhoto, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countPhotos() {
        Long count = photoService.countPhotos();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable String id) {
        photoService.deletePhoto(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Photo>> getAllPhotos() {
        List<Photo> photos = photoService.findAll();
        return new ResponseEntity<>(photos, HttpStatus.OK);
    }
}
