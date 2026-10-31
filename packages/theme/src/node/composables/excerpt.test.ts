import { describe, expect, it } from 'vitest'
import { useExcerptHtml } from './excerpt'

describe('useExcerptHtml', () => {
  it('returns undefined for undefined, empty, and whitespace input', () => {
    expect(useExcerptHtml(undefined)).toBeUndefined()
    expect(useExcerptHtml('')).toBeUndefined()
    expect(useExcerptHtml('   ')).toBeUndefined()
  })

  it('strips the outer paragraph wrapper from a single raw markdown paragraph', () => {
    expect(useExcerptHtml('Hello world')).toBe('Hello world')
    expect(useExcerptHtml('One **bold** link text')).toBe('One <strong>bold</strong> link text')
  })

  it('renders inline markdown links', () => {
    expect(useExcerptHtml('Read the [docs](https://example.com) here')).toBe(
      'Read the <a href="https://example.com">docs</a> here',
    )
  })

  it('renders inline code', () => {
    expect(useExcerptHtml('Use `pnpm build` to compile')).toBe('Use <code>pnpm build</code> to compile')
  })

  it('renders multi-paragraph excerpts verbatim', () => {
    const result = useExcerptHtml('First paragraph.\n\nSecond paragraph.')
    expect(result).toBe('<p>First paragraph.</p>\n<p>Second paragraph.</p>')
  })

  it('escapes raw HTML in markdown input', () => {
    expect(useExcerptHtml('Inspect <script>x</script> carefully')).toBe(
      'Inspect &lt;script&gt;x&lt;/script&gt; carefully',
    )
  })

  it('is idempotent for already-rendered single paragraph excerpts', () => {
    expect(useExcerptHtml('Some [link](https://example.com)')).toBe('Some <a href="https://example.com">link</a>')
    const rendered = '<p>Already rendered excerpt.</p>\n'
    expect(useExcerptHtml(rendered)).toBe('Already rendered excerpt.')
  })

  it('preserves multi-paragraph already-rendered excerpts', () => {
    expect(useExcerptHtml('<p>First.</p>\n<p>Second.</p>')).toBe('<p>First.</p>\n<p>Second.</p>')
  })
})
