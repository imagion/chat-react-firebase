import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import ThemeSelector from '../components/ThemeSelector'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <header className='navbar'>
      <div className='container--full'>
        <div className='navbar-wrap'>
          <Link to='/' className='navbar__logo'>
            Chat
          </Link>
          <button
            className={`navbar__toggle${open ? ' open' : ''}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-main${open ? ' open' : ''}`}>
            <nav className='navigation'>
              <ul className='navigation__menu'>
                <li className='navigation__item'>
                  <ThemeSelector />
                </li>
                {user ? (
                  <>
                    <li className='navigation__item'>hello, {user.email}</li>
                    <li className='navigation__item'>
                      <button className='btn' onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='navigation__item'>
                      <Link to='/login' className='navlink'>
                        Login
                      </Link>
                    </li>
                    <li className='navigation__item'>
                      <Link to='/signup' className='navlink'>
                        Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
