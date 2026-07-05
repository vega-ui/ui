import React, { FC, PropsWithChildren, useMemo } from 'react'

export const createContext = <D extends object | null>(name: string, defaultContext: D) => {
  const Context = React.createContext<D | undefined>(defaultContext);
  Context.displayName = name + 'Context';
  
  const Provider: FC<PropsWithChildren<D>> = ({ children, ...props }) => {
    // Intentional shallow-by-value memoization: the context value keeps its identity
    // as long as every prop is referentially equal. The dep list can't be a literal here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => props, Object.values(props)) as D;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  
  Provider.displayName = name + 'Provider';
  
  const useContext = () => {
    const context = React.useContext(Context);
    return context !== undefined ? context : defaultContext;
  }
  
  return [Provider, useContext] as const;
}