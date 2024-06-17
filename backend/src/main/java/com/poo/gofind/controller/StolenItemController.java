package com.poo.gofind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poo.gofind.model.StolenItem;
import com.poo.gofind.service.ItemService;

import java.util.*;

@RestController
@RequestMapping("/api/stolen-items")
public class StolenItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<StolenItem> createObjet(@RequestBody StolenItem objet) {
        StolenItem savedObjet = itemService.saveObjet(objet);
        return new ResponseEntity<>(savedObjet, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StolenItem> getObjetById(@PathVariable Long id) {
        StolenItem objet = itemService.getObjetById(id);
        return new ResponseEntity<>(objet, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StolenItem> updateObjet(@PathVariable Long id, @RequestBody StolenItem objet) {
        objet.setId(id);
        StolenItem updatedObjet = itemService.saveObjet(objet);
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

    // @GetMapping
    // public ResponseEntity<Page<StolenItem>> searchItems(
    // @RequestParam(required = false) String name,
    // @RequestParam(required = false) String brand,
    // @RequestParam(required = false) String serialNumber,
    // @RequestParam(required = false) String model,
    // @RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "10") int size) {

    // Pageable pageable = PageRequest.of(page, size);

    // if ((name == null || name.isEmpty()) &&
    // (brand == null || brand.isEmpty()) &&
    // (serialNumber == null || serialNumber.isEmpty()) &&
    // (model == null || model.isEmpty())) {
    // Page<StolenItem> items = itemService.findAll(pageable);
    // return new ResponseEntity<>(items, HttpStatus.OK);
    // }

    // Page<StolenItem> items = itemService.searchItems(name, brand, serialNumber,
    // model, pageable);
    // return new ResponseEntity<>(items, HttpStatus.OK);
    // }
    // }
}