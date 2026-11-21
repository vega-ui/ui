interface MovingParent extends Element {
  moveBefore(node: Node, child: Node | null): void
}

const movesAtomically = (parent: Element): parent is MovingParent => 'moveBefore' in parent

const kept = new WeakSet<Element>()

const isOpenModal = (dialog: HTMLDialogElement) => dialog.isConnected && dialog.matches(':modal')

const moveInto = (parent: Element, container: Element) => {
  if (movesAtomically(parent) && container.isConnected && parent.isConnected) {
    parent.moveBefore(container, null)
    return
  }

  const running = new Set(container.getAnimations({ subtree: true }))
  parent.append(container)

  return running
}

const raise = (popover: HTMLElement) => {
  if (popover.matches(':popover-open')) popover.hidePopover()
  popover.showPopover()
}

const finishStarted = (container: Element, running: ReadonlySet<Animation>) => {
  for (const animation of container.getAnimations({ subtree: true })) {
    if (!running.has(animation)) animation.finish()
  }
}

export const stayOnTop = (container: Element, popover: HTMLElement) => {
  const controller = new AbortController()
  let modals = [...document.querySelectorAll('dialog')].filter(isOpenModal)

  const place = () => {
    modals = modals.filter(isOpenModal)
    const parent = modals.at(-1) ?? document.body
    if (container.parentNode === parent) {
      raise(popover)
      return
    }

    const running = moveInto(parent, container)
    raise(popover)
    if (running) finishStarted(container, running)
  }

  const onToggle = (event: Event) => {
    if (!(event.target instanceof Element) || kept.has(event.target) || !(event instanceof ToggleEvent)) return

    const opened = event.newState === 'open'
    if (opened && event.target instanceof HTMLDialogElement && event.target.matches(':modal')) modals.push(event.target)
    if (opened || modals.some((dialog) => !isOpenModal(dialog))) place()
  }

  const removed = new MutationObserver(() => {
    if (container.isConnected && modals.every(isOpenModal)) return

    place()
  })

  kept.add(popover)
  document.addEventListener('toggle', onToggle, { capture: true, signal: controller.signal })
  removed.observe(document.documentElement, { childList: true, subtree: true })
  place()

  return () => {
    controller.abort()
    removed.disconnect()
    kept.delete(popover)
    if (popover.matches(':popover-open')) popover.hidePopover()
  }
}
