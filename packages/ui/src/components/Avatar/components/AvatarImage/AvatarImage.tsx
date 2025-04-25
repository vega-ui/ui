import { FC, ImgHTMLAttributes, Ref, useState } from 'react';
import style from './style.module.css';
import { csx } from '@adara-cs/utils';

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Ref to the native <img> element.
   * Useful for direct DOM access, loading state tracking, or animations.
   */
  ref?: Ref<HTMLImageElement>

  /**
   * URL of the fallback image to display if the main image fails to load.
   * This allows graceful degradation of the avatar when the primary source is unavailable.
   */
  fallbackSrc?: string
}

export enum ImageStatus {
  INITIAL = 'initial',
  ERROR = 'error',
  LOADED = 'loaded'
}

/**
 * The AvatarImage component renders a user’s profile image within an avatar and optionally falls back to a secondary fallbackSrc image if the primary source fails to load
 */
export const AvatarImage: FC<AvatarImageProps> = ({
  src,
  fallbackSrc,
  alt,
  ref,
  className,
  ...props
}) => {
  const [imageStatus, setImageStatus] = useState(ImageStatus.INITIAL)

  const onLoad = () => setImageStatus(ImageStatus.LOADED)
  const onError = () => setImageStatus(ImageStatus.ERROR)

  return (
    <img
      ref={ref}
      data-status={imageStatus}
      onLoad={onLoad}
      onError={onError}
      alt={alt}
      src={imageStatus === ImageStatus.ERROR ? fallbackSrc : src}
      className={csx(style.image, className)}
      {...props}
    />
  )
}