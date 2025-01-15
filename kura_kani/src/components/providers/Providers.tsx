import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";

import { Token } from "../Token";

import Loader from "@/components/Loader";
import { useUser } from "@clerk/clerk-react";

const apiKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  const fetchToken = Token();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey: apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: fetchToken,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
