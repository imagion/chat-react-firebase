import Tree from '@/components/Tree';
import Sidebar from '@/components/Sidebar';
import ChatForm from '@/components/ChatForm';

export default function App() {
  return (
    <div className='flex flex-auto'>
      <Tree />
      <Sidebar />
      <div className='relative flex flex-auto flex-col overflow-hidden bg-neutral-600'>
        <section className='flex min-h-12 w-full flex-initial cursor-default items-center p-2 shadow-md'>
          <h1>Channel Name</h1>
        </section>
        <main className='flex flex-auto flex-col'>
          <ul className='scroller inset-0 flex flex-auto flex-col justify-end overflow-x-hidden overflow-y-scroll'>
            <li>test</li>
            <li>hi</li>
            <li>hello</li>
          </ul>
          <ChatForm />
        </main>
      </div>
    </div>
  );
}
