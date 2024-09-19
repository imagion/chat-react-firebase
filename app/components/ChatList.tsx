export default function ChatList({ messages }) {
  return (
    <ul className='scroller inset-0 flex flex-auto flex-col justify-end overflow-x-hidden overflow-y-scroll'>
      {messages.map(() => {
        <li key={messages.id} className=''>
          {messages.chat}
        </li>;
      })}
      <li>Тест</li>
      <li>Тест1</li>
      <li>Тест2</li>
    </ul>
  );
}
