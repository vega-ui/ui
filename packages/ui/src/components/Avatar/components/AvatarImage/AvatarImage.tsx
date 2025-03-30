import { FC, ImgHTMLAttributes, Ref, useState } from 'react';
import style from './style.module.css';
import { csx } from '@adara-cs/utils';

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  ref?: Ref<HTMLImageElement>
  fallbackSrc?: string
}

export enum ImageStatus {
  INITIAL = 'initial',
  ERROR = 'error',
  LOADED = 'loaded'
}

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