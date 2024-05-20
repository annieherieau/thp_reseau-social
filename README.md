# React + Vite

App React minimaliste d'un mini réseau social type Twitter. Le global state est géré par Jotai.

## Fonctionnalités:
- [x] page d'accueil
- [x] Un système d'authentification (Sign up, Log in, Log out)
- [x] Afficher la liste des messages (user authentifié)
- [x] tri des messages par date (décroisante)
- Dashboard utilisateur: gestion du profil
- CRUD des messages
- liker / dé-liker les messages
- Consulter les profils publics des autres utilisateurs (lien cliquable dans le post)

## Installation
Clone repository

Dependencies
- Vite
- React
- bootstrap
- Redux
- Js-cookie
- Jotai

```bash
pnpm i
```
in case pnpm is not already install : ``npm i -g pnpm``
---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
