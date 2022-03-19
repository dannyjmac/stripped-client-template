import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../store";

export const Home = observer(({ user }: any) => {
  const { videoStore, authStore } = useStore();

  useEffect(() => {
    if (authStore.currentUser)
      videoStore.getUserVideos(authStore.currentUser.userId);
  }, [authStore.currentUser]);

  if (!videoStore.userVideos) return <div>loading</div>;
  if (!videoStore.userVideos) return <div>No videos, sorry</div>;

  return (
    <div>
      {videoStore.userVideos.map((video) => (
        <div
          style={{
            padding: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
          key={video._id}
        >
          <div
            style={{
              paddingRight: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {video.title}
          </div>
          <Link to={`/view/${video._id}`}>
            <img
              style={{ maxWidth: 300 }}
              src={video.url.split(".").slice(0, -1).join(".").concat(".jpeg")}
            />
          </Link>
        </div>
      ))}
    </div>
  );
});
