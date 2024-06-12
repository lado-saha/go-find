package com.poo.gofind.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poo.gofind.model.Item;
import com.poo.gofind.repository.ItemRepository;

import java.util.*;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public long countObjets() {
        return itemRepository.count();
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public Item saveObjet(Item objet) {
        return itemRepository.save(objet);
    }

    public Item getObjetById(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Objet not found"));
    }

    public void deleteObjet(Long id) {
        itemRepository.deleteById(id);
    }

    public Page<Item> searchItems(String name, String brand, String serialNumber, String model, Pageable pageable) {
        return itemRepository.findByNameContainingOrBrandContainingOrSerialNumberContainingOrModelContaining(
                name != null ? name : "",
                brand != null ? brand : "",
                serialNumber != null ? serialNumber : "",
                model != null ? model : "",
                pageable);
    }

    public Page<Item> findAll(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }

}