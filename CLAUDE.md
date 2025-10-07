# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered tattoo image search engine built with Next.js. Users upload tattoo images to find similar designs using computer vision models (CLIP, DINOv2, SigLIP). Features advanced patch-level attention analysis showing which parts of images are most similar.

**Live Demo**: https://tattoo-search-frontend.vercel.app
**Backend**: Hugging Face Space at `https://onurcopur-tattoo-search-engine.hf.space`

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Building & Production
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Build and export static site

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### State Management Pattern

The main search page (`pages/index.tsx`) uses React hooks for state management with a clear separation of concerns:

- **Search State**: `selectedImage`, `results`, `caption`, `isLoading`, `error`, `hasSearched`
- **Model Configuration**: `selectedModel`, `usedModel`, `patchAttentionEnabled`
- **Analysis State**: `detailedAnalysis`, `analysisLoading`, `selectedResultForAnalysis`

Search and analysis are separate API calls with independent loading states, allowing detailed patch attention analysis to be performed on-demand for specific results.

### Backend Integration

Two main API endpoints on Hugging Face backend (60s timeout for both):

1. **`POST /search`** (line 59 in `pages/index.tsx`)
   - Query params: `embedding_model`, `include_patch_attention`
   - Returns: `SearchResponse` with results, caption, model info
   - Basic patch attention data included when enabled

2. **`POST /analyze-attention`** (line 127 in `pages/index.tsx`)
   - Query params: `candidate_url`, `embedding_model`, `include_visualizations`
   - Returns: `DetailedAttentionAnalysis` with full matrix, visualizations
   - Called on-demand when user clicks "Analyze" on a result

Backend URL configured via `NEXT_PUBLIC_BACKEND_URL` environment variable (see `vercel.json` for production config).

### Type System

All search/analysis types defined in `types/search.ts`:

- `SearchResult`: Basic result with score, url, optional patch attention
- `SearchResponse`: API response from `/search` endpoint
- `DetailedAttentionAnalysis`: Full analysis from `/analyze-attention` endpoint
- `PatchCorrespondence`: Maps query patches to candidate patches with similarity scores

### Component Architecture

#### Attention Analysis Components

The app features a sophisticated two-level attention analysis system:

1. **Quick Attention Data** (`SearchResults.tsx` + `patch_attention` in `SearchResult`)
   - Lightweight patch attention summary included with search results
   - Shows basic similarity metrics in result cards
   - Minimal computational overhead

2. **Detailed Analysis Modal** (`AttentionAnalysisPanel.tsx` + `PatchCorrespondenceViewer.tsx`)
   - Full patch-to-patch attention matrix analysis
   - Interactive visualization with heatmaps and correspondence maps
   - Triggered on-demand when user requests deep analysis
   - Tabbed interface: Overview, Statistics, Visualizations

This two-tier approach optimizes initial search performance while providing deep analysis when needed.

#### Image Handling

- `ImageUpload.tsx`: Drag-and-drop with preview, validates image types
- `RobustImage.tsx`: Fallback handling for broken image URLs
- `next/image` used throughout with wildcard remote patterns (see `next.config.js`)

### Deployment Configuration

`vercel.json` defines:
- Environment variables for build/runtime
- Max duration (30s) for the main page function
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)

When deploying to new environments, update `NEXT_PUBLIC_BACKEND_URL` to point to your backend instance.

## Key Patterns

### Error Handling
- Network timeouts handled with AbortController (60s limit)
- User-friendly error messages distinguish between timeout vs other failures
- Errors don't prevent subsequent searches (state is properly reset)

### Model Selection
- Model selector shows available embedding models (CLIP, DINOv2, SigLIP)
- All current models support patch attention
- Model selection affects both initial search and detailed analysis

### Loading States
- Separate loading states for search vs detailed analysis
- Button states and spinners indicate operation in progress
- Analysis modal shows loading state while computing correspondences

## Tech Stack Details

- **Framework**: Next.js 14 (Pages Router, not App Router)
- **Styling**: Tailwind CSS with custom primary colors
- **Node.js**: Requires 18+ (see `package.json` engines)
- **Image Optimization**: Next.js Image component with wildcard remote patterns
