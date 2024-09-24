import Tree from '@/components/Tree';
import Sidebar from '@/components/Sidebar';
import ChatForm from '@/components/ChatForm';
import ChatList from '@/components/ChatList';
import RequireAuth from '@/components/RequireAuth';

export default function App() {
  return (
    <RequireAuth>
      <div className='flex flex-auto'>
        <Tree />
        <Sidebar />
        <div className='relative flex flex-auto flex-col overflow-hidden bg-neutral-600'>
          <section className='flex min-h-12 w-full flex-initial cursor-default items-center p-2 shadow-md'>
            <h1>Channel Name</h1>
          </section>
          <main className='flex flex-auto flex-col'>
            <ChatList />
            <ChatForm />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
