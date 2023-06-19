# Documentation du site de jeux Blind Test - Version en local avec récupération de vidéos YouTube

  

## Introduction :

Le site de jeux Blindtest est un jeu en ligne interactif qui se joue en local. Il utilise les technologies PHP, JavaScript, HTML et CSS, avec l'utilisation de Bootstrap pour faciliter la mise en page et la conception responsive du site. Le serveur WAMP avec PHPMyAdmin est utilisé pour la gestion de la base de données. Ce document fournit une description complète des fonctionnalités du site, y compris la création de playlists, la gestion des musiques avec récupération de vidéos YouTube et le déroulement des parties avec attribution manuelle des points.

  

## 1. Création de playlistes :

- Avant chaque partie, les joueurs peuvent créer une playliste en donnant un nom à celle-ci.

- Les informations de la playliste, telles que son nom et les noms des joueurs, sont stockées en utilisant PHPMyAdmin.

  

## 2. Gestion des musiques avec récupération de vidéos YouTube :

- Les joueurs peuvent ajouter des musiques à la playliste choisie pour la partie en cours.

- Les informations des musiques (titre, artiste) sont entrées manuellement, mais l'URL YouTube de la vidéo correspondante est également fournie.

- Le site utilise l'API YouTube pour récupérer et afficher la vidéo de la musique à partir de l'URL YouTube.

- Les musiques peuvent être supprimées de la playliste si nécessaire.

  

## 3. Déroulement d'une partie :

- Les joueurs se rassemblent et entrent leurs noms avant de commencer la partie.

- Un joueur est désigné comme le maître du jeu, chargé de jouer les musiques de la playliste.

- Le maître du jeu sélectionne une musique de la playliste, et la vidéo YouTube correspondante est affichée pour tous les joueurs.

- Les autres joueurs doivent deviner le titre ou l'artiste de la musique en se basant sur la vidéo YouTube.

- Après chaque musique, le maître du jeu attribuera manuellement les points aux joueurs en fonction de leurs réponses correctes.

- Les scores des joueurs sont mis à jour et affichés à l'écran.

  

## 4. Fin de la partie :

- La partie se poursuit avec la lecture des musiques suivantes jusqu'à ce que toutes les musiques de la playliste aient été jouées.

- À la fin de la partie, un classement des joueurs est affiché en fonction de leurs scores totaux.

- Les scores peuvent être réinitialisés pour démarrer une nouvelle partie avec une autre playliste.

  

## Conclusion :

Le site de jeux Blind Test en version locale offre une expérience interactive et amusante aux joueurs qui souhaitent organiser des parties de blindtest. En utilisant les technologies PHP, JavaScript, HTML et CSS, avec l'apport de Bootstrap pour une interface utilisateur réactive, le site permet aux joueurs de créer des playlistes, de gérer les musiques avec récupération de vidéos YouTube, et de jouer des parties avec attribution manuelle des points. La récupération des vidéos YouTube enrichit l'expérience en fournissant une référence visuelle pour les musiques. L'utilisation du serveur WAMP avec PHPMyAdmin facilite la gestion de la base de données pour stocker les informations des playlistes et des joueurs.
