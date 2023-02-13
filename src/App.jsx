import { useState } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import ReactPlayer from 'react-player';

function App() {
    const [video, setVideo] = useState();
    const [data, setData] = useState()

  const ffmpg = createFFmpeg({log: true})

  const transcode = async () =>{
    await ffmpg.load()
    // await ffmpg.FS('writeFile', video, await fetchFile(video))
    // console.log("validated")
    await ffmpg.FS('writeFile', 'file.avi', await fetchFile(video))
    await ffmpg.run('-i', "file.avi", "output.mp4")
    const videoData = await ffmpg.FS('readFile', 'output.mp4')
    setData(URL.createObjectURL(new Blob([videoData.buffer], {type: 'video/mp4'})))

  }

  return (
    <div>
      <form>
        <h1>Upload Video</h1>
        <input type="file" onChange={(e)=>{
          setVideo(e.target.files[0])
        }}></input>
        <button type="submit" onClick={(e)=>{
          e.preventDefault()
          transcode()
        }}>Submit</button>
      </form>

        {data ? <ReactPlayer url={data}/> : null}
    </div>
  )
}

export default App
