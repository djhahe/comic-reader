import { useState } from 'react'
import './style.css'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  isLoading?: boolean
}

export const Image: React.FC<ImageProps> = ({ src, alt, isLoading, ...props }) => {
  const [isLoadingState, setIsLoadingState] = useState(true)

  return (
    <div className="image-container">
      {(isLoading || isLoadingState) && <div className="image__loader image-placeholder" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoadingState(false)}
        onError={() => setIsLoadingState(false)}
        style={{
          display: isLoading || isLoadingState ? 'none' : 'block',
        }}
        {...props}
      />
    </div>
  )
}
