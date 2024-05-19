import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Input } from './components/Input';

function App() {
  const socket = io('https://test-socket-server-render.onrender.com');
  const [details, setDetails] = useState({});
  const [serverData, setServerData] = useState([]);

  const connectSocket = (socket) => {
    console.log(socket);
  }

  const handlePlayerDetails = (playerDetails) => {
    setServerData(playerDetails);
    console.log(playerDetails);
  }

  useEffect(() => {
    socket.on('connection', connectSocket);
    socket.on('playerDetails', handlePlayerDetails);
    return () => {
      socket.off('connection', connectSocket);
      socket.off('playerDetails', handlePlayerDetails);
    }
  }, [socket])

  const handleInput = (e) => {
    let { name, value } = e.target;
    let values = { [name]: value };
    setDetails((prev) => ({ ...prev, ...values }));
  }

  const handleSetScore = (e) => {
    e.preventDefault();
    console.log(details);
    socket.emit('details', details);
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center gap-6 bg-primary'>
      <h1 className='text-5xl font-bold my-6 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Multiplayer Dashboard</h1>
      <form className='w-96 flex p-8 rounded-md flex-col items-center justify-center bg-background gap-6' onSubmit={handleSetScore}>
        <Input name="name" placeholder={"Enter your name"} handleInput={handleInput} />
        <Input name="score" placeholder={"Enter your Score"} handleInput={handleInput} />
        <button className="bg-primary text-background px-4 py-2 rounded-lg" type='submit'>Publish Score</button>
      </form>
      {serverData.length !== 0 && <h2 className='text-3xl font-semibold my-6 text-background'>Player Details Table</h2>}
      {
        serverData.length !== 0 && <div className='flex flex-col items-center justify-center rounded-md shadow overflow-hidden'>
          <table className='w-96 bg-background'>

            <thead className='bg-background border-b-2 border-gray-50'>
              <tr>
                <th className='w-8 text-sm font-semibold tracking-wider p-3 text-left text-black'>No.</th>
                <th className='w-20 text-sm font-semibold tracking-wider p-3 text-left text-black'>Name</th>
                <th className='w-24 text-sm font-semibold tracking-wider p-3 text-left text-black'>Score</th>
              </tr>
            </thead>
            <tbody>
              {serverData.map((data, index) => {
                return (<tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray"}>
                  <td className='text-sm p-3 text-gray-700 whitespace-nowrap'>{index + 1}</td>
                  <td className='text-sm p-3 text-gray-700 whitespace-nowrap'>{data.name}</td>
                  <td className='text-sm p-3 text-gray-700 whitespace-nowrap'>{data.score}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      }
    </div >
  );
}

export default App;
