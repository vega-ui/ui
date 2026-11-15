import { Action, Input, Repaired, Trace } from '@vega-ui/core'

export interface WidgetDiagnostics {
  onRepair?(repaired: Repaired): void
  onError?(error: unknown, source?: Input | Action): void
  onDispatch?(trace: Trace): void
}

export const diagnostics: WidgetDiagnostics = {}

export const widgetEnvironment = {
  onRepair: (repaired: Repaired) => diagnostics.onRepair?.(repaired),
  onError: (error: unknown, source?: Input | Action) => diagnostics.onError?.(error, source),
  onDispatch: (trace: Trace) => diagnostics.onDispatch?.(trace),
}
