export const useSlug = (str: string) => {
  const s = str.replace(/#/, '-sharp-').replace(/\./, '-dot-').replace(/-$/, '')
  return s
    .toLowerCase()
    .normalize('NFD') // Decompose Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/đ/g, 'd') // Handle Vietnamese "đ"
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, '') // Remove leading or trailing dashes
}

export const useSlugFilter = (slug: string) => (str: string) =>
  useSlug(str) === slug
