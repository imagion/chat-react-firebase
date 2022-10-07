import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, signup } = useSignup()

  const handleSubmit = e => {
    e.preventDefault()
    signup(email, password)
  }
  return (
    <>
      <h2 className='page-title'>Signup</h2>
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
        <button className='btn'>sign up</button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
