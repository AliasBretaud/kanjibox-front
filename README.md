# KanjiBox

KanjiBox is a Japanese learning application that allows users to create their own personalized deck of Japanese words and kanji. The application is designed to provide an intuitive and effective learning experience for the Japanese language, focusing on managing decks of japanese characters and words and using interactive flashcards.

See the [Live version](https://kanjibox.vercel.app/).

## Main Features

- **Personal Account Creation**: Users can create a personal account to access all the features of the application.
- **Custom Deck Creation**: Users can create their own decks of Japanese words and kanji for their learning.
- **Interactive Flashcards**: Flashcards display the value of the kanji or word, readings (on yomi and kun yomi of kanji), translations, and furigana transcription (words).
- **Content Addition Modes**: Users can add kanji or words using automatic detection or manual input of information.
- **Multilingual Interface**: The application interface is available in French, English, and Japanese.

## Technical Features

- **Technologies Used**:

  - React 18
  - Typescript 5
  - Next.js 14 (with server components and server actions)
  - Auth0 (for authentication with OAuth Google and Github)
  - MaterialUI (for UI)
  - Tests: Jest and Playwright
  - Docker (containerization of the application)

- **Automated Tests**: The application comes with Jest and Playwright tests to ensure code quality.

- **Continuous Deployment**: KanjiBox utilizes Vercel for seamless Continuous Deployment. Every push to the main branch triggers an automatic deployment to production.

- **Dockerization**: The application is dockerized and the image is available on Docker Hub at the following address: [fbrtd/kanjibox-front](https://hub.docker.com/r/fbrtd/kanjibox-front).

## Installation

1. Clone the GitHub repository:

```bash
git clone https://github.com/AliasBretaud/kanjibox-front.git
```

2. Install dependencies:

```bash
cd kanjibox-front
yarn install
```

3. Create a `.env.local` file at the root of the project and add the necessary environment variables, especially for Auth0 configuration :

```properties
BACKEND_API_URL=http://localhost:8080/kanjibox
ANALYZE=false
AUTH0_BASE_URL=http://localhost:3000
AUTH0_SECRET=${AUTH0_SECRET}
AUTH0_ISSUER_BASE_URL=${AUTH0_ISSUER_BASE_URL}
AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
```

For more details about the configuration of Auth0 with Next.js, please read the [documentation](https://auth0.com/docs/quickstart/webapp/nextjs).

The value of the `BACKEND_API_URL` variable should be the URL of an running instance of the [KanjiBox backend project](https://github.com/AliasBretaud/kanjibox-back).

4. Start the application in development mode:

```bash
yarn dev
```

The application will be accessible at http://localhost:3000.

## Installation with Docker

1. Pull the last version of the project image:

```bash
docker pull fbrtd/kanjibox-front@latest
```

2. Start a container :

```bash
docker run -d \
  -e BACKEND_API_URL=http://localhost:8080/kanjibox \
  -e AUTH0_BASE_URL=http://localhost:3000 \
  -e AUTH0_SECRET=${AUTH0_SECRET} \
  -e AUTH0_ISSUER_BASE_URL=${AUTH0_ISSUER_BASE_URL} \
  -e AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID} \
  -e AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET} \
  -e AUTH0_AUDIENCE=${AUTH0_AUDIENCE} \
  --name kanjibox-front \
  fbrtd/kanjibox-front
```

Make sure to replace `${AUTH0_SECRET}`, `${AUTH0_ISSUER_BASE_URL}`, `${AUTH0_CLIENT_ID}`, `${AUTH0_CLIENT_SECRET}` `and ${AUTH0_AUDIENCE}` with the values corresponding to your Auth0 configuration.

The application will be accessible at http://localhost:3000.
