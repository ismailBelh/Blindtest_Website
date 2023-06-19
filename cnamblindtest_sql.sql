-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 19 juin 2023 à 20:46
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cnamblindtest_sql`
--

-- --------------------------------------------------------

--
-- Structure de la table `musique`
--

DROP TABLE IF EXISTS `musique`;
CREATE TABLE IF NOT EXISTS `musique` (
  `pl_id` int NOT NULL,
  `song_source` varchar(255) DEFAULT NULL,
  `song_artiste` varchar(255) DEFAULT NULL,
  `song_titre` varchar(255) NOT NULL,
  `song_lien` varchar(255) CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  PRIMARY KEY (`pl_id`,`song_lien`),
  UNIQUE KEY `pl_id_song_lien` (`pl_id`,`song_lien`),
  KEY `song_lien` (`song_lien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `musique`
--

INSERT INTO `musique` (`pl_id`, `song_source`, `song_artiste`, `song_titre`, `song_lien`) VALUES
(1, 'Violet Evergarden', ' Horie Shota', 'Sincerely', 'https://www.youtube.com/watch?v=Fc-XPJE3oeM'),
(1, 'Demon Slayer', 'Aimer', 'Zankô Sanka', 'https://www.youtube.com/watch?v=gdpDTu4EIUk'),
(1, 'Chainsaw Man', 'Kenshi Yonezu', 'Kickback', 'https://www.youtube.com/watch?v=M2cckDmNLMI?t=11'),
(1, 'Oshi no Ko', 'YOASOBI', 'Idol', 'https://youtu.be/ZRtdQ81jPUQ?t=11');

-- --------------------------------------------------------

--
-- Structure de la table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
CREATE TABLE IF NOT EXISTS `playlist` (
  `pl_id` int NOT NULL AUTO_INCREMENT,
  `pl_nom` varchar(255) DEFAULT NULL,
  `pl_dispo` int DEFAULT NULL,
  `usr_id` int NOT NULL,
  PRIMARY KEY (`pl_id`),
  UNIQUE KEY `pl_id` (`pl_id`),
  KEY `usr_id` (`usr_id`),
  KEY `usr_id_2` (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `playlist`
--

INSERT INTO `playlist` (`pl_id`, `pl_nom`, `pl_dispo`, `usr_id`) VALUES
(1, 'MaPlaylistTest', 1, 14),
(3, 'NouvellePlaylist', 1, 14),
(4, 'MaNouvellePlaylist', 1, 14);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_is_admin` int NOT NULL,
  `usr_nom` varchar(255) DEFAULT NULL,
  `usr_email` varchar(255) DEFAULT NULL,
  `usr_mdp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`usr_id`, `usr_is_admin`, `usr_nom`, `usr_email`, `usr_mdp`) VALUES
(14, 1, 'test', 'test@est.st', 'test'),
(15, 0, 't', 't@t.t', 't'),
(16, 0, 'r', 'r@r.r', 'r'),
(17, 0, 'yeah', 'yo@yi.yu', 'y');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
