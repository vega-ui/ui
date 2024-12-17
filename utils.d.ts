import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';

export type WithAsProp<C extends ElementType> = { as?: C; };
export type PropsToOmit<C extends ElementType, P> = keyof (WithAsProp<C> & P);
export type PolymorphicComponentProp<C extends ElementType, Props = object> = PropsWithChildren<Props & WithAsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
export type PolymorphicComponentPropWithRef<C extends ElementType, Props = object> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };
type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];