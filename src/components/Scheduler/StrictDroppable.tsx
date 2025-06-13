// src/components/Scheduler/StrictDroppable.tsx
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

/**
 * This is a custom wrapper component for the Droppable component from react-beautiful-dnd.
 * It is designed to work around a known issue with React's StrictMode, where the Droppable
 * component can fail to register itself correctly due to double-rendering in development mode.
 *
 * This wrapper delays the rendering of the Droppable component until after the initial mount,
 * ensuring that it works correctly within a StrictMode environment.
 */
export const StrictDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Enable the Droppable component after the initial render.
    setEnabled(true);
  }, []);

  if (!enabled) {
    // Render nothing on the initial server-side or first client-side render.
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
