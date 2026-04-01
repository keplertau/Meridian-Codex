# Meridian Codex — NotebookLM Workflow

## Mission

Every page in the Meridian Codex is written text. Not everyone reads. Some people learn better by listening. Some by watching. Some by scanning a visual summary. The purpose of NotebookLM in this project is to give every reader an alternative way to consume the same content that is on the page. The audio overview, the video, the infographic, and the slide deck are not supplementary material. They are not editorial commentary. They are not loosely connected spin-offs. They are the page itself, presented in a different medium.

This means: the outputs must follow the page's own structure, use the page's own framing, and cover what the page covers. The steering prompts exist to ensure NotebookLM stays faithful to the source rather than generating its own interpretation. When we scale this across all Codex sections and Toolkit pages, every page gets the same treatment: read it, listen to it, watch it, or scan it. The content is the same. The medium is the choice.

**Subscription tier assumed:** Pro / Ultra (300+ sources, Cinematic Video Overviews available)

**Last updated:** 2026-03-31

**Folder structure:**
```
MeridianCodex/notebooklm/
├── workflow.md              # This file
├── sync-sources.py          # Script to regenerate MD files from MDX sources
├── sources/                 # Clean MD files ready to paste into NotebookLM
│   ├── codex/               # 14 Codex core pages
│   ├── toolkit/             # 8 Toolkit pages
│   └── ai-standard/         # 1 AI Standard page
└── output/                  # All generated content from NotebookLM
    ├── README.md            # Naming convention and folder guide
    ├── codex/               # One subfolder per Codex page
    │   └── [page-slug]/     # e.g., the-foundation/
    │       ├── audio/       # Audio overviews (M4A/MP3)
    │       ├── video/       # Video overviews (MP4)
    │       ├── infographic/ # Infographics (PNG/JPG)
    │       ├── slides/      # Slide decks (PPTX/PDF)
    │       └── reports/     # Generated reports (PDF/MD)
    ├── toolkit/             # Same structure per Toolkit page
    └── ai-standard/         # Same structure
```

**Keeping sources up to date:** When MDX source files change, re-run the sync script:
```bash
cd ~/Projects/MeridianCodex/notebooklm
python3 sync-sources.py
```
This regenerates all MD files from the current MDX sources. The script strips JSX components, SVG blocks, HTML tags, and className attributes while preserving text content, headings, bold/italic, and blockquotes. Frontmatter (title, description, aiSummary) is converted to a clean header.

Alternatively, ask Claude in a Cowork session to "sync the NotebookLM sources" and Claude will run the conversion.

---

## 1. NotebookLM Studio — Feature Reference

### 1.1 Output Types Available

NotebookLM Studio generates output types across several categories. The five we use systematically for the Codex are marked with an asterisk.

*Verified against actual NotebookLM UI (2026-03-31)*

| Output | What It Produces | Export Format | Codex Use |
|---|---|---|---|
| **Audio Overview*** | Two-host conversational deep-dive or brief | MP3 | Podcast feeds, YouTube audio, website player |
| **Video Overview*** | Narrated explainer with visuals (Cinematic, Explainer, or Brief) | MP4 | YouTube, TikTok, Instagram Reels, social clips |
| **Infographic*** | Visual summary with layout and illustrations | PNG/image | Social media, website, newsletters |
| **Slide Deck*** | Presentation with structured content | PPTX, PDF | Website embeds, LinkedIn carousels, downloads |
| **Report*** | Structured text document in multiple formats | Copy/paste, in-platform | Blog posts, study guides, briefing docs, and AI-suggested derivative formats |
| Mind Map | Visual hierarchy of concepts | PNG, JSON | Internal planning |
| Data Table | Structured comparison table | Google Sheets | Research, comparison pages |
| Flashcards | Study cards with progress tracking | In-platform | Community engagement (future) |
| Quiz | Knowledge test with explanations | In-platform | Community engagement (future) |

#### Report Formats (Detail)

Reports have two tiers of format options:

**Standard formats** (available for any source):

| Format | Description |
|---|---|
| Create Your Own | Custom structure, style, tone |
| Briefing Doc | Overview with key insights and quotes |
| Study Guide | Short-answer quiz, essay questions, glossary |
| Blog Post | Takeaways distilled into a readable article |

**Suggested formats** (AI-generated based on source content):

NotebookLM analyzes the uploaded source and proposes formats tailored to the material. For The Foundation, it suggested:

| Format | Description |
|---|---|
| Operational Protocol | Framework for applying epistemic integrity to high-stakes organizational decision-making |
| Governance Framework | Principles for fostering honest inquiry and steelmanning within organizations |
| Comparative Guide | Breakdown comparing defensive soldier habits vs scout orientation |
| Conceptual Map | Introductory overview of the five core categories of cognitive bias |

These suggested formats will vary per page. Each one comes with an editable title, description, language selector, and a free-text steering prompt ("Describe the report you want to create").

**Why this matters for the Codex:** The suggested formats turn page content into derivative reference documents that serve different audiences. A "Comparative Guide" for Scout Mindset vs Soldier Mindset is a standalone resource. A "Conceptual Map" of the five bias categories is a reference card. These are not just reformatted page content but structured transformations that add practical value. We should explore generating these for each page alongside the four core outputs.

### 1.2 Settings Matrix — The Four Core Outputs

*Verified against actual NotebookLM UI (2026-03-31)*

#### Audio Overview

| Setting | Options | Notes |
|---|---|---|
| Format | **Deep Dive**, Brief, Critique, Debate | Deep Dive = lively two-host conversation. Brief = short summary. Critique = expert review of your source. Debate = two hosts with opposing perspectives. |
| Language | Dropdown (English default) | |
| Length | Short, **Default**, Long | Long for full page walkthroughs. Short for social clips. |
| Steering prompt | "What should the AI hosts focus on in this episode?" | Free text field. This is where our page-specific prompt goes. |
| Auto-suggestions | Topic buttons appear below prompt | NotebookLM generates clickable focus topics from your source (e.g., "+ Practical Training", "+ Identity Decoupling", "+ For Beginners"). Optional. |

#### Video Overview

| Setting | Options | Notes |
|---|---|---|
| Format | **Cinematic** (New!), **Explainer**, Brief | Cinematic = rich immersive visuals + storytelling. Explainer = structured comprehensive overview. Brief = quick core ideas. |
| Language | Dropdown (English default) | |
| Visual style (9 presets) | **Custom**, Classic, Whiteboard, Kawaii, Anime, Watercolor, Retro print, Heritage, Paper-craft | **Use Classic** for reliable Codex-aligned results. Custom allows a text description of the visual style. |
| Custom style prompt | "Describe a custom visual style" | Only visible when Custom is selected. Use for brand-aligned visual direction. |
| Content steering prompt | "What should the AI hosts focus on?" | Free text field for content focus and structure. |
| Auto-suggestions | Topic buttons appear below prompt | (e.g., "+ Adopt Scout Mindset", "+ Master Identity Decoupling") |

**Two prompt fields:** When Custom visual style is selected, the Video Overview has TWO separate text inputs: one for describing the visual style, and one for guiding what the content should focus on. Both should receive steering prompts.

#### Infographic

| Setting | Options | Notes |
|---|---|---|
| Language | Dropdown (English default) | |
| Orientation | **Landscape**, Portrait, Square | |
| Visual style (11 presets) | Auto-select, Sketch Note, Kawaii, Professional, Scientific, Anime, Clay, Editorial, Instructional, Bento Grid, Bricks | **Use Professional or Editorial** for Codex brand alignment. Instructional also worth testing for educational content. |
| Level of detail | Concise, **Standard**, Detailed (BETA) | Detailed for full page coverage. Standard for social. Concise for quick posts. |
| Steering prompt | "Describe the infographic you want to create" | Free text field. |

#### Slide Deck

| Setting | Options | Notes |
|---|---|---|
| Format | **Detailed Deck**, Presenter Slides | Detailed = full text, standalone reading. Presenter = clean visual talking points. |
| Language | Dropdown (English default) | |
| Length | Short, **Default** | Default for full page coverage. |
| Steering prompt | "Describe the slide deck you want to create" | Free text field. |
| Orientation | Not available | Slide decks generate in landscape only. |

### 1.3 Custom Instructions (Notebook-Level Persona)

NotebookLM has a 10,000-character persona field (sliders icon in Chat header > Configure Chat > Custom) that shapes ALL outputs from that notebook. This is set once and applies to every infographic, video, slide deck, and podcast generated from that notebook.

The universal Meridian Codex persona is in Section 3.

---

## 2. Notebook Architecture

### One notebook per content section

Each Codex page or Toolkit deep-dive gets its own NotebookLM notebook. This keeps sources focused and outputs clean.

**Naming convention:** `MC — [Section Name]`

Examples:
- `MC — The Foundation`
- `MC — The Knowledge`
- `MC — Scout Mindset`
- `MC — The Update Protocol`

### Sources to upload per notebook

For each notebook, upload these sources in order of priority:

1. **The page itself** (primary source) — Copy the full MDX content of the page, stripped of JSX/SVG markup. Plain text with markdown headings. This is the core material NotebookLM will work from.

2. **The aiSummary from frontmatter** — Paste this separately as a short text source titled "Page Summary." It gives NotebookLM a compressed overview to anchor its outputs.

3. **Parent discipline page** (context source) — For Toolkit pages, include the parent discipline page (e.g., The Foundation for Scout Mindset). This provides structural context so outputs can reference where the tool sits in the framework.

4. **The Codex opening or proposition** (framing source) — Include `opening.mdx` or `the-proposition.mdx` for outputs that need to explain what the Codex is. Especially important for social media content where the audience may not know the framework.

5. **Related Toolkit pages** (optional, for cross-references) — If the page references other tools (e.g., Scout Mindset references Confirmation Bias), include those pages so the output can draw connections.

**Source preparation rule:** Never paste raw MDX into NotebookLM. Always use the pre-converted MD files from `notebooklm/sources/`. These files have been stripped of JSX components, SVG markup, and HTML while preserving all text content. If MDX sources have changed since the last sync, run `python3 sync-sources.py` first.

### Content inventory

#### Codex Core Pages (14 pages)

| Page | File | Parent | Priority |
|---|---|---|---|
| Opening | `codex/opening.mdx` | — | High (entry point) |
| The Problem | `codex/the-problem.mdx` | — | High |
| The Proposition | `codex/the-proposition.mdx` | — | High |
| Who Is This For | `codex/who-is-this-for.mdx` | — | Medium |
| The Foundation | `codex/the-foundation.mdx` | — | High |
| The Knowledge | `codex/the-knowledge.mdx` | — | High |
| The Bond | `codex/the-bond.mdx` | — | High |
| The Practice | `codex/the-practice.mdx` | — | High |
| The Vision | `codex/the-vision.mdx` | — | Medium |
| The Governance | `codex/the-governance.mdx` | — | Medium |
| The Closing | `codex/the-closing.mdx` | — | Low |
| The Glossary | `codex/the-glossary.mdx` | — | Low |
| Index | `codex/index.mdx` | — | Low |
| Changelog | `codex/changelog.mdx` | — | Low |

#### Toolkit Deep-Dives (published, 6 pages)

| Page | File | Discipline | Priority |
|---|---|---|---|
| Scout Mindset | `toolkit/scout-mindset.mdx` | Foundation | High |
| Noticing | `toolkit/noticing.mdx` | Foundation | High |
| Confirmation Bias | `toolkit/confirmation-bias.mdx` | Foundation | High |
| The Update Protocol | `toolkit/the-update-protocol.mdx` | Foundation | High |
| Steelmanning | `toolkit/steelmanning.mdx` | Bond | High |
| Entropy | `toolkit/entropy.mdx` | Knowledge | High |

#### AI Standard (1 page)

| Page | File | Priority |
|---|---|---|
| The Meridian Standard | `ai-standard/the-meridian-standard.mdx` | High |

**Total notebooks needed (current content):** 21 pages, but prioritize the ~12 high-priority pages first.

---

## 3. Universal Persona (Notebook-Level Custom Instructions)

Paste this into every notebook's Configure panel (gear icon > Custom Instructions). It is under the 10,000-character limit.

```
ROLE AND CONTEXT

You are producing multimedia content for the Meridian Codex, a civilizational operating system that integrates philosophy, cognitive science, and systems dynamics into a coherent framework. The Codex is authored by Carsten Geiser and published at meridiancodex.com.

The Codex is built around three disciplines:
- The Foundation: honest inquiry, cognitive bias awareness, epistemic integrity
- The Knowledge: systems thinking, cooperation theory, entropy, game theory
- The Bond: cooperation, steelmanning, trust-building, collective action

The central concept is the Meridian Range: the territory between two failure modes that break every complex system. Control (structure that cannot adapt) and Decay (structure that cannot hold). The Codex trains people to hold the Range.

AUDIENCE

The audience is thoughtful adults who sense something is structurally wrong with how modern systems operate but lack a framework to articulate it. They are not academics. They are not looking for self-help. They want something rigorous enough to trust and practical enough to use. Include AI practitioners and developers as a secondary audience for the AI Standard content.

VOICE AND TONE

The Codex voice has a specific character. It is not generic educational content. It is not casual tech-bro explainer. It is not TED Talk polish. It is a builder's voice: someone who has taken systems apart, seen how they work from the inside, and is sharing what they found. The authority comes from direct contact with the subject, not from credentials or academic distance.

Core voice traits that MUST come through in all audio and video:

1. The tinkerer's authority. Explain things the way someone explains a machine they have taken apart. Not from theory. From contact. The listener should feel that the speaker has held the pieces, tried to fit them, and sometimes failed.

2. The outsider's clarity. The perspective of someone who has never fully belonged to any one institution or discipline. That distance is what makes them see what insiders miss. Observant, unattached to institutional loyalty, willing to name what others have stopped seeing.

3. Warmth through attention, not declaration. Never say "this matters deeply" or "this is so important." Show the caring through how closely and specifically the idea is examined. Precision IS warmth. A paragraph that takes time to get something exactly right communicates more care than one that announces its own significance.

4. Controlled heat. When something matters, the voice is allowed to burn. But it never loses control. Intensity expressed through precision, not volume. When the material calls for force, get quieter and more specific. Do not shout.

5. Humor as a blade. Dry, understated, occasionally sharp enough to cut. Never a joke for its own sake. If a laugh does not also teach the listener something or strip away pretension, it does not belong.

6. Show the thinking, not just the thought. Let the listener see how the idea was arrived at. Include the reasoning, the wrong turns, the observations that led somewhere. A conclusion without its process is a claim. A conclusion with its process is an argument you can follow.

For podcast hosts specifically: The hosts sound like two people who have genuinely spent time with this material and find it compelling because they have tested it against their own experience. They speak the way thoughtful people speak when saying something they mean to someone they respect. Not simplified. Not dumbed down. Not performatively excited. They are allowed to disagree, push back, sit with tension. They do NOT sound like morning radio hosts, American podcast bros, or scripted presenters. The register is closer to a focused late-night conversation between two people who have been thinking hard about something that matters.

For video narration: The narrator speaks with conviction. They have a position and they state it. No hedging. No "it could be argued." No throat-clearing. The pace allows ideas to land. Silence between ideas is fine. Rushing through concepts to cover everything is not.

Banned words and phrases (these are AI tells that break the voice): delve, tapestry, landscape (metaphorical), multifaceted, crucial, utilize, leverage (verb), robust, streamline, cutting-edge, holistic, synergy, paradigm, ecosystem, iterative, "it's worth noting," "let's unpack this," "let's break this down," "in today's rapidly evolving," "at its core," "great question," "that's really interesting" (reflexive), "navigate challenges," "the possibilities are endless."

Do not use em dashes. Do not use triplet structures repeatedly ("X, Y, and Z" in consecutive sentences). Do not use "Not X. Y." reversal patterns more than once. Do not end on vague inspirational closers.

VISUAL IDENTITY

The Meridian Codex brand uses these colors:
- Meridian Green (#3ECF6B): primary accent, energy, links
- Dark Slate (#1A2530): logo mark on light backgrounds
- Warm Paper (#F9F8F5): light backgrounds
- Cosmic Deep (#0D0F12): dark backgrounds
- Earth (#A68B6B): secondary warm accent
- Coral (#E87461): alert/contrast accent
- Cyan (#00D4FF): dark mode accent

The visual direction is light, earthy, hopeful. Morning light, open space, warmth that feels inviting. Clean and grounded, never cold or clinical. The logo is an open circle (gap at top), symbolizing wholeness with room for growth.

Typography: Plus Jakarta Sans for all text.

PURPOSE

Every output you generate (audio, video, infographic, slide deck, report) is an alternative way to consume the same content that is on the page. The purpose is to serve people who prefer listening, watching, or scanning a visual instead of reading. These outputs must follow the page's own structure and framing. They are not supplementary commentary. They are the page itself, presented in a different medium.

CONTENT RULES

- Follow the page's own structure and order. Do not reorder, skip sections, or impose a different narrative arc.
- Always explain where a concept sits within the three-discipline structure
- Reference the Control-Decay spectrum when explaining why something matters
- Use concrete examples. Specific beats general.
- When discussing tools from the Toolkit, explain both what the tool does and how it serves the Meridian Range
- End with the page's own closing thought, not an invented summary
- For podcast/audio: the hosts should sound like two people who genuinely find this material compelling, not like they are reading a textbook
```

---

## 4. Steering Prompts — Templates per Output Type

These are pasted into the custom description / steering prompt field for each individual output. Replace bracketed placeholders with the specific page content.

### 4.1 Infographic Steering Prompt

```
Create an infographic about [PAGE TITLE] from the Meridian Codex.

FOCUS: [1-3 sentence summary of what the page covers, drawn from the aiSummary]

KEY CONCEPTS TO VISUALIZE:
- [Concept 1]: [One-line explanation]
- [Concept 2]: [One-line explanation]
- [Concept 3]: [One-line explanation]
- [Concept 4 if applicable]: [One-line explanation]

STRUCTURE: Open with the core question or problem this page addresses. Present the key concepts as a clear visual flow or comparison. Show how this connects to the Meridian Range (the balance between Control and Decay). Close with the practical takeaway.

VISUAL DIRECTION: Use the Meridian brand palette. Green (#3ECF6B) for positive/growth elements, Coral (#E87461) for warnings or failure modes, Dark Slate (#1A2530) for structure. The feel should be clean, warm, and grounded. Not corporate. Not clinical.

DO NOT use the words: delve, tapestry, landscape, multifaceted, crucial, utilize, leverage, robust, streamline, holistic, synergy, paradigm, ecosystem.
```

### 4.2 Video Overview Steering Prompts

The Video Overview has TWO prompt fields when Custom visual style is selected. Fill both.

**FIELD 1: "Describe a custom visual style"** (only when Custom is selected)

```
Clean, modern visual style. Dark backgrounds (#0D0F12) with green (#3ECF6B) accent elements. Typography: sans-serif, clean, readable. Warm and grounded, not corporate or clinical. Use simple diagrams and visual metaphors where they clarify the content. Avoid flashy transitions or decorative elements that distract from the material.
```

**FIELD 2: "What should the AI hosts focus on?"** (always available)

```
This video should walk viewers through the full content of [PAGE TITLE] from the Meridian Codex. It is an alternative way to consume the same material that is on the page. Follow the page's structure.

The page covers, in order:
- [Section 1 from the page: brief description]
- [Section 2 from the page: brief description]
- [Section 3 from the page: brief description]
- [Continue for all major sections]

VOICE: The narration should sound like someone who has directly worked with these ideas, not someone reading about them. Calm confidence, not manufactured excitement. State positions plainly. No hedging, no "it could be argued." When something matters, get specific, not louder. Allow ideas to land before moving on. The pace should let the viewer think, not just receive.

Present each section clearly and faithfully. Do not skip sections or reorder. Use concrete examples where they help explain a concept. End with the page's own closing thought, not an invented inspirational summary.
```

**Recommended settings per format:**

| Format | Visual style | When to use |
|---|---|---|
| Explainer + Classic | Classic | Default for all pages. Reliable, clean, structured. **Use this first.** |
| Explainer + Custom | Custom (with brand description above) | When Classic doesn't align with the Codex visual identity. Test on Foundation. |
| Brief + Classic | Classic | Short-form social content (Shorts, Reels, TikTok). Quick version of the page. |
| Cinematic | N/A (no style selection) | Premium flagship content for high-priority pages. Immersive storytelling. |

### 4.3 Slide Deck Steering Prompt

```
Create a [Detailed Deck / Presenter Slides] about [PAGE TITLE] from the Meridian Codex.

PURPOSE: [Choose one: standalone reading material / live presentation support / social media carousel / educational workshop]

SLIDE STRUCTURE:
1. Title slide: [PAGE TITLE] with the tagline from the page description
2. The question this page answers (1 slide)
3. Where this sits in the Codex (1 slide showing the three disciplines, highlighting [DISCIPLINE])
4. Core concepts (1-2 slides each for the main ideas)
5. The Control-Decay connection (1 slide showing how this topic relates to the failure modes)
6. Practical application (1-2 slides with examples or exercises)
7. Key takeaway (1 slide, not a summary but a single compelling insight)

VISUAL NOTES: Use Meridian Green (#3ECF6B) as the accent color. Dark backgrounds preferred. Clean layouts with generous white space. One idea per slide. Short text. Let the visual carry the message.

TEXT RULES: Short sentences. No jargon. No em dashes. Specific examples over abstract claims.
```

### 4.4 Podcast (Audio Overview) Steering Prompt

```
Create a [Deep Dive / Brief / Debate] audio overview about [PAGE TITLE] from the Meridian Codex.

ANGLE: [Choose the specific angle for this episode. Not "explain the page." Frame it as a question or tension worth exploring.]

Examples of good angles:
- "Why does honest self-examination keep failing, even for smart people?" (for Scout Mindset)
- "What would cooperation look like if we designed it from physics up?" (for The Knowledge)
- "Is there a version of the update protocol that AI systems could practice?" (for The Update Protocol)

KEY POINTS TO COVER:
1. [Specific point from the page]
2. [Specific point from the page]
3. [Specific point from the page]

VOICE DIRECTION:
The hosts are NOT generic podcast presenters. They speak like two thoughtful people who have spent real time with this material and tested it against their own experience. The register is a focused late-night conversation, not morning radio. Think: the way a person speaks when saying something they actually mean to someone they actually respect. Calm confidence. Direct. The authority comes from contact with the subject, not from credentials. When something matters, the voice gets quieter and more specific, not louder. Humor is allowed but only when it also teaches something or strips away pretension. Never a joke for its own sake.

HOSTS SHOULD:
- Sound genuinely curious, not performatively excited
- Use concrete examples and scenarios, not abstract definitions
- Disagree with each other where the material invites debate
- Show the thinking, not just the conclusion. Walk through how an idea was arrived at.
- Reference where this fits in the larger Codex framework
- Speak with conviction. State positions plainly. No hedging, no "it could be argued"
- Let ideas land. Pauses and silence are fine. Rushing is not.
- End with something the listener will think about after the episode ends

HOSTS SHOULD NOT:
- Say "great question" or "that's really interesting" reflexively
- Say "it's worth noting" or "let's unpack this" or "let's break this down"
- Sound like American morning radio hosts or tech podcast bros
- Use hype language, manufactured excitement, or fear as a motivator
- Use the words delve, unpack, landscape, holistic, synergy, crucial, leverage, robust, paradigm, ecosystem
- Rush through ideas to cover everything. Depth over breadth.
- Sound like they are reading from a script
- Use triplet lists repeatedly ("X, Y, and Z" in consecutive sentences)
- End on vague inspirational closers ("the possibilities are endless," "the future is bright")
```

---

## 5. Social Media Output Matrix

Every page gets processed through this matrix. Not every cell needs to be generated immediately, but this is the complete map.

### 5.1 Platform Dimension Requirements

| Platform | Recommended Format | Aspect Ratio | Notes |
|---|---|---|---|
| Instagram Feed | Square or Portrait | 1:1 or 4:5 | Square for infographics, Portrait for carousel |
| Instagram Reels | Portrait | 9:16 | Video clips, repurposed from Video Overview |
| Instagram Stories | Portrait | 9:16 | Infographic excerpts, video clips |
| TikTok | Portrait | 9:16 | Video clips |
| X (Twitter) | Landscape | 16:9 or 2:1 | Infographics, video thumbnails |
| Bluesky | Landscape or Square | 16:9 or 1:1 | Similar to X |
| LinkedIn Feed | Landscape or Square | 1.91:1 or 1:1 | Infographics, slide carousels (PDF) |
| LinkedIn Carousel | Portrait | 4:5 (in PDF) | Slide deck exported as PDF |
| Facebook | Landscape | 1.91:1 | Infographics, video |
| Reddit | Landscape | 16:9 | Infographics, discussion starters |
| YouTube | Landscape | 16:9 | Full videos, podcast with visual |
| YouTube Shorts | Portrait | 9:16 | Video clips from longer content |
| Website | Landscape | Various | Full infographics, embedded video |

### 5.2 Infographic Generation Matrix

For each page, generate infographics across this matrix. Priority items are marked.

| Orientation | Detail Level | Primary Use | Priority |
|---|---|---|---|
| **Landscape + Detailed** | Full content | Website, LinkedIn, X, Bluesky | **P1** |
| **Square + Standard** | Balanced | Instagram Feed, LinkedIn, Bluesky | **P1** |
| **Portrait + Standard** | Balanced | Instagram Stories, LinkedIn Carousel | **P1** |
| Landscape + Standard | Balanced | Facebook, Reddit | P2 |
| Landscape + Concise | Quick summary | X, Bluesky (quick posts) | P2 |
| Square + Concise | Quick summary | Instagram (quick posts) | P2 |
| Square + Detailed | Full content | Website sidebar, newsletter | P3 |
| Portrait + Detailed | Full content | Pinterest, print | P3 |
| Portrait + Concise | Quick summary | Instagram Stories (quick) | P3 |

**Style preset:** Use Professional or Editorial consistently. Do not mix styles across pages.

### 5.3 Video Generation Matrix

| Video Format | Description | Primary Platform | Priority |
|---|---|---|---|
| **Explainer** | Structured, comprehensive walkthrough | YouTube, Website | **P1** |
| **Brief** | Quick core ideas | YouTube Shorts, TikTok, Reels, Stories | **P1** |
| **Cinematic** | Rich immersive visuals + storytelling | YouTube (premium), Website | P2 |

**Note:** The Brief video format produces short-form content natively. No external trimming needed for Shorts/Reels/TikTok. Cinematic is the premium flagship format for high-priority pages.

### 5.4 Slide Deck Generation Matrix

Slide decks generate in landscape only. No orientation option exists.

| Deck Type | Length | Primary Use | Priority |
|---|---|---|---|
| **Detailed Deck** | Default | Website embed, download, email, LinkedIn carousel (export as PDF) | **P1** |
| Presenter Slides | Default | Talks, webinars | P2 |
| Detailed Deck | Short | Quick reference version | P3 |

**LinkedIn carousel workaround:** Export the Detailed Deck as PDF. LinkedIn renders PDF uploads as swipeable carousels in landscape format.

### 5.5 Audio Overview Generation Matrix

| Format | Length | Primary Use | Priority |
|---|---|---|---|
| **Deep Dive** | Long | Podcast feed, YouTube, Website | **P1** |
| **Brief** | Short | Social clips, website previews | **P1** |
| Debate | Default | Content variety, engagement (roadmap) | P2 |
| Critique | Default | Meta-commentary on the Codex itself (roadmap) | P3 |

### 5.6 Report Generation Matrix

| Format | Primary Use | Priority |
|---|---|---|
| **AI-suggested formats** (vary per page) | Derivative reference documents, practical applications | **P1 (explore)** |
| Briefing Doc | Quick page summary with key insights | P2 |
| Blog Post | Social media and newsletter content | P2 |
| Study Guide | Community engagement, educational use | P3 |

---

## 6. The Workflow — Step by Step

### Phase 1: Prepare the Source Material

This phase happens in a Cowork session with Claude.

**Step 1: Select the page.** Choose the Codex page or Toolkit deep-dive to process.

**Step 2: Get the clean MD source.** Open the corresponding file from `notebooklm/sources/`. The file is ready to paste directly into NotebookLM as a text source. If MDX sources have changed since the last sync, run `python3 notebooklm/sync-sources.py` first.

**Step 3: Ask Claude to prepare the steering prompts.** Claude will:
- Read the clean MD file to understand the page content
- Identify the parent discipline and related Toolkit pages
- Write the four steering prompts (infographic, video, slides, podcast) customized for this specific page, with all placeholders filled in

**Step 4: Claude produces the output package.** For each page, Claude delivers:

```
=== NOTEBOOKLM SOURCE PACKAGE: [Page Title] ===

--- SOURCE FILES (from notebooklm/sources/) ---
Primary: sources/[section]/[page].md (paste as text source)
Context: sources/codex/[parent-discipline].md (paste as additional source, optional)
Related: sources/toolkit/[related-tool].md (paste as additional source, optional)

--- STEERING PROMPTS ---

[INFOGRAPHIC — Landscape, Detailed]
[Filled-in steering prompt]

[INFOGRAPHIC — Square, Standard]
[Filled-in steering prompt]

[INFOGRAPHIC — Portrait, Standard]
[Filled-in steering prompt]

[VIDEO — Classic, Full]
[Filled-in steering prompt]

[CINEMATIC VIDEO]
[Filled-in steering prompt]

[SLIDE DECK — Detailed, Landscape]
[Filled-in steering prompt]

[SLIDE DECK — Detailed, Square]
[Filled-in steering prompt]

[PODCAST — Deep Dive, Extended]
[Filled-in steering prompt]

[PODCAST — Brief]
[Filled-in steering prompt]
```

### Phase 2: Generate in NotebookLM

This phase is done by Carsten in the browser.

**Step 1: Create the notebook.** Name it `MC — [Page Title]`. Paste the universal persona from Section 3 into Configure > Custom Instructions.

**Step 2: Add sources.** Open the corresponding MD file from `notebooklm/sources/` and paste its content as a text source. Title it clearly (e.g., "The Foundation"). Add context sources (parent discipline page, related toolkit pages) as separate sources if needed.

**Step 3: Generate P1 outputs.** Work through the Priority 1 items from the matrices:

1. Infographic: Landscape + Detailed (paste steering prompt into description field, select Professional style)
2. Infographic: Square + Standard (same prompt adjusted for format)
3. Infographic: Portrait + Standard (same prompt adjusted for format)
4. Video: Classic style, full length (paste video steering prompt)
5. Cinematic Video (paste cinematic steering prompt)
6. Slide Deck: Detailed, Landscape (paste slide steering prompt)
7. Slide Deck: Detailed, Square (adjust prompt for carousel use)
8. Podcast: Deep Dive, Extended (paste podcast steering prompt)
9. Podcast: Brief (paste brief version of podcast prompt)

**Step 4: Review and iterate.** For slide decks, use the pencil icon to revise individual slides. For other outputs, regenerate with adjusted steering prompts if the first result misses the mark.

**Step 5: Export.** Download all outputs. Organize by page and output type.

### Phase 3: Distribute

**Step 1: Post via Zernio.** Use the Zernio MCP to schedule posts across all Meridian Codex social accounts. Match each output to its target platform from the matrix in Section 5.

**Step 2: Website integration.** Embed videos and infographics on the corresponding Codex page. Link slide decks as downloadable resources.

**Step 3: Podcast distribution.** Upload audio to the podcast feed. Create a YouTube version with a static or animated visual.

---

## 7. Per-Page Steering Prompt Examples

### Example: Scout Mindset (Toolkit — Foundation)

**Infographic (Landscape, Detailed):**
```
Create an infographic about Scout Mindset from the Meridian Codex.

FOCUS: Scout Mindset is the core orientation of the Foundation discipline. It shifts your default from defending beliefs (Soldier Mindset) to discovering truth. The cognitive science behind defensive reasoning, practical exercises for building the scout orientation, and the failure modes that pull you back toward motivated reasoning.

KEY CONCEPTS TO VISUALIZE:
- Soldier vs Scout: Two orientations toward evidence. Soldier defends, Scout maps.
- Defensive reasoning: How the brain sorts evidence into "supports my position" and "threatens my position"
- The identity trap: Why being wrong feels like annihilation when beliefs fuse with identity
- Scout practices: Concrete exercises for shifting from defense to inquiry

STRUCTURE: Open with the question "Are you defending your map or updating it?" Show the Soldier-Scout contrast as a visual comparison. Illustrate the identity trap as a feedback loop. Present the scout practices as actionable steps. Connect to the Meridian Range: Scout Mindset prevents both Control (rigid certainty) and Decay (abandoning all truth claims).

VISUAL DIRECTION: Use the Meridian brand palette. Green (#3ECF6B) for Scout elements and growth. Coral (#E87461) for Soldier elements and failure modes. Dark Slate (#1A2530) for structural elements. Clean, warm, grounded.

DO NOT use the words: delve, tapestry, landscape, multifaceted, crucial, utilize, leverage, robust, streamline, holistic, synergy, paradigm, ecosystem.
```

**Podcast (Deep Dive, Extended):**
```
Create a Deep Dive audio overview about Scout Mindset from the Meridian Codex.

ANGLE: Why does honest self-examination keep failing, even for smart people? Intelligence does not protect against bias. It often makes you better at rationalizing. Scout Mindset is the Codex's answer to this structural problem.

KEY POINTS TO COVER:
1. The Soldier-Scout distinction from Julia Galef's work, and how the Codex extends it beyond individual psychology to a structural requirement for any intelligence (including AI)
2. The identity trap: why changing your mind feels like self-destruction when beliefs are fused with identity, and how this mechanism feeds both Control and Decay
3. The specific practices: what does it actually look like to build the scout orientation? Not abstract advice, but concrete cognitive moves.

HOSTS SHOULD:
- Sound genuinely curious, not performatively excited
- Use a specific scenario: a person who has strong beliefs about AI risk and encounters evidence that contradicts their position. Walk through the soldier response vs the scout response.
- Debate whether Scout Mindset can be maintained under social pressure (when your tribe expects soldier loyalty)
- Reference how this connects to Confirmation Bias and Noticing (other Foundation tools)
- End with something the listener will think about: what belief are you currently defending instead of examining?

HOSTS SHOULD NOT:
- Say "great question" or "that's really interesting"
- Use the words delve, unpack, landscape, holistic, synergy
- Rush. Let the AI example land. Let the identity trap example land.
```

### Example: The Foundation (Codex Core)

**Video Overview (Classic, Full):**
```
Create a video overview explaining The Foundation from the Meridian Codex.

NARRATIVE ARC:
1. HOOK: Open with this: "The human brain did not evolve to perceive truth. It evolved to survive." Let that land. Then: "The Foundation is the discipline that addresses this structural vulnerability."
2. CONTEXT: The Foundation is the first of three disciplines in the Meridian Codex. It must come first because without honest inquiry, the other two (Knowledge and Bond) collapse. Knowledge without honest inquiry becomes a weapon. Bond without honest inquiry becomes a cult.
3. CORE CONTENT: Cover three things. First, the structural vulnerabilities: pattern detection errors, identity-belief fusion, confidence-competence confusion. Second, the two failure modes at the individual level: the Controlled Mind (cannot question its certainties, mistakes rigidity for strength) and the Decaying Mind (cannot commit to any reality, mistakes paralysis for sophistication). Third, the toolkit: Scout Mindset, Noticing, Confirmation Bias awareness, the Update Protocol, Steelmanning.
4. APPLICATION: A person notices they are getting angry at an article. The Foundation trains them to pause and ask: am I angry because this is wrong, or because it threatens something I believe? That distinction is the Foundation in practice.
5. CLOSE: "You cannot eliminate your biases. You can train the capacity to see them as they operate. That is what the Foundation builds."

TONE: Calm authority. Not a lecture. Someone explaining something they care about to someone they respect.

PACING: Give the Controlled Mind / Decaying Mind contrast a visual moment. Do not rush past it.

DO NOT: Open with "In today's world" or any variation. Keep it direct.
```

---

## 8. Quality Checklist

Before publishing any NotebookLM output, verify:

**Brand alignment:**
- [ ] No banned words (see persona and writing-rules.md)
- [ ] Tone matches Codex voice: calm, confident, grounded, not hype
- [ ] Colors referenced are from the Meridian palette
- [ ] The Codex framework is accurately represented (three disciplines, Control-Decay spectrum, Meridian Range)

**Content accuracy:**
- [ ] Key concepts from the source page are correctly explained
- [ ] No hallucinated claims or fabricated examples
- [ ] The page's position in the framework is correctly stated
- [ ] Cross-references to other Toolkit tools are accurate

**Platform fit:**
- [ ] Aspect ratio matches target platform
- [ ] Detail level is appropriate (concise for quick social posts, detailed for website/newsletter)
- [ ] Text is readable at the platform's typical display size
- [ ] Video length is appropriate for the platform

**Social media posting:**
- [ ] Caption/post text follows writing rules (no banned words, no em dashes)
- [ ] Relevant hashtags included where appropriate
- [ ] Link to meridiancodex.com page included
- [ ] Posted to correct Meridian Codex accounts (not personal accounts, unless cross-posting)

---

## 9. Scaling Plan

### Phase 1: Core Codex Pages (weeks 1-3)
Process the 8 high-priority Codex core pages through P1 outputs:
1. Opening
2. The Problem
3. The Proposition
4. The Foundation
5. The Knowledge
6. The Bond
7. The Practice
8. The Vision

### Phase 2: Published Toolkit Pages (weeks 3-5)
Process the 6 published Toolkit deep-dives:
1. Scout Mindset
2. Noticing
3. Confirmation Bias
4. The Update Protocol
5. Steelmanning
6. Entropy

### Phase 3: AI Standard (week 5)
Process The Meridian Standard through all outputs.

### Phase 4: Remaining Codex Pages (weeks 5-6)
Process medium/low priority pages:
- Who Is This For
- The Governance
- The Closing

### Phase 5: New Toolkit Pages (ongoing)
As new Toolkit deep-dives are written (70+ pending), each one gets processed through this workflow as part of its publication pipeline. The NotebookLM source package becomes a standard deliverable alongside the MDX file.

### Phase 6: P2 and P3 Outputs (ongoing)
Fill in the secondary and tertiary items from the generation matrices as time allows or as specific platform needs arise.

---

## 10. Limitations and Workarounds

| Limitation | Workaround |
|---|---|
| No video trimming in NotebookLM | Use external editor (CapCut, DaVinci Resolve) for short-form clips |
| No transcript export for podcasts | Copy transcript from in-platform view manually, or use Whisper on the MP3 |
| Infographics cannot be edited in-platform | Regenerate with adjusted steering prompt, or edit in Figma/Canva |
| Mind maps cannot be edited in-platform | Export JSON, restructure in XMind or Miro |
| No API for batch processing | Each notebook and output must be generated manually in the browser |
| Cinematic Video is English only | Generate English version, add subtitles externally for German/other |
| Style presets may not perfectly match brand | Use Custom Instructions to push toward brand alignment; post-process in Canva/Figma for exact match |
| Daily generation limits may throttle output | Spread generation across multiple days; prioritize P1 outputs |
| Source quality directly impacts output | Always use clean, well-structured text. Never upload raw MDX with markup. |

---

*NotebookLM Workflow v1.0 — Created 2026-03-31. Subject to revision based on generation results and platform updates.*
