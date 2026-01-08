# Product Requirements Document (PRD) - Portfolio "The Studio"
**Agent :** John (Product Manager)
**Statut :** Version 1.0 - Prêt pour Architecture

---

## 1. Goals & Background Context
L'objectif est de transformer un portfolio classique en une expérience immersive de type "Studio de Production". Le site doit affirmer l'identité de "Creative Technologist" de l'auteur en fusionnant ses compétences en développement web (React/Tailwind) et sa passion pour le beatmaking.

---

## 2. Technical Assumptions
- **Frontend :** React.js (pour la réactivité) et Tailwind CSS (pour un design sombre et précis).
- **Animations :** Bibliothèques légères (type Framer Motion) pour garantir une fluidité extrême sans surcharger le GPU.
- **Structure :** Single Page Application (SPA) ou navigation fluide pour permettre une lecture audio ininterrompue.

---

## 3. Requirements

### Exigences Fonctionnelles (FR)
- **FR1 - Hero Immersif :** Une image plein écran de l'auteur en arrière-plan avec une typographie percutante.
- **FR2 - Playlist de Projets :** Les projets ne sont pas des cartes, mais des lignes dans une "playlist" interactive (Nom du projet, Tech stack, Date, Lien).
- **FR3 - Système Audio :** Un sélecteur de morceaux favoris permettant de lancer une ambiance sonore qui perdure durant toute la visite.
- **FR4 - Expérience de Navigation :** Transitions fluides entre les sections pour renforcer l'aspect "professionnel et débrouillard".

### Exigences Non-Fonctionnelles (NFR)
- **NFR1 - Performance :** Score Lighthouse > 90 sur le chargement initial.
- **NFR2 - Fluidité :** Animations limitées à 60 FPS pour éviter toute latence visuelle.
- **NFR3 - Mobile First :** L'univers "Studio" doit rester cohérent et utilisable sur smartphone.

---

## 4. Epic List

### Epic 1 : Core Experience & Studio UI
Mise en place de l'ossature sombre du site.
- **Story 1.1 :** Intégration du Layout "Dark Studio" (Tailwind configuration).
- **Story 1.2 :** Développement du Hero Section avec image plein écran.
- **Story 1.3 :** Système de navigation fluide (Smooth Scroll ou transitions de pages).

### Epic 2 : Showcase "The Tracklist" (Projets)
Présentation des travaux sous forme de liste de lecture.
- **Story 2.1 :** Composant "Project Row" (ligne de playlist) interactif au survol.
- **Story 2.2 :** Détail des projets (Description, liens GitHub/Live) intégré à la liste.

### Epic 3 : Audio Atmosphere Player
L'élément différenciateur lié au beatmaking.
- **Story 3.1 :** Intégration d'un lecteur audio minimaliste (Play/Pause/Next).
- **Story 3.2 :** Création de la liste de lecture "Favoris" (JSON data).
- **Story 3.3 :** Gestion de la persistance audio lors de la navigation.

### Epic 4 : Credentials & Contact
La partie administrative et formelle du portfolio.
- **Story 4.1 :** Section "About" (Le profil Creative Technologist).
- **Story 4.2 :** Formulaire ou liens de contact stylisés "Studio".

---

## 5. Prochaines Étapes
- Validation du PRD par l'utilisateur.
- Transmission à **Winston (Architecte)** pour définir la structure des composants et les modèles de données.