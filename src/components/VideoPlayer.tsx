import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = (props: any) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 800,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
      <div>
        <button style={{ width: 100, marginTop: 10 }}>TIP</button>
        <div>1</div>
      </div>
      <div>
        <button style={{ width: 100, marginTop: 10 }}>LIKE</button>
        <div>1</div>
      </div>
      <div>
        <button style={{ width: 100, marginTop: 10 }}>DISLIKE</button>
        <div>1</div>
      </div>
      <div>
        <input></input>
        <button style={{ width: 100, marginTop: 10 }}>COMMENT</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
