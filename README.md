# Personal Blog

A modern, minimalistic personal blog built with React, TypeScript, and Vite. Features markdown support, dark/light mode, SEO optimization, and enhanced image capabilities.

> **Note:** This project was built with ❤️ using Vibe Code

## ✨ Features

- 📝 **Markdown Blog Posts** - Write posts in markdown with full GitHub Flavored Markdown support
- 🖼️ **Enhanced Images** - Click-to-zoom lightbox, lazy loading, and automatic captions
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 📱 **Fully Responsive** - Optimized for all devices
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
- 💨 **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **TypeScript** - Full type safety throughout the project
- 📦 **Dev.to Migration** - Automated script to import articles from Dev.to

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd my-personal-blog-main
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The blog will be available at `http://localhost:8080` (or another port if 8080 is in use).

## 📝 Writing Blog Posts

### Creating a New Post

1. Create a new `.md` file in `src/content/posts/`
2. Add frontmatter at the top of the file:

```markdown
title: "Your Post Title"
date: "2024-02-17"
excerpt: "A brief description of your post"
tags: ["javascript", "react", "tutorial"]
coverImage: "https://example.com/image.jpg" # Optional

---

Your content here...
```

### Adding Images

Use standard markdown syntax to add images:

```markdown
![Image caption](https://example.com/image.jpg)
```

Images automatically include:

- Click-to-zoom lightbox
- Lazy loading
- Captions from alt text
- Responsive sizing

## 📦 Migrating from Dev.to

If you have existing articles on Dev.to, you can automatically migrate them:

```bash
npm run migrate <your-devto-username>
```

This will:

- Fetch all your published articles
- Convert them to the blog's markdown format
- Preserve all metadata (title, date, tags, cover images)
- Save them to `src/content/posts/`

See [`scripts/README.md`](scripts/README.md) for more details.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run migrate <username>` - Migrate articles from Dev.to

## 🏗️ Project Structure

```
my-personal-blog-main/
├── public/ # Static assets
├── src/
│ ├── components/ # React components
│ ├── content/
│ │ └── posts/ # Blog post markdown files
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── pages/ # Page components
│ └── App.tsx # Main app component
├── scripts/ # Utility scripts (Dev.to migration)
└── package.json
```

## 🎨 Customization

### Updating Personal Information

Edit `src/pages/About.tsx` to update your bio, photo, and social links.

### Changing Theme Colors

Modify `src/index.css` to customize the color scheme. The project uses CSS variables for easy theming.

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add a route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your base path
2. Run `npm run build`
3. Deploy the `dist/` folder to GitHub Pages

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Markdown:** react-markdown with remark-gfm
- **Syntax Highlighting:** react-syntax-highlighter
- **Routing:** React Router
- **Icons:** Lucide React

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Vibe Code

---

**Happy Blogging!** 📝✨
