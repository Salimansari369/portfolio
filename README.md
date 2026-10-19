# Salim Ansari — Anime-Inspired Personal Portfolio Website 🌸🏔️

A responsive, anime-inspired developer portfolio website crafted for **Salim Ansari** (*Third-Year B.Tech Computer Science Engineering student specializing in Artificial Intelligence & Machine Learning at Symbiosis Institute of Technology, Nagpur*).

---

## ✨ Key Features

1. **Signature Tiny Walking Anime Character (`src/components/TopWalkingBanner.tsx`)**
   - Original articulated SVG chibi character representing Salim (casual hoodie, black backpack, expressive blinking eyes, and multi-limb walking cycle).
   - Continuously walks along a panoramic sky track featuring cherry blossoms, a red Torii gate, Mt. Fuji, and the *"Small Steps, Big Dreams"* motto.
   - Smoothly reverses direction at path bounds, persists across section navigation without restarting, waves/jumps with section-aware speech bubbles on hover/click, and respects `prefers-reduced-motion`.

2. **Breathtaking Hero & Bento Dashboard (`src/components/HeroAndBentoSection.tsx`)**
   - Matches the reference UI layout: layered anime sky scenery, *"Ideas / Code / Impact"* sky note, gradient serif typography, **Explore My Work** & **Let's Connect** pill CTAs, 3-column bento overview (**About Me**, **Education**, **Technical Skills**), and **Featured Projects** strip.

3. **Full Portfolio Sections**
   - **About Me & Career Interests (`#about`)**: Interactive Developer Journal with tabs for *My Story*, *Learning Goals*, and *Career & Internship Interests*, plus a decorative Study Club note.
   - **Education & Academic Performance (`#education`)**: Symbiosis Institute of Technology, Nagpur details, core coursework, and semester-wise SGPA progression cards (editable live via the **Customize** modal or in `src/data/portfolioData.ts`).
   - **Technical Skills (`#skills`)**: Categorized across *Programming Languages*, *Frontend Development*, *Backend and APIs*, *AI/ML and Data Science*, *Databases*, *Developer Tools*, and *Other Technical Skills* with honest **Proficient** vs **Exploring** badges.
   - **Projects Showcase & Case Study Modals (`#projects`)**: Detailed cards and interactive modals for **LiteratureAI**, **Medilink**, **Campus Complaints**, and **NOIRÉ**.
   - **Achievements, Participation & Certificates (`#achievements` & `#certificates`)**: Filterable certificate gallery with click-to-enlarge Lightbox viewer.
   - **Photos & Visual Gallery (`#gallery`)**: Filterable editorial grid with full-resolution Lightbox viewer.
   - **Sunset Contact Section (`#contact`)**: Validated contact form with direct `mailto:` launch and 1-click formatted message copy.
   - **Optional Ambient Sky Chimes (`src/utils/ambientSound.ts`)**: Native Web Audio API Japanese pentatonic music-box synthesizer, **OFF by default** with zero autoplay.

---

## 🚀 How to Run Locally

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open the local URL displayed in your terminal (typically `http://localhost:5173`).

3. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🛠️ How to Update Your Personal Details, SGPA, & Certificates

All portfolio content is centralized in **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**:
- **Email, GitHub, & LinkedIn URLs**: Update `PORTFOLIO_DATA.personal` (or click the **Customize** button in the top navigation bar to test updates directly in the browser).
- **Semester SGPAs**: Update `PORTFOLIO_DATA.education.semesters` or use the in-app **Customize** modal.
- **Certificates & Campus Photos**: Drop your certificate images/PDFs or campus photos into `public/assets/` and update `PORTFOLIO_DATA.certificates` and `PORTFOLIO_DATA.gallery`.
