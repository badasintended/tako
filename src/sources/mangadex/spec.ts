export type MangaSpec = {
  data: {
    attributes: {
      title: Record<string, string>
      altTitles: Record<string, string>[]
      description: Record<string, string>
      status: string
      tags: [{
        attributes: {
          name: Record<string, string>
          group: string
        }
      }]
    }
    relationships: [{
      id: string
      type: string
    }]
  }
}

export type CoverSpec = {
  data: {
    attributes: {
      fileName: string
    }
  }
}

export type AuthorSpec = {
  data: {
    attributes: {
      name: string
    }
  }
}

export type ChapterListSpec = {
  volumes: Record<string, {
    volume: string
    count: number
    chapters: Record<string, {
      chapter: string
      id: string
      count: number
    }>
  }>
}

export type ChapterSpec = {
  data: {
    attributes: {
      chapter?: number
      title: string
      hash: string
      data: string[]
      publishAt: string
    }
    relationships: [{
      id: string
      type: string
    }]
  }
}

export type MdAtHomeServerSpec = {
  baseUrl: string
}
