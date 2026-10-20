# Break Scheduler

A Microsoft Teams-friendly break management app for coordinating team breaks, agent availability, and shift coverage in a simple drag-and-drop interface.

This project is built with React, TypeScript, and Tailwind CSS, with Firebase hosting and backend support for a lightweight deployment setup.

## Overview

Break Scheduler helps teams:

- assign and manage employee breaks
- visualize work coverage across shifts
- track the status of each agent
- quickly reassign breaks through drag-and-drop interaction
- demo scheduling workflows in a web app or Teams tab

It is designed for operations, support, and customer-facing teams that need a practical way to coordinate rest breaks without manual spreadsheets or chat-based coordination.

## Features

- Drag-and-drop scheduling interface
- Agent and shift management
- Break assignment and status updates
- Real-time event banner for active/finished breaks
- Responsive layout for browser-based use
- Firebase-ready hosting and backend configuration
- Microsoft Teams app manifest support

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Firebase Hosting
- Firebase Functions
- Firestore
- Microsoft Teams integration

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

### Deploy with Firebase

```bash
firebase login
firebase deploy
```

## Firebase and Teams Configuration

This repository includes:

- `firebase.json` for hosting and function configuration
- `public/teams/manifest.json` for Microsoft Teams app metadata
- `functions/` for server-side logic and Firebase Functions

Before deploying to Teams or production, update app metadata such as URLs, IDs, and domain values to match your environment.

## Notes

- The app includes mock/demo scheduling data for testing and demos.
- Local environment files such as `.env` should not be committed to source control.
- IDE and Firebase local cache folders should be ignored and cleaned up before shipping.

## License

This project does not currently appear to include a license file. If you plan to share or distribute it publicly, consider adding an open-source license such as MIT.

## Contributing

Pull requests are welcome. If you want to improve break logic, add new features, or connect the app to real data sources, feel free to contribute.
