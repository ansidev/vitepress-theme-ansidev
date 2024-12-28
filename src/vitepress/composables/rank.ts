export const useRank = (arr: string[]) => {
  const rank: Record<string, number> = arr.reduce(
    (acc: Record<string, number>, str: string) => {
      acc[str] = (acc[str] || 0) + 1 // Increment the count if the key exists, otherwise initialize to 1
      return acc
    },
    {}
  )

  return Object.entries(rank)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
}
