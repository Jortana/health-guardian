import { useRef } from 'react'

export default function useDebounce(fn, delay) {
  const refTimer = useRef()

  return function f(...args) {
    if (refTimer.current) {
      clearTimeout(refTimer.current)
    }
    refTimer.current = setTimeout(() => {
      fn(args)
    }, delay)
  }
}
