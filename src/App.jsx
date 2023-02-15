import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import ReactPlayer from "react-player";

function App() {
  const [video, setVideo] = useState();
  const [data, setData] = useState();
  const [videoName, setVideoName] = useState();
  const [error, setError] = useState(false);

  const ffmpg = createFFmpeg({ log: true });

  const transcode = async () => {
    try {
      await ffmpg.load();
      // await ffmpg.FS('writeFile', video, await fetchFile(video))
      // console.log("validated")
      await ffmpg.FS("writeFile", videoName, await fetchFile(video));
      await ffmpg.run("-i", videoName, "output.mp4");
      const videoData = await ffmpg.FS("readFile", "output.mp4");
      setData(
        URL.createObjectURL(new Blob([videoData.buffer], { type: "video/mp4" }))
      );
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    console.log(video);
  });

  return (
    <div className="w-full">
      <form>
        {video ? (
          <ReactPlayer
            url={URL.createObjectURL(new Blob([video], { type: video.type }))}
            muted={true}
            playing={true}
            loop={true}
          />
        ) : null}
        <h1>Upload Video</h1>
        <input
          type="file"
          onChange={(e) => {
            setVideo(e.target.files[0]);
            setVideoName(e.target.files[0].name);
          }}
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            transcode();
          }}
        >
          Submit
        </button>
      </form>

      {data ? (
        <ReactPlayer url={data} muted={true} playing={true} loop={true} />
      ) : null}
    </div>
  );
}

export default App;
