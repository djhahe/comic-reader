import { useEffect, useState } from 'react'
import './style.css'

export interface ComicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  isLoading?: boolean
  title?: string
}

export const ComicImage: React.FC<ComicImageProps> = ({ src, alt, isLoading, title, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // optimize image loading
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setIsLoaded(true)
    }
  }, [src])

  return isLoading || !isLoaded ? (
    <>
      <div className="image__loader image-placeholder" />
      <div className="image__loader alt-placeholder" />
    </>
  ) : (
    <>
      <div className="title">{title}</div>
      <img src={src} alt={alt} {...props} loading="eager" />
      <div className="alt">{alt}</div>
    </>
  )
}
