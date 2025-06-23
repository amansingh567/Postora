# Postora

A modern social app built with React and Appwrite, enabling users to create posts, manage profiles, like, comment, and explore content seamlessly.

## Features

- User authentication and profiles
- Create, update, and delete posts
- Like and comment on posts
- Search and explore posts
- Upload and preview images
- Responsive and clean UI with Tailwind CSS

## Tech Stack

- React.js (with React Router & Redux)
- Appwrite backend (Databases, Storage, Authentication)
- Tailwind CSS for styling
- Vite as the build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- An [Appwrite](https://appwrite.io/) account and project

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/amansingh567/Postora.git
   cd Postora

2.Install dependencies:
  npm install
    # or
  yarn install

3.Set up your Appwrite project and update environment variables:

    Rename .env.sample to .env
    Fill in your Appwrite project endpoint, project ID, database ID, collection IDs, and bucket IDs

4.Run the app locally:
  npm run dev
    # or
  yarn dev

5. Open http://localhost:5173 in your browser.

6.Folder Structure
  /public         # Static assets
  /src            # React source code
    /components   # Reusable React components
    /pages        # Page-level components
    /appwrite     # Appwrite service and config
    /assests
    /conf
    /store
    App.css
    App.jsx
    index.css
    main.jsx
.gitignore
.env.sample
.env
eslint.config.js
package-lock.json
package.json
postcss.config.js
tailwind.config.js
vite.config.js
README.md

  
Deployment
  You can deploy this app easily on platforms like:
    Vercel
    Netlify
    Cloudflare Pages
    
Make sure to set environment variables on your hosting platform accordingly.
