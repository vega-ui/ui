import { FC, ImgHTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useWidget, widgetEnvironment } from '../../../internals/widget';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';
import { avatarImageWidget } from '@vega-ui/widgets/avatar';

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
  const handle = useWidget(avatarImageWidget, { src, fallbackSrc }, widgetEnvironment)
  const attrs = useOutput(handle, avatarImageWidget.output.root)
  const mergedRef = useMergeRefs([handle.root, ref])

  return (
    <img
      ref={mergedRef}
      alt={alt}
      className={csx(style.image, className)}
      {...handle.listen(attrs, props)}
    />
  )
}