import { useState } from 'react'
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import ReactPlayer from 'react-player';

function App() {
  const [wait, setWait] = useState(false)
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
          setVideo(e.target.files[0])
          console.log(e.target.files[0])
          console.log(e)
        }}></input>
        <button type="submit" onClick={(e)=>{
          e.preventDefault()
          setWait(true)
          transcode()
        }}>Submit</button>
      </form>

        {wait ? <ReactPlayer url={URL.createObjectURL(video)}/> : null}
    </div>
  )
}

export default App
