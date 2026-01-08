# Document d'Architecture - Portfolio "The Studio"
**Agent :** Winston (Architecte)
**Statut :** Version 1.0 - Blueprint Technique

---

## 1. High Level Architecture
Le projet est conçu comme une application web moderne utilisant le **App Router de Next.js**. La persistance de l'audio est assurée par un Layout racine qui englobe toutes les pages, permettant de maintenir l'état du lecteur sans rechargement du DOM lors de la navigation.

---

## 2. Tech Stack
- **Framework :** Next.js (App Router) pour le rendu hybride et le routing fluide.
- **Styling :** Tailwind CSS pour un design atomique et un mode sombre natif.
- **Animations :** Framer Motion pour les transitions de listes et les effets d'entrée "smooth".
- **Audio :** API HTML5 Audio native pilotée par un Context React ou Zustand.

---

## 3. Data Models (Typescript)

### Track (Projet)
```typescript
interface ProjectTrack {
  id: string;
  title: string;
  category: string; // ex: "Web App", "Design System"
  stack: string[];
  date: string;
  bpm: number; // Pour l'ambiance Studio
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail: string;
}
```

## 4. Components Structure (Shardable)
Core/Layout :

StudioProvider : Context/Store gérant l'état global.

GrainOverlay : Couche CSS pour l'effet "texture" du studio.

PersistentPlayer : Le contrôleur audio (Play/Pause/Seeker).

Features/Home :

HeroConsole : Section d'accueil avec photo immersive.

TracklistTable : Liste des projets stylisée comme un DAW (Digital Audio Workstation).

ProjectRow : Ligne individuelle avec effet de hover "mixage".

Features/Audio :

SpectrumVisualizer : Visualiseur réactif basé sur le volume ou le BPM.

5. Core Workflows
Flux de Lecture Audio
L'utilisateur clique sur une "piste" (projet) ou sur le lecteur global.

Le AudioStore met à jour currentTrackId.

L'élément audio HTML5 charge le fichier local /public/audio/*.mp3.

Les composants visuels (Visualizer) s'animent en fonction du rythme.

Flux de Navigation
Navigation via next/link.

Le composant PageWrapper utilise Framer Motion pour un effet de "fade & slide".

L'audio continue de jouer car le composant PersistentPlayer est en dehors du cycle de rechargement des pages.

6. Error Handling Strategy
Audio Failover : Si un fichier MP3 ne charge pas, le lecteur passe silencieusement à la piste suivante ou affiche une notification "Track Unavailable".

Hydration Errors : Utilisation de dynamic imports pour les composants audio afin d'éviter les conflits de rendu Serveur/Client avec Next.js.

7. Security & Performance
Assets : Optimisation des MP3 (encodage 128kbps pour le web) pour réduire le temps de chargement.

Images : Utilisation de next/image avec des placeholders flous pour la "claque visuelle" instantanée.

Security : Sanitization des données issues du JSON des projets pour éviter les injections XSS dans le portfolio.

8. Testing Strategy
Unit Testing : Vérification de la logique du store audio (Play/Pause/Next).

Integration Testing : Test du maintien de la lecture audio lors du changement de route.