export interface Project {
  title: string
  url: string
  showcaseUrl: string
  repositoryUrl: string
  excerpt: string | undefined
  license: string
  licenseUrl: string
  developmentStatus: string
  techs: string[]
  date: Date
}
