import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Input } from './components/Input';

function App() {
  const socket = io('localhost:3000');
  const [details, setDetails] = useState({});

  useEffect(() => {
    socket.on('connection', (socket) => {
      console.log(socket);
    })
  }, [socket])

  const handleInput = (e) => {
    let { name, value } = e.target;
    let values = { [name]: value };
    setDetails((prev) => ({ ...prev, ...values }));
    console.log(values);
  }

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <form className='w-96 flex p-8 rounded-md flex-col items-center justify-center bg-background gap-6'>
        <h1 className='text-3xl font-semibold my-6 text-primary'>Multiplayer Dashboard</h1>
        <Input name="name" placeholder={"Enter your name"} handleInput={handleInput} />
        <Input name="score" placeholder={"Enter your Score"} handleInput={handleInput} />
      </form>
    </div>
  );
}

export default App;
