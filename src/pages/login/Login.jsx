import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <>
      <h2 className='page-title'>Login</h2>
      <form className='auth-form' onSubmit={handleSubmit}>
        <label>
          <span>email:</span>
          <input
            required
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            required
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button className='btn'>log in</button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
