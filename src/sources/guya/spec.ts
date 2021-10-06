export type MangaSpec = {
  slug: string
  title: string
  description: string
  author: string
  artist: string
  groups: Record<string, string>
  cover: string
  preferred_sort: string[]
  chapters: Record<string, ChapterSpec>
}

type ChapterSpec = {
  volume: string
  title: string
  folder: string
  groups: Record<string, string[]>
  release_date: Record<string, number>
}