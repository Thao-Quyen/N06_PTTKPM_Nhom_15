package com.example.restaurant.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menu")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String category;
}
