import { useEffect, useState } from 'react'
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import ReactPlayer from 'react-player';

function App() {
  const [wait, setWait] = useState(false)
  const [video, setVideo] = useState();

  const ffmpg = createFFmpeg()

  const transcode = async () =>{
    await ffmpg.load()
    await ffmpg.FS('readFile', video)
  }

  useEffect(()=>{
    console.log(video)
  })

  return (
    <div>
      <form>
        <h1>Upload Video</h1>
        <input type="file" onChange={(e)=>{
          setVideo(e.target.files[0])
          console.log(e.target.files[0])
          if (video){
            console.log("video found")
          }
        }}></input>
        <button type="submit" onClick={(e)=>{
          e.preventDefault()
          setWait(true)
          transcode()
        }}>Submit</button>
      </form>

        <video src={video} width="500" height="500"></video>
    </div>
  )
}

export default App
