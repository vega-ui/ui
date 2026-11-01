export const scrollIntoContainer = (container: HTMLElement, element: HTMLElement) => {
  const top = element.offsetTop
  const bottom = top + element.offsetHeight

  if (top < container.scrollTop) {
    container.scrollTop = top
    return
  }

  if (bottom > container.scrollTop + container.clientHeight) {
    container.scrollTop = bottom - container.clientHeight
  }
}
