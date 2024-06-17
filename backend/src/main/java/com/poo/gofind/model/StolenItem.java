package com.poo.gofind.model;

import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
public class StolenItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String serialNumber;
  private String name;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "photo_id")
  private List<Photo> photos;

  private String description;
  private String brand;
  private String model;
  private boolean isStolen;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "stolen_item_tags", joinColumns = @JoinColumn(name = "stolen_item_id"), inverseJoinColumns = @JoinColumn(name = "search_tag_id"))
  private Set<SearchTag> tags = new HashSet<>();

  @ManyToOne()
  @JoinColumn(name = "owner_id", referencedColumnName = "id")
  private GoUser owner;

  @Column(name = "created_at", updatable = false)
  @CreationTimestamp
  private Date createdAt;

  private LocalDate stolenDate;

  @Column(name = "updated_at")
  @UpdateTimestamp
  private Date updatedAt;

//  @JsonProperty("creatorId")
//  private String creatorId = owner != null ? owner.getId() : null;
}
