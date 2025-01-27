package com.example.OutfitPicker.Outfit;

import jakarta.persistence.*;
import lombok.Data;


    @Entity
    @Data
    public class Outfit {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String description;
        private Long hatId;
        private Long topId;
        private Long bottomId;
        private Long shoesId;
        private Long uid;


        public Outfit(String name, String description, Long hatId, Long topId, Long bottomId, Long shoesId, Long uid) {
            this.name = name;
            this.description = description;
            this.hatId = hatId;
            this.topId = topId;
            this.bottomId = bottomId;
            this.shoesId = shoesId;
            this.uid = uid;
        }

        public Outfit() {

        }
    }
