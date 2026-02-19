import type { PostDate } from '../types'

export const usePostDate: (raw: Date) => PostDate = (raw: Date) => {
  const date = raw instanceof Date ? raw : new Date(raw as string)
  date.setUTCHours(12)
  return {
    time: +date,
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    year: date.toLocaleDateString('en-US', { year: 'numeric' }),
  }
}
