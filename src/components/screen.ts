import { createContext, useContext } from "react"
import { motionValue, type MotionValue } from "motion/react"

/* pages scroll inside the phone's screen by a transform, not a native scroll,
   so sections that react to scroll read the offset from here */
export const ScreenContext = createContext<{ scrolled: MotionValue<number>; height: number }>({ scrolled: motionValue(0), height: 700 })
export const useScreen = () => useContext(ScreenContext)
