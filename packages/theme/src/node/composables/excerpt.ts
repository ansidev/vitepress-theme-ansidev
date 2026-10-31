import MarkdownItLib from 'markdown-it'

const markdown = new MarkdownItLib({ html: false, linkify: true, breaks: false })

// Excerpt strings produced by VitePress createContentLoader arrive already
// rendered as block-level HTML (usually a single "<p>...</p>" wrapper), while
// excerpts coming from gray-matter / useMarkdownFrontmatter are still raw
// markdown. Detect the former so we don't double-render (and escape) it.
const BLOCK_HTML_RE = /^<(?:p|div|ul|ol|dl|h[1-6]|blockquote|pre|table)(?:\s[^>]*)?>/

const stripSingleParagraphWrapper = (html: string): string => {
  if (!html.startsWith('<p>') || !html.endsWith('</p>')) return html
  const inner = html.slice(3, -4)
  // Only unwrap when there is exactly one top-level paragraph: if any other
  // closing paragraph tag remains, the output is multi-paragraph and stays
  // block-level.
  if (inner.includes('</p>')) return html
  return inner
}

/**
 * Normalizes a post/project excerpt into safe HTML suitable for v-html.
 *
 * Excerpts may originate raw (gray-matter) or pre-rendered (createContentLoader).
 * Raw input is rendered with markdown-it with html disabled, so inline markdown
 * (links, emphasis, inline code) works and source HTML is escaped (no injection).
 * Excess `undefined`/empty input yields undefined.
 */
export const useExcerptHtml = (excerpt?: string): string | undefined => {
  const trimmed = excerpt?.trim()
  if (!trimmed) return undefined

  const html = BLOCK_HTML_RE.test(trimmed) ? trimmed : markdown.render(trimmed).trim()
  return stripSingleParagraphWrapper(html).trim() || undefined
}
