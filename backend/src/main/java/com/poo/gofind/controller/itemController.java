package com.poo.gofind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poo.gofind.model.Item;
import com.poo.gofind.service.ItemService;

import java.util.*;

@RestController
@RequestMapping("/api/items")
public class itemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<Item> createObjet(@RequestBody Item objet) {
        Item savedObjet = itemService.saveObjet(objet);
        return new ResponseEntity<>(savedObjet, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getObjetById(@PathVariable Long id) {
        Item objet = itemService.getObjetById(id);
        return new ResponseEntity<>(objet, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateObjet(@PathVariable Long id, @RequestBody Item objet) {
        objet.setId(id);
        Item updatedObjet = itemService.saveObjet(objet);
        return new ResponseEntity<>(updatedObjet, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countObjets() {
        long count = itemService.countObjets();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteObjet(@PathVariable Long id) {
        itemService.deleteObjet(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<Page<Item>> searchItems(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String serialNumber,
            @RequestParam(required = false) String model,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        if ((name == null || name.isEmpty()) &&
                (brand == null || brand.isEmpty()) &&
                (serialNumber == null || serialNumber.isEmpty()) &&
                (model == null || model.isEmpty())) {
            Page<Item> items = itemService.findAll(pageable);
            return new ResponseEntity<>(items, HttpStatus.OK);
        }

        Page<Item> items = itemService.searchItems(name, brand, serialNumber, model, pageable);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}
