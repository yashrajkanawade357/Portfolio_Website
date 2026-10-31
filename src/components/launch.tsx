import { createContext, useContext } from "react"

/* opening a project card zooms its image to fill the phone screen, like launching an app */
export type Launch = (src: string, from: HTMLElement, to: string, tint: string) => boolean

export const LaunchContext = createContext<Launch>(() => false)
export const useLaunch = () => useContext(LaunchContext)
