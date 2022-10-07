import ChatForm from './ChatForm'
import ChatList from './ChatList'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Home() {
  const { user } = useAuthContext()
  const { documents: chats } = useCollection('chats', ['uid', '==', user.uid])

  return (
    <main className='chat'>
      <h2 className='page-title'>Chat</h2>
      <div className='chats'>
        {chats && <ChatList chats={chats} />}
        <ChatForm />
      </div>
    </main>
  )
}
