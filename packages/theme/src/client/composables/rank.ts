export const useRank = <T extends string>(arr: T[]): Record<T, number> => {
  const rank: Record<T, number> = arr.reduce(
    (acc: Record<T, number>, item: T) => {
      acc[item] = (acc[item] || 0) + 1 // Increment the count if the key exists, otherwise initialize to 1
      return acc
    },
    {} as Record<T, number>,
  )

  const entries = Object.entries(rank) as [T, number][]

  return Object.fromEntries(entries.sort(([, a], [, b]) => b - a)) as Record<T, number>
}
