export type Comic = {
  month: string
  num: number
  link: string
  year: string
  news: string
  safe_title: string
  transcript: string
  alt: string
  img: string
}

export type ComicRequest = number | 'latest'
