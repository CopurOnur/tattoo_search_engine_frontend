# Tattoo Search Engine Frontend

AI-powered tattoo image search engine built with Next.js. Upload a tattoo image and discover similar designs using advanced computer vision models.

## 🌟 Features

- 🔍 **Visual Search**: Upload tattoo images and find similar designs
- 🤖 **AI-Powered**: Uses CLIP, DINOv2, and SigLIP embedding models
- 🎯 **Patch Attention**: Advanced analysis showing which parts of images are most similar
- 📱 **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- ⚡ **Fast Performance**: Optimized Next.js application

## 🚀 Live Demo

🌐 **[View Live Demo](https://tattoo-search-frontend.vercel.app)**

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Deployment**: Vercel
- **Backend**: Hugging Face Spaces (API)

## 📦 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend URL if different
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000/projects/tattoo-search
   ```

## 🚀 Deployment to Vercel

### Method 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository

3. **Configure deployment**
   - Root Directory: Leave blank or set to `frontend` if in subdirectory
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Set environment variables**
   - Add `NEXT_PUBLIC_BACKEND_URL` = `https://onurcopur-tattoo-search-engine.hf.space`

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API endpoint | `https://onurcopur-tattoo-search-engine.hf.space` |

## 📁 Project Structure

```
frontend/
├── components/           # React components
│   ├── ImageUpload.tsx          # Image upload with drag & drop
│   ├── SearchResults.tsx        # Search results grid
│   ├── ModelSelector.tsx        # Embedding model selector
│   ├── AttentionAnalysisPanel.tsx    # Analysis panel
│   └── ...
├── pages/               # Next.js pages
│   ├── _app.tsx        # App wrapper
│   └── projects/
│       └── tattoo-search.tsx    # Main search page
├── styles/             # Global styles
├── types/              # TypeScript definitions
├── public/             # Static assets
└── ...config files
```

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static site
```

## 🔗 Backend Integration

This frontend connects to a Hugging Face Space backend that provides:

- Image similarity search using multiple embedding models
- AI-generated image captions
- Patch attention analysis
- Visual correspondence mapping

**Backend Repository**: [Tattoo Search Engine Backend](https://huggingface.co/spaces/onurcopur/tattoo-search-engine)

## 🎨 Customization

### Changing Backend URL

Update the `NEXT_PUBLIC_BACKEND_URL` environment variable to point to your own backend deployment.

### Styling

The app uses Tailwind CSS. Customize colors and styling in:
- `tailwind.config.js` - Tailwind configuration
- `styles/globals.css` - Global styles

### Adding Features

1. Create new components in `/components`
2. Add new pages in `/pages`
3. Update types in `/types/search.ts`

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Build passes locally (`npm run build`)
- [ ] ESLint warnings addressed
- [ ] Backend URL updated for production
- [ ] Domain configured (if custom)

## ⚡ Performance Optimization

The app is optimized for production with:

- ✅ Next.js automatic code splitting
- ✅ Image optimization with `next/image`
- ✅ CSS optimization with Tailwind
- ✅ TypeScript for better development experience
- ✅ ESLint for code quality

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and deployed on Vercel.