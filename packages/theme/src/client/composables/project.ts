export const useProjectStatusStyle = (developmentStatus: string) => {
  switch (developmentStatus) {
    case 'active':
      return {
        fontSize: 'text-sm',
        backgroundColor: 'bg-green-100',
        darkBackgroundColor: 'dark:bg-green-800',
        textColor: 'text-green-800',
        darkTextColor: 'dark:text-green-100'
      }
    case 'inactive':
      return {
        fontSize: 'text-sm',
        backgroundColor: 'bg-yellow-100',
        darkBackgroundColor: 'dark:bg-yellow-800',
        textColor: 'text-yellow-800',
        darkTextColor: 'dark:text-yellow-100'
      }
    case 'unmaintained':
      return {
        fontSize: 'text-sm',
        backgroundColor: 'bg-red-100',
        darkBackgroundColor: 'dark:bg-red-800',
        textColor: 'text-red-800',
        darkTextColor: 'dark:text-red-100'
      }
    default:
      return {}
  }
}
