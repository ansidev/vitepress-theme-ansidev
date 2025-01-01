export const useRank = <T extends string>(
  arr: T[],
): Record<T, number> => {
  const rank: Record<T, number> = arr.reduce(
    (acc: Record<T, number>, item: T) => {
      acc[item] = (acc[item] || 0) + 1 // Increment the count if the key exists, otherwise initialize to 1
      return acc
    },
    {} as Record<T, number>,
  )

  return Object.entries(rank)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
    .reduce(
      (result, [key, value]) => ({ ...result, [key as T]: value }),
      {} as Record<T, number>,
    )
}
