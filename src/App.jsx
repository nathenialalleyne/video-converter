import { useState } from 'react'
import { createFFmpeg } from '@ffmpeg/ffmpeg'

function App() {
  const [video, setVideo] = useState('');

  const ffmpg = createFFmpeg()

  const transcode = async () =>{
    await ffmpg.load()
    await ffmpg.FS
  }

  return (
    <div>
      <form>
        <h1>Upload Video</h1>
        <input type="file" onChange={(e)=>{
          console.log(e.target.files[0])
        }}></input>
        <button type="submit" onClick={(e)=>{
          e.preventDefault()
        }}>Submit</button>
      </form>
    </div>
  )
}

export default App
