import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'

export default function ModeSelector() {
  const { changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode))

    mode === 'dark'
      ? document.documentElement.setAttribute('dark', true)
      : document.documentElement.removeAttribute('dark')
  }, [mode])

  return (
    <button className='mode-toggle' onClick={toggleMode}>
      <svg className='mode-toggle-icon' width='24px' height='24px'>
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5v11c3.03 0 5.5-2.47 5.5-5.5S15.03 6.5 12 6.5z' />
      </svg>
    </button>
  )
}
