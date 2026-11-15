import React, { FC, PropsWithChildren, useMemo } from 'react'

export const createContext = <Value extends object | null>(name: string, defaultContext: Value) => {
  const Context = React.createContext<Value | undefined>(defaultContext);
  Context.displayName = name + 'Context';
  
  const Provider: FC<PropsWithChildren<Value>> = ({ children, ...props }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => props, Object.values(props)) as Value;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  
  Provider.displayName = name + 'Provider';
  
  const useContext = () => {
    const context = React.useContext(Context);
    return context !== undefined ? context : defaultContext;
  }
  
  return [Provider, useContext] as const;
}