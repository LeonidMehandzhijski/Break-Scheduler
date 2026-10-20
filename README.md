# Break Scheduler

Break Scheduler is a web-based staff scheduling application for managing rest breaks, agent availability, and shift coverage in a simple drag-and-drop interface.

The project was originally explored as a Microsoft Teams app, but it now functions as a browser-based application deployed through Firebase and Google Cloud infrastructure with Firestore-backed data.

## Overview

Break Scheduler helps teams:

- assign and manage employee breaks
- visualize staffing coverage across shifts
- track agent status and break activity
- quickly reassign breaks with drag-and-drop scheduling
- test and demo scheduling workflows in a browser environment

It is designed for operations, support, and customer-facing teams that need a practical way to coordinate rest periods without relying on manual spreadsheets or chat-based coordination.

## Features

- Drag-and-drop break scheduling
- Shift-based timetable layout
- Agent availability and status tracking
- Real-time break event updates
- Responsive web UI
- Firebase Hosting and backend configuration
- Firestore-ready data model
- Cloud Functions support for backend logic

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Firebase Hosting
- Firebase Functions
- Firestore
- Google Cloud / Firebase deployment tools

## Project Structure

```text
Break-Scheduler/
├── public/
│   └── teams/
│       ├── manifest.json
│       ├── color.png
│       └── outline.png
├── src/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── functions/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── firebase.json
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── ...
```

Note: the `public/teams` folder is legacy or optional material from the earlier Teams prototype. It is not required for the current website-focused deployment.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

### Build for production

```bash
npm run build
```

### Deploy to Firebase

```bash
firebase login
firebase deploy
```

## Firebase / Cloud Architecture

This project is designed to run as a Firebase-hosted web app with:

- frontend hosted through Firebase Hosting
- app logic in the React client
- backend logic in Firebase Functions
- data stored in Firestore
- optional Google Cloud deployment compatibility

The current app is web-first and does not depend on a Teams tab implementation as its main runtime path.

## Local Development Notes

- The app includes mock/demo scheduling data for testing and demonstration.
- Local environment files such as `.env` should not be committed to source control.
- IDE and Firebase local cache folders such as `.idea/` and `.firebase/` should be ignored and cleaned up before deployment.

## Environment and Deployment Considerations

Before production deployment, make sure to review:

- Firebase project configuration
- Firestore rules and indexes
- environment variables and secrets
- app URLs and deployed front-end routing
- any legacy Teams-specific manifest settings you may no longer use

## License

This project does not currently include a formal license file. If you plan to distribute or publish it publicly, consider adding an open-source license such as MIT.

## Contributing

Pull requests are welcome. If you want to improve scheduling logic, connect the app to real data, or expand the backend, feel free to contribute.
