import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// firebase imports
import { db } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

export default function ChatForm() {
  const [chat, setChat] = useState('')
  const { user } = useAuthContext()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'chats'), {
        chat,
        uid: user.uid,
      })

      setChat('')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <form className='add-message' onSubmit={handleSubmit}>
      <input
        required
        type='text'
        placeholder='message'
        onChange={e => setChat(e.target.value)}
        value={chat}
      />
      <button className='btn'>&gt;</button>
    </form>
  )
}
