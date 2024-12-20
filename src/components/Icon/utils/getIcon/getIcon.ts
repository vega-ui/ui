import SupportIcon from '../../../../assets/icons/support.svg?react'
import GlobeIcon from '../../../../assets/icons/globe.svg?react'
import ChevronIcon from '../../../../assets/icons/chevron.svg?react'
import CloseIcon from '../../../../assets/icons/close.svg?react'
import ArrowBottomRightIcon from '../../../../assets/icons/arrow-bottom-right.svg?react'

const icons = {
  support: SupportIcon,
  globe: GlobeIcon,
  chevron: ChevronIcon,
  close: CloseIcon,
  arrowBottomRight: ArrowBottomRightIcon,
} as const

export type IconName = keyof typeof icons

export const getIcon = (name: IconName) => {
  return icons[name]
}