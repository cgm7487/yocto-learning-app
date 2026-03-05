# Yocto Learning App

An interactive learning platform for the Yocto Project, built with React + Vite and deployed via Docker Compose. The educational content is primarily derived from [Bootlin's Yocto training materials](https://bootlin.com/training/yocto/) (CC BY-SA 3.0).

## Features

- 9 learning modules, 21 lessons, 130 quiz questions
- Markdown-based lesson content with code highlighting and tables
- Real-time progress tracking (persisted in localStorage)
- Responsive design for desktop and mobile

## Screenshots

### Home Page
![Home Page](docs/images/home.png)

### Module Overview
![Module Overview](docs/images/modules.png)

### Module Detail
![Module Detail](docs/images/module-detail.png)

### Lesson Page
![Lesson Page](docs/images/lesson.png)

### About / License
![About Page](docs/images/about.png)

## Getting Started with Docker Compose

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

### Start the App

1. Clone the repository:

```bash
git clone <repo-url>
cd yocto-learning-app
```

2. Build and start the container:

```bash
docker compose up -d --build
```

3. Open your browser at [http://localhost:3000](http://localhost:3000)

### Stop the App

```bash
docker compose down
```

### Rebuild (after code changes)

```bash
docker compose up -d --build
```

## Local Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` by default.

## Tech Stack

- **Frontend:** React 19 + Vite 7
- **Routing:** React Router (HashRouter)
- **Deployment:** Docker (multi-stage build) + Nginx
- **Styling:** Plain CSS (no UI framework)

## License

- **Application source code** is licensed under the [MIT License](LICENSE).
- **Educational content** (lessons, quizzes, exercises) is derived from [Bootlin's Yocto training materials](https://bootlin.com/training/yocto/) and licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Copyright 2004-2025 [Bootlin](https://bootlin.com).

See the [About page](src/pages/About.jsx) or the [LICENSE](LICENSE) file for full details.
