package com.poo.gofind.data;

import java.time.ZoneId;
import java.util.Locale;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.github.javafaker.Faker;
import com.poo.gofind.model.StolenItem;
import com.poo.gofind.model.Photo;
import com.poo.gofind.model.GoUser;
import com.poo.gofind.repository.ItemRepository;
import com.poo.gofind.repository.PhotoRepository;
import com.poo.gofind.repository.GoUserRepository;

import jakarta.annotation.PostConstruct;

// @Component
public class DatabaseSeeder {

    @Autowired
    private ItemRepository objetRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private GoUserRepository utilisateurRepository;

    private final Faker faker = new Faker(Locale.ENGLISH);

    @PostConstruct
    @Transactional
    public void seedDatabase() {
        if (objetRepository.count() == 0) {
            IntStream.range(0, 50).forEach(i -> {
                StolenItem objet = new StolenItem();
                objet.setStolen(faker.bool().bool());
                objet.setName(faker.commerce().productName());
                objet.setBrand(faker.company().name());
                objet.setSerialNumber(faker.number().digits(10));
                objet.setModel(faker.commerce().material());
                objet.setDescription(faker.lorem().sentence());
                objetRepository.save(objet);
            });
        }

        // if (photoRepository.count() == 0) {
        //     IntStream.range(0, 20).forEach(i -> {
        //         Photo photo = new Photo();
        //         photo.setUrl(faker.avatar().image());
        //         photoRepository.save(photo);
        //     });
        // }

        if (utilisateurRepository.count() == 0) {
            IntStream.range(0, 10).forEach(i -> {
                GoUser utilisateur = new GoUser();
                utilisateur.setName(faker.name().fullName());
                utilisateur.setEmail(faker.internet().emailAddress());
                utilisateur.setPhone(faker.phoneNumber().phoneNumber());
                utilisateur.setBirthday(
                        faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
                // Assuming you have some logic to assign a photo to utilisateur
                int randPhotoID = (int) faker.number().numberBetween(0, photoRepository.count() - 1);
                // utilisateur.setPhoto(
                //         photoRepository.findAll().get(randPhotoID));
                utilisateurRepository.save(utilisateur);
            });
        }
    }
}
