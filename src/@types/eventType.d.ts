declare module "eventType" {
  import { ComponentProps, DOMAttributes } from "react";

  export type EventHandlers<T> = Omit<
    DOMAttributes<T>,
    "children" | "dangerouslySetInnerHTML"
  >;
  export type Event<
    TElement extends keyof JSX.IntrinsicElements,
    TEventHandler extends keyof EventHandlers<TElement>
  > = ComponentProps<TElement>[TEventHandler];
}
