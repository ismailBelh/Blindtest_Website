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

## 5. Installation sur un nouveau serveur ou une nouvelle base de données :

Si vous souhaitez installer le site de jeux Blind Test sur un nouveau serveur ou une nouvelle base de données, voici les éléments à prendre en compte :

Configuration du serveur : Assurez-vous que le nouveau serveur est compatible avec les technologies utilisées par le site, notamment PHP, JavaScript, HTML et CSS. Vérifiez les prérequis et les versions requises pour ces technologies.

Transfert des fichiers : Copiez tous les fichiers du site, y compris les fichiers PHP, JavaScript, HTML et CSS, sur le nouveau serveur. Veillez à conserver la structure des dossiers et des fichiers.

Base de données : Créez une nouvelle base de données sur le nouveau serveur et importez les tables et les données de cnamblindtest_sql.sql. Vous pouvez utiliser des outils tels que PHPMyAdmin pour faciliter ce processus.

Accès au CRUD : Seul les administrateurs ont accès au CRUD. Le premier administrateur doit être mis admin à la création de la base de donné. Par défaut tous les nouveaux utilisateurs ne sont pas administrateur, mais les droits peuvent leur être donner à partir du CRUD. Pour accéder au CRUD voici le lien à suivre: votreSite.com/Views/crud.html

Configuration de la connexion à la base de données : Modifiez les informations de connexion à la base de données dans le code du site pour refléter les nouvelles informations de la base de données (nom de l'hôte, nom de la base de données, nom d'utilisateur et mot de passe).

Vérification des dépendances : Assurez-vous que toutes les dépendances nécessaires au bon fonctionnement du site (par exemple, Bootstrap) sont présentes sur le nouveau serveur. Le cas échéant, téléchargez et configurez ces dépendances.

Tests et débogage : Une fois l'installation terminée, effectuez des tests exhaustifs pour vous assurer que le site fonctionne correctement sur le nouveau serveur. Vérifiez que toutes les fonctionnalités, y compris la création de playlistes, la gestion des musiques et le déroulement des parties, sont opérationnelles.

Références externes : Si le site utilise des services externes, tels que l'API YouTube, assurez-vous de mettre à jour les clés d'API ou les configurations nécessaires pour que ces services fonctionnent correctement sur le nouveau serveur.

En suivant ces étapes et en effectuant les ajustements nécessaires, vous devriez pouvoir installer le site de jeux Blind Test sur un nouveau serveur ou une nouvelle base de données sans problème.

## Conclusion :

Le site de jeux Blind Test en version locale offre une expérience interactive et amusante aux joueurs qui souhaitent organiser des parties de blindtest. En utilisant les technologies PHP, JavaScript, HTML et CSS, avec l'apport de Bootstrap pour une interface utilisateur réactive, le site permet aux joueurs de créer des playlistes, de gérer les musiques avec récupération de vidéos YouTube, et de jouer des parties avec attribution manuelle des points. La récupération des vidéos YouTube enrichit l'expérience en fournissant une référence visuelle pour les musiques. L'utilisation du serveur WAMP avec PHPMyAdmin facilite la gestion de la base de données pour stocker les informations des playlistes et des joueurs.
