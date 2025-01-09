-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema outfit-picker
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema outfit-picker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `outfit-picker` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `outfit-picker` ;

-- -----------------------------------------------------
-- Table `outfit-picker`.`clothing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `outfit-picker`.`clothing` (
                                                          `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                                                          `name` VARCHAR(255) NOT NULL,
    `color` VARCHAR(100) NULL DEFAULT NULL,
    `image_file_path` VARCHAR(255) NULL DEFAULT NULL,
    `clothing_type` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id` (`id` ASC) VISIBLE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `outfit-picker`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `outfit-picker`.`users` (
                                                       `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                                                       `uname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id` (`id` ASC) VISIBLE)
    ENGINE = InnoDB
    AUTO_INCREMENT = 4
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
