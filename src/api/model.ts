export enum MangaStatus {
  UNKNOWN,
  ONGOING,
  COMPLETED,
  LICENSED
}

export type Manga = {
  id: string
  source: string
  title: string
  cover: string
  status: MangaStatus
  chapters: Chapter[]
  altTitles?: string[]
  authors?: string[]
  artists?: string[]
  tags?: string[]
  description?: string
}

export type Chapter = {
  id: string
  number: number
  volume?: number
  title?: string
  uploadDate?: number
  scanlators?: string[]
}

export type Page = {
  index: number
  url: string
}

