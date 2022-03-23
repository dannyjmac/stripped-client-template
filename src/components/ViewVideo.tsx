import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import QRCode from "react-qr-code";

export const ViewVideo = observer(() => {
  const { playerStore, lightningStore, authStore } = useStore();

  const [comment, setComment] = useState<string>("");

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

  const handleTipVideo = () => {
    const { generateInvoice } = lightningStore;
    if (!authStore.currentUser?.userId) return;
    if (!playerStore?.video?.author.walletId) return;

    generateInvoice(10, {
      destinationWalletId: playerStore?.video?.author.walletId,
      tipperUserId: authStore.currentUser?.userId,
      recieverUserId: playerStore?.video?.author.userId,
      videoId: playerStore?.video?._id,
      videoTime: 0,
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

  const handleCommentVideo = () => {
    const { commentVideo } = playerStore;
    const videoId = playerStore?.video?._id;
    const userId = authStore.currentUser?.userId;

    if (!videoId) return;
    if (!comment) return;
    if (!userId) return;
    commentVideo(comment, videoId);
  };

  const handleUpvoteComment = (id: string) => {
    const { upvoteComment } = playerStore;
    const videoId = playerStore?.video?._id;
    const userId = authStore.currentUser?.userId;

    if (!videoId) return;
    upvoteComment(id, videoId);
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

  const { hasUserDisliked, hasUserLiked, numLikes, numDislikes, comments } =
    playerStore;

  return (
    <div>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <div>
          <button
            onClick={handleTipVideo}
            style={{ width: 100, marginTop: 10 }}
          >
            TIP
          </button>
          <div>-</div>
        </div>
        <div>
          <button
            disabled={hasUserLiked}
            onClick={handleLikeVideo}
            style={{ width: 100, marginTop: 10 }}
          >
            {!hasUserLiked ? "LIKE" : "LIKED :)"}
          </button>
          <div>{numLikes}</div>
        </div>
        <div>
          <button
            disabled={hasUserDisliked}
            onClick={handleDislikeVideo}
            style={{ width: 100, marginTop: 10 }}
          >
            {!hasUserDisliked ? "DISLIKE" : "DISLIKED :("}
          </button>
          <div>{numDislikes}</div>
        </div>
      </div>
      {lightningStore.invoice && <QRCode value={lightningStore.invoice.pr} />}
      <textarea
        onChange={(e) => setComment(e.currentTarget.value)}
        style={{ width: 500, height: 100 }}
        value={comment}
      />
      <button onClick={handleCommentVideo}>Submit</button>
      <div style={{ marginTop: 15 }}>Comments</div>
      {comments?.map((comment) => (
        <div key={comment.id} style={{ margin: "20px 0px" }}>
          {comment.text}
          <button
            onClick={() => handleUpvoteComment(comment.id)}
            disabled={comment.hasUserUpvoted}
            style={{ marginLeft: 10 }}
          >
            {comment.hasUserUpvoted ? "UPVOTED" : "UPVOTE"}
          </button>
        </div>
      ))}
    </div>
  );
});

// const getInvoice = async () => {
//   const data: any = await axios.get(
//     `http://localhost:4008/api/generateInvoice`
//   );
//   setInvoice(data.data.invoice.payment_request);
// };
