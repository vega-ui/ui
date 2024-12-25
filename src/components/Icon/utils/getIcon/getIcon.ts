import SupportIcon from '../../../../assets/icons/support.svg?react'
import GlobeIcon from '../../../../assets/icons/globe.svg?react'
import ChevronIcon from '../../../../assets/icons/chevron.svg?react'
import CloseIcon from '../../../../assets/icons/close.svg?react'
import ArrowBottomRightIcon from '../../../../assets/icons/arrow-bottom-right.svg?react'
import MenuLeftIcon from '../../../../assets/icons/menu-left.svg?react'
import ChipIcon from '../../../../assets/icons/chip.svg?react'
import CloudIcon from '../../../../assets/icons/cloud.svg?react'
import DatabaseIcon from '../../../../assets/icons/database.svg?react'
import ServerIcon from '../../../../assets/icons/server.svg?react'
import ServerRakeIcon from '../../../../assets/icons/server_rake.svg?react'
import Signal from '../../../../assets/icons/signal.svg?react'
import Data from '../../../../assets/icons/data.svg?react'

const icons = {
  support: SupportIcon,
  globe: GlobeIcon,
  chevron: ChevronIcon,
  close: CloseIcon,
  arrowBottomRight: ArrowBottomRightIcon,
  menuLeft: MenuLeftIcon,
  chip: ChipIcon,
  cloud: CloudIcon,
  database: DatabaseIcon,
  server: ServerIcon,
  serverRake: ServerRakeIcon,
  signal: Signal,
  data: Data
} as const

export type IconName = keyof typeof icons

export const getIcon = (name: IconName) => {
  return icons[name]
}