import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";

export const ViewVideo = observer(() => {
  const { playerStore, videoStore } = useStore();
  const { id } = useParams();
  const playerRef = useRef(null);

  useEffect(() => {
    if (id) {
      playerStore.getVideo(id);
    }
  }, [id]);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  const handleLikeVideo = () => {
    const { likeVideo } = playerStore;
    const videoId = playerStore?.video?._id;

    if (!videoId) return;
    likeVideo(videoId);
  };

  const handleDislikeVideo = () => {
    const { dislikeVideo } = playerStore;
    const videoId = playerStore?.video?._id;

    if (!videoId) return;
    dislikeVideo(videoId);
  };

  if (!playerStore.video) return <div>loading</div>;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: playerStore.video.url
          .split(".")
          .slice(0, -1)
          .join(".")
          .concat(".mp4"),
        type: "video/mp4",
      },
    ],
  };

  const {
    video: { likes },
    hasUserDisliked,
    hasUserLiked,
    numLikes,
    numDislikes,
  } = playerStore;

  return (
    <div>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <div>
        <button onClick={() => {}} style={{ width: 100, marginTop: 10 }}>
          TIP
        </button>
        <div>-</div>
      </div>
      <div>
        <button
          disabled={hasUserLiked}
          onClick={() => handleLikeVideo()}
          style={{ width: 100, marginTop: 10 }}
        >
          {!hasUserLiked ? "LIKE" : "LIKED :)"}
        </button>
        <div>{numLikes}</div>
      </div>
      <div>
        <button
          disabled={hasUserDisliked}
          onClick={() => handleDislikeVideo()}
          style={{ width: 100, marginTop: 10 }}
        >
          {!hasUserDisliked ? "DISLIKE" : "DISLIKED :("}
        </button>
        <div>{numDislikes}</div>
      </div>
      {/* <button
        style={{ marginTop: 100, marginBottom: 100 }}
        onClick={getInvoice}
      >
        Get invoice
      </button> */}
      {/* {invoice && <PaymentFlow invoice={invoice} setInvoice={setInvoice} />} */}
    </div>
  );
});

// const getInvoice = async () => {
//   const data: any = await axios.get(
//     `http://localhost:4008/api/generateInvoice`
//   );
//   setInvoice(data.data.invoice.payment_request);
// };
