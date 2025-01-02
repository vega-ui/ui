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
import Pin from '../../../../assets/icons/pin.svg?react'
import Sun from '../../../../assets/icons/sun.svg?react'
import Moon from '../../../../assets/icons/moon.svg?react'
import Info from '../../../../assets/icons/info.svg?react'
import BottomArrow from '../../../../assets/icons/bottom-arrow.svg?react'
import Plus from '../../../../assets/icons/plus.svg?react'
import Minus from '../../../../assets/icons/minus.svg?react'
import Check from '../../../../assets/icons/check.svg?react'
import CheckO from '../../../../assets/icons/check-o.svg?react'
import Danger from '../../../../assets/icons/danger.svg?react'

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
  pin: Pin,
  sun: Sun,
  moon: Moon,
  info: Info,
  bottomArrow: BottomArrow,
  plus: Plus,
  minus: Minus,
  check: Check,
  checkCircle: CheckO,
  danger: Danger,
} as const

export type IconName = keyof typeof icons

export const getIcon = (name: IconName) => {
  return icons[name]
}