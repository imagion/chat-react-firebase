export default function Home() {
  return (
    <div className='relative flex flex-auto flex-col overflow-hidden bg-neutral-600'>
      <section className='flex min-h-12 w-full flex-initial cursor-default items-center p-2 shadow-md'>
        <h1>Channel Name</h1>
      </section>
      <main className='flex flex-auto flex-col'>
        <div className='relative flex flex-auto'>
          <div className='scroller absolute inset-0 overflow-x-hidden overflow-y-scroll'></div>
        </div>
        <form className='px-4'>
          {/*TODO: make resizable textarea*/}
          <textarea className='mb-4 h-10 w-full resize-none whitespace-pre-wrap break-words rounded-md bg-neutral-500 p-2 outline-none'>
            123
          </textarea>
        </form>
      </main>
    </div>
  );
}
