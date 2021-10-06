export type MangaSpec = {
  series_id: string
  title: string
  alt_titles: string[]
  status: string
  authors: string[]
  genres: string[]
  description: string
  cover_art: {
    source: string
  }
  chapters: [{
    title: string
    groups: string[]
    number: number
    volume: number
  }]
}

export type ChapterSpec = {
  props: {
    pageProps: {
      pages: string[]
    }
  }
}