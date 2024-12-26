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
import Drive from '../../../../assets/icons/drive.svg?react'
import Ram from '../../../../assets/icons/ram.svg?react'
import PrevArrow from '../../../../assets/icons/prev-arrow.svg?react'
import NextArrow from '../../../../assets/icons/next-arrow.svg?react'
import Mail from '../../../../assets/icons/mail.svg?react'

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
  data: Data,
  drive: Drive,
  ram: Ram,
  prevArrow: PrevArrow,
  nextArrow: NextArrow,
  mail: Mail,
} as const

export type IconName = keyof typeof icons

export const getIcon = (name: IconName) => {
  return icons[name]
}