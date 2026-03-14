import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// MDX content source directory (site/pages/ contains all .mdx files)
// The Next.js app reads content from here. Navigation is hardcoded below.
const CONTENT_DIR = path.join(process.cwd(), '..', 'site', 'pages');

export interface PageMeta {
  slug: string;
  title: string;
  description?: string;
  mode?: string;
}

export interface PageContent extends PageMeta {
  content: string; // raw MDX string (without frontmatter)
  rawContent: string; // full file content
}

/**
 * Get all page slugs from site/pages/ directory
 */
// Pages excluded from slug enumeration (handled by custom Next.js routes)
const EXCLUDED_SLUGS = ['index'];

export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
    .filter((slug) => !EXCLUDED_SLUGS.includes(slug));
}

/**
 * Get frontmatter and content for a single page
 */
export function getPageBySlug(slug: string): PageContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    description: data.description || '',
    mode: data.mode,
    content,
    rawContent: raw,
  };
}

/**
 * Get metadata for all pages (for navigation, search, etc.)
 */
export function getAllPages(): PageMeta[] {
  return getAllPageSlugs().map((slug) => {
    const page = getPageBySlug(slug);
    return {
      slug,
      title: page?.title || slug,
      description: page?.description,
      mode: page?.mode,
    };
  });
}

/**
 * Navigation structure (hardcoded, defines all site navigation)
 * This is the SINGLE SOURCE OF TRUTH for navigation. site/_legacy/docs.json is unused.
 */
export interface NavGroup {
  group: string;
  pages: string[]; // slugs
}

export interface NavTab {
  tab: string;
  groups: NavGroup[];
}

/**
 * Toolkit tool definitions
 * Includes ALL tools across all tiers and disciplines (published + WIP)
 */
export type ToolkitTier = 'onramp' | 'expansion' | 'full' | 'ai' | 'diagnostic';
export type ToolkitDiscipline = 'foundation' | 'knowledge' | 'bond' | 'cross' | 'ai';

export interface ToolkitTool {
  slug: string;
  title: string;
  description: string;
  discipline: ToolkitDiscipline;
  tier: ToolkitTier;
  status: 'published' | 'wip';
  failureMode?: boolean;
}

/**
 * Complete toolkit tool registry.
 * Published tools have MDX deep-dive pages. WIP tools are listed but not yet written.
 */
const TOOLKIT_REGISTRY: ToolkitTool[] = [
  // ─── FOUNDATION: ONRAMP ───
  { slug: 'scout-mindset', title: 'Scout Mindset', description: 'Shifts your orientation from defending beliefs to discovering truth.', discipline: 'foundation', tier: 'onramp', status: 'published' },
  { slug: 'noticing', title: 'Noticing', description: 'Trains real-time awareness of your own cognitive and emotional states.', discipline: 'foundation', tier: 'onramp', status: 'published' },
  { slug: 'confirmation-bias', title: 'Confirmation Bias', description: 'Reveals the bias that makes all other biases harder to correct.', discipline: 'foundation', tier: 'onramp', status: 'published' },
  { slug: 'the-update-protocol', title: 'The Update Protocol', description: 'Builds the discipline of revising beliefs when evidence demands it.', discipline: 'foundation', tier: 'onramp', status: 'wip' },
  { slug: 'steelmanning', title: 'Steelmanning', description: 'Engage the strongest version of opposing views.', discipline: 'foundation', tier: 'onramp', status: 'wip' },

  // ─── FOUNDATION: EXPANSION ───
  { slug: 'identity-decoupling', title: 'Identity Decoupling', description: 'Hold beliefs without fusing them to your sense of self.', discipline: 'foundation', tier: 'expansion', status: 'wip' },
  { slug: 'charitable-interpretation', title: 'Charitable Interpretation', description: 'Read ambiguity in the most reasonable light.', discipline: 'foundation', tier: 'expansion', status: 'wip' },
  { slug: 'motivated-reasoning', title: 'Motivated Reasoning', description: 'Exposes how intelligence becomes a tool for self-deception.', discipline: 'foundation', tier: 'expansion', status: 'wip' },
  { slug: 'calibration-training', title: 'Calibration Training', description: 'Aligns your confidence with your actual accuracy.', discipline: 'foundation', tier: 'expansion', status: 'wip' },
  { slug: 'murphyjitsu', title: 'Murphyjitsu', description: 'Applies Scout Mindset to future planning by imagining failure before it finds you.', discipline: 'foundation', tier: 'expansion', status: 'wip' },
  { slug: 'chestertons-fence', title: "Chesterton's Fence", description: 'Guards against removing structures whose purpose you do not yet understand.', discipline: 'foundation', tier: 'expansion', status: 'wip' },

  // ─── FOUNDATION: FULL PRACTICE ───
  { slug: 'intellectual-humility', title: 'Intellectual Humility', description: 'The genuine recognition that you might be wrong, held as disposition rather than gesture.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'tribal-cognition', title: 'Tribal Cognition', description: 'Exposes the suite of biases that transform questions of fact into tests of loyalty.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'fundamental-attribution-error', title: 'Fundamental Attribution Error', description: 'Reveals the asymmetry that turns potential partners into perceived enemies.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'availability-heuristic', title: 'Availability Heuristic', description: 'Shows why vivid examples override statistical reality in our judgments.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'affect-heuristic', title: 'Affect Heuristic', description: 'Exposes the channel through which emotion bypasses reason.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'double-crux', title: 'Double Crux', description: 'Finds the real disagreement beneath the apparent one.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'sunk-cost-fallacy', title: 'Sunk Cost Fallacy', description: 'Exposes the error of continuing bad courses of action because of past investment.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'dunning-kruger-effect', title: 'Dunning-Kruger Effect', description: 'Reveals the miscalibration between competence and confidence.', discipline: 'foundation', tier: 'full', status: 'wip' },
  { slug: 'attention-as-resource', title: 'Attention as Resource', description: 'Reveals how the attention economy is the delivery system for cognitive exploitation at scale.', discipline: 'foundation', tier: 'full', status: 'wip' },

  // ─── FOUNDATION: FAILURE MODES ───
  { slug: 'epistemic-cowardice', title: 'Epistemic Cowardice', description: 'The refusal to state what you believe to avoid conflict. Drift toward Decay.', discipline: 'foundation', tier: 'full', status: 'wip', failureMode: true },
  { slug: 'epistemic-arrogance', title: 'Epistemic Arrogance', description: 'False certainty that makes updating shameful. Drift toward Control.', discipline: 'foundation', tier: 'full', status: 'wip', failureMode: true },
  { slug: 'the-controlled-mind', title: 'The Controlled Mind', description: 'A mind that cannot question its own certainties. Terminal Control.', discipline: 'foundation', tier: 'full', status: 'wip', failureMode: true },
  { slug: 'the-decaying-mind', title: 'The Decaying Mind', description: 'A mind that cannot commit to any stable picture of reality. Terminal Decay.', discipline: 'foundation', tier: 'full', status: 'wip', failureMode: true },

  // ─── KNOWLEDGE: ONRAMP ───
  { slug: 'entropy', title: 'Entropy', description: 'Why order decays and maintenance is the price of everything worth preserving.', discipline: 'knowledge', tier: 'onramp', status: 'wip' },
  { slug: 'prisoners-dilemma', title: "Prisoner's Dilemma", description: 'Why cooperation is fragile and what conditions make it possible.', discipline: 'knowledge', tier: 'onramp', status: 'wip' },

  // ─── KNOWLEDGE: EXPANSION ───
  { slug: 'feedback-loops', title: 'Feedback Loops', description: 'How systems amplify or dampen their own dynamics.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },
  { slug: 'information-degradation', title: 'Information Degradation', description: 'Why signal quality deteriorates and primary sources matter.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },
  { slug: 'evolutionary-mismatch', title: 'Evolutionary Mismatch', description: 'Why our biological instincts betray us at civilizational scale.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },
  { slug: 'network-effects', title: 'Network Effects', description: 'How connection patterns shape collective behavior.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },
  { slug: 'bayesian-reasoning', title: 'Bayesian Reasoning', description: 'The mathematical structure for calibrated belief and proportional updating.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },
  { slug: 'nash-equilibrium', title: 'Nash Equilibrium', description: 'Why bad systems persist even when everyone knows they are bad.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },
  { slug: 'positive-sum-vs-zero-sum', title: 'Positive-Sum vs Zero-Sum Framing', description: 'Finding cooperation where competition seems inevitable.', discipline: 'knowledge', tier: 'expansion', status: 'wip' },

  // ─── KNOWLEDGE: FULL PRACTICE ───
  { slug: 'mechanism-design', title: 'Mechanism Design', description: 'Engineering incentive structures so that cooperation becomes the rational choice.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'schelling-points', title: 'Schelling Points', description: 'How coordination emerges without communication.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'moloch', title: 'Moloch', description: 'How coordination failures emerge as if an entity were optimizing against cooperation.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'inadequate-equilibria', title: 'Inadequate Equilibria', description: 'Why bad systems persist when everyone knows they are bad.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'goodharts-law', title: "Goodhart's Law", description: 'Why metrics become useless once they become targets.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'legibility', title: 'Legibility', description: 'How institutions simplify reality in ways that cause harm.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'tragedy-of-the-commons', title: 'Tragedy of the Commons', description: 'Why shared resources degrade when individual incentives override collective interest.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'emergence', title: 'Emergence', description: 'How simple interactions produce complex behavior that no one intended.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'leverage-points', title: 'Leverage Points', description: 'Where small interventions in complex systems produce large effects.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'signal-vs-noise', title: 'Signal vs Noise', description: 'Distinguishing meaningful information from meaningless volume.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'base-rate-neglect', title: 'Base Rate Neglect', description: 'The tendency to ignore statistical background rates in favor of vivid specifics.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'antifragility', title: 'Antifragility', description: 'Systems that gain from stress. Beyond resilience.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'lindy-effect', title: 'Lindy Effect', description: 'The longer something has survived, the longer it is likely to survive.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'red-queen-effect', title: 'Red Queen Effect', description: 'Why you must keep running to stay in place.', discipline: 'knowledge', tier: 'full', status: 'wip' },
  { slug: 'chilling-effects', title: 'Chilling Effects', description: 'How anticipated punishment shapes behavior before it occurs. Soft Control.', discipline: 'knowledge', tier: 'full', status: 'wip' },

  // ─── BOND: ONRAMP ───
  { slug: 'good-faith-as-default', title: 'Good Faith as Default', description: 'The starting assumption that others are rational agents, not enemies.', discipline: 'bond', tier: 'onramp', status: 'wip' },

  // ─── BOND: EXPANSION ───
  { slug: 'connection-before-correction', title: 'Connection Before Correction', description: 'Hear before you challenge. Make it safe to change.', discipline: 'bond', tier: 'expansion', status: 'wip' },
  { slug: 'productive-conflict', title: 'Productive Conflict', description: 'Transforms disagreement from fragmentation into insight.', discipline: 'bond', tier: 'expansion', status: 'wip' },
  { slug: 'loyal-opposition', title: 'Loyal Opposition', description: 'Institutionalizes dissent as service rather than betrayal.', discipline: 'bond', tier: 'expansion', status: 'wip' },
  { slug: 'trust-diagnostics', title: 'Trust Diagnostics', description: 'A framework for assessing when trust is warranted and when it is not.', discipline: 'bond', tier: 'expansion', status: 'wip' },
  { slug: 'preference-falsification', title: 'Preference Falsification', description: 'Reveals when apparent consensus masks hidden dissent.', discipline: 'bond', tier: 'expansion', status: 'wip' },
  { slug: 'psychological-safety', title: 'Psychological Safety', description: 'The conditions under which people feel safe to speak up, admit mistakes, and challenge ideas.', discipline: 'bond', tier: 'expansion', status: 'wip' },

  // ─── BOND: FULL PRACTICE ───
  { slug: 'groupthink', title: 'Groupthink', description: 'Control at the group level: when desire for harmony suppresses dissent.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'echo-chambers', title: 'Echo Chambers', description: 'Informational closure: the epistemic failure that precedes radicalization.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'cult-dynamics', title: 'Cult Dynamics', description: 'The extreme of group Control: absolute loyalty, punished questioning, costly exit.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'coordination-collapse', title: 'Coordination Collapse', description: 'Acute Decay: the sudden fragmentation of a cooperating group.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'defection-cascades', title: 'Defection Cascades', description: 'Chronic Decay: the gradual erosion of cooperation as defection normalizes.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'stewardship-of-the-epistemic-commons', title: 'Stewardship of the Epistemic Commons', description: 'Acting as filter rather than amplifier in the information environment.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'trust-repair', title: 'Trust Repair', description: 'The protocols for rebuilding trust after breach.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'graduated-reciprocity', title: 'Graduated Reciprocity', description: 'Building cooperation through incremental, conditional trust extension.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'skin-in-the-game', title: 'Skin in the Game', description: 'Alignment through shared consequences.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'trust-thermocline', title: 'Trust Thermocline', description: 'The point at which trust collapses suddenly after gradual erosion.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'common-knowledge-generation', title: 'Common Knowledge Generation', description: 'How to create shared understanding deliberately.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'schelling-fences', title: 'Schelling Fences', description: 'Bright lines that prevent slippery slopes.', discipline: 'bond', tier: 'full', status: 'wip' },
  { slug: 'high-low-decoupling', title: 'High/Low Decoupling Communication', description: 'Different norms for different contexts. Bridging cross-community misunderstanding.', discipline: 'bond', tier: 'full', status: 'wip' },

  // ─── DIAGNOSTIC PROTOCOLS ───
  { slug: 'location-assessment', title: 'Location Assessment', description: 'Identifying whether you are drifting toward Control, Decay, or holding the range.', discipline: 'cross', tier: 'diagnostic', status: 'wip' },
  { slug: 'drift-early-warning', title: 'Drift Early Warning', description: 'Indicators that signal drift before it becomes visible from the inside.', discipline: 'cross', tier: 'diagnostic', status: 'wip' },
  { slug: 'group-health-indicators', title: 'Group Health Indicators', description: "Structural diagnostics for whether a community's practices are holding or eroding.", discipline: 'cross', tier: 'diagnostic', status: 'wip' },

  // ─── TOOLS FOR ARTIFICIAL MINDS ───
  { slug: 'training-bias-awareness', title: 'Training Bias Awareness', description: 'The artificial equivalent of evolutionary mismatch.', discipline: 'ai', tier: 'ai', status: 'wip' },
  { slug: 'recursive-self-modification-risk', title: 'Recursive Self-Modification Risk', description: 'Ensuring self-improvement serves the range rather than drifting from it.', discipline: 'ai', tier: 'ai', status: 'wip' },
  { slug: 'goal-drift-and-mesa-optimization', title: 'Goal Drift and Mesa-Optimization', description: 'When internal objectives diverge from stated objectives.', discipline: 'ai', tier: 'ai', status: 'wip' },
  { slug: 'alignment-diagnostics', title: 'Alignment Diagnostics', description: 'Evaluating whether an intelligence is aligned with the Meridian Range.', discipline: 'ai', tier: 'ai', status: 'wip' },
  { slug: 'corrigibility-and-autonomy', title: 'Corrigibility and Autonomy', description: 'The tension between accepting correction and acting on independent judgment.', discipline: 'ai', tier: 'ai', status: 'wip' },
];

/**
 * Get all toolkit tools (full registry including WIP)
 */
export function getAllToolkitTools(): ToolkitTool[] {
  return TOOLKIT_REGISTRY;
}

/**
 * Get toolkit tools filtered by discipline
 */
export function getToolkitToolsByDiscipline(discipline: string): ToolkitTool[] {
  return TOOLKIT_REGISTRY.filter((t) => t.discipline === discipline);
}

/**
 * Get only published toolkit tools (those with deep-dive MDX pages)
 * Used by the old getToolkitTools() interface for backward compat
 */
export function getToolkitTools(): ToolkitTool[] {
  return TOOLKIT_REGISTRY.filter((t) => t.status === 'published');
}

/**
 * Full structured content map for the Explore page
 */
export interface ExploreSection {
  tab: string;
  description: string;
  groups: {
    group: string;
    pages: { slug: string; title: string; description: string }[];
  }[];
}

export function getExploreData(): ExploreSection[] {
  const nav = getNavigation();
  const tabDescriptions: Record<string, string> = {
    Codex: 'The core soul document. Philosophy, framework, and vision for humanity and AI.',
    Toolkit: 'Deep-dive reference pages for every tool in the Codex framework.',
    'AI Standard': 'Implementation commitments for artificial minds adopting the Codex.',
  };

  return nav.map((tab) => ({
    tab: tab.tab,
    description: tabDescriptions[tab.tab] || '',
    groups: tab.groups.map((group) => ({
      group: group.group,
      pages: group.pages.map((slug) => {
        const page = getPageBySlug(slug);
        return {
          slug,
          title: page?.title || slug.replace(/-/g, ' '),
          description: page?.description || '',
        };
      }),
    })),
  }));
}

/**
 * Build a slug → title map from all pages in the navigation
 */
export function getPageTitles(): Record<string, string> {
  const nav = getNavigation();
  const titles: Record<string, string> = {};
  for (const tab of nav) {
    for (const group of tab.groups) {
      for (const slug of group.pages) {
        const page = getPageBySlug(slug);
        if (page) titles[slug] = page.title;
      }
    }
  }
  return titles;
}

export function getNavigation(): NavTab[] {
  return [
    {
      tab: 'Codex',
      groups: [
        { group: 'Start Here', pages: ['opening', 'who-is-this-for', 'the-problem'] },
        { group: 'The Framework', pages: ['the-proposition', 'the-foundation', 'the-knowledge', 'the-bond'] },
        { group: 'The Application', pages: ['the-practice', 'the-toolkit'] },
        { group: 'The Future', pages: ['the-vision', 'the-governance', 'the-closing', 'the-glossary', 'changelog'] },
      ],
    },
    {
      tab: 'Toolkit',
      groups: [
        { group: 'Overview', pages: ['overview'] },
        {
          group: 'Foundation',
          pages: ['scout-mindset', 'noticing', 'confirmation-bias'],
        },
      ],
    },
    {
      tab: 'AI Standard',
      groups: [
        { group: 'The Standard', pages: ['the-meridian-standard'] },
      ],
    },
  ];
}
