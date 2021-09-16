export enum PublicationStatus {
  ON_GOING,
  FINISHED,
  HIATUS,
  CANCELLED
}

export function make<T>(t: T): T {
  return t;
}

export type MangaCover = {
  id: string
  source: string
  title: string
  cover: string
}

export type Manga = MangaCover & {
  altTitles?: string[]
  authors?: string[]
  artists?: string[]
  status?: PublicationStatus
  tags?: string[]
  description?: string
}

export type Chapter = {
  id: string
  source: string
  manga: string
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

