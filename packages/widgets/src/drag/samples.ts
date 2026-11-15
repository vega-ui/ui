export interface Sample {
  readonly time: number
  readonly position: number
}

const VELOCITY_WINDOW = 100

export const withSample = (samples: readonly Sample[], sample: Sample) =>
  [...samples, sample].filter((recent) => sample.time - recent.time <= VELOCITY_WINDOW)

export const velocityOf = (samples: readonly Sample[]) => {
  const first = samples[0]
  const last = samples[samples.length - 1]
  const duration = last.time - first.time
  if (duration === 0) return 0

  return ((last.position - first.position) / duration) * 1000
}
