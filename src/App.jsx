import { useEffect, useState, useRef } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import ReactPlayer from "react-player";

function App() {
  const [video, setVideo] = useState();
  const [data, setData] = useState();
  const [videoName, setVideoName] = useState();
  const [stage, setStage] = useState("Upload Video");

  const ref = useRef();

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
      setStage("Finished");
      ref.current.style.visibility = "visible";
    } catch (err) {
      setStage("Error converting, please try again.");
      ref.current.style.visibility = "visible";
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-400 flex-col">
      <h1 className="text-5xl pb-4">Convert video to MP4!</h1>
      <form className="flex flex-col grow-0 justify-center items-center bg-slate-300 p-4 ">
        <h2>{stage}</h2>
        <input
          type="file"
          onChange={(e) => {
            setVideo(e.target.files[0]);
            setVideoName(e.target.files[0].name);
          }}
        ></input>
        {video ? (
          <button
            ref={ref}
            className="border p-2 bg-blue-100 rounded w-fit"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setStage("Processing Video... Please wait");
              ref.current.style.visibility = "hidden";
              video ? transcode() : null;
            }}
          >
            Submit
          </button>
        ) : null}
      </form>

      {data ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl">Right Click to Download</h2>
          <ReactPlayer url={data} muted={true} playing={true} loop={true} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
