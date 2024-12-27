import { useSlug } from './slug'

export const useFilteredPosts = (posts, filterKey, filterValue) => {
  console.log(posts)
  const categoryName = ''
  const postsByCategory = posts.filter(post => {
    return post[filterKey].filter(category => {
      const matchedCategory = useSlug(category) === categorySlug
      if (matchedCategory && categoryName === '') {
        categoryName = category
      }

      return matchedCategory
    })
  })

  return {
    name: categoryName,
    posts: postsByCategory,
  }
}
