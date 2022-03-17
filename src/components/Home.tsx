import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../store";

export const Home = observer(({ user }: any) => {
  const { videoStore } = useStore();

  useEffect(() => {
    videoStore.getUserVideos(user);
  }, []);

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
          key={video.id}
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
          <Link to={`/view/${video.id}`}>
            <img
              onClick={() => console.log("called video")}
              style={{ maxWidth: 300 }}
              src={video.url.split(".").slice(0, -1).join(".").concat(".jpeg")}
            />
          </Link>
        </div>
      ))}
    </div>
  );
});
