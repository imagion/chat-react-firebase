export default function ChatList({ chats }) {
  return (
    <div className='chat__list'>
      <ul role='list'>
        {chats.map(chat => (
          <li key={chat.id} className='chats__item'>
            {chat.chat}
          </li>
        ))}
      </ul>
    </div>
  )
}
