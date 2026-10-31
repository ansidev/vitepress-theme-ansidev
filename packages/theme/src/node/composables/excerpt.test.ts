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

  it('strips script/style/iframe elements from already-rendered excerpts', () => {
    expect(useExcerptHtml("<p>before<script>alert('xss')</script>after</p>")).toBe('beforeafter')
    expect(useExcerptHtml('<p>clean <style>.x{}</style>text</p>')).toBe('clean text')
    expect(useExcerptHtml('<p>see <iframe src="https://evil.example"></iframe>this</p>')).toBe('see this')
  })

  it('escapes non-block HTML that is not pre-rendered output', () => {
    // <img>/<a> are not block-level, so they take the markdown-it path and are
    // escaped (quotes included) rather than sanitized.
    expect(useExcerptHtml('<img src="x.png" onerror="alert(1)">')).toBe(
      '&lt;img src=&quot;x.png&quot; onerror=&quot;alert(1)&quot;&gt;',
    )
  })

  it('strips event handler attributes from already-rendered excerpts', () => {
    // Sanitized block HTML keeps its <p> wrapper only when multi-paragraph;
    // a single-paragraph <p> is unwrapped after sanitizing.
    expect(useExcerptHtml("<p onclick='alert(1)'>text</p>")).toBe('text')
  })

  it('neutralizes javascript: URLs in already-rendered excerpts', () => {
    expect(useExcerptHtml('<p><a href="javascript:alert(1)">click</a></p>')).toBe('<a>click</a>')
  })
})
