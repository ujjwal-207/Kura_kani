import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";

import { Token } from "../Token";

import Loader from "@/components/Loader";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";

const apiKey = import.meta.env.VITE_STREAM_PUBLISHABLE_KEY;
console.log(apiKey);

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  const fetchToken = Token();

  useEffect(() => {
    const initializeClient = async () => {
      if (!isLoaded || !user) return;
      if (!apiKey) throw new Error("Stream API key is missing");

      try {
        const token = await fetchToken();
        console.log("token", token);
        if (!token) throw new Error("Failed to fetch token");

        const client = StreamVideoClient.getOrCreateInstance({
          apiKey: apiKey,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider: token,
        });

        setVideoClient(client);
      } catch (error) {
        console.log("Error initializing StreamVideo Client", error);
      }
    };
    initializeClient();
  }, [user, isLoaded, fetchToken]);

  if (!videoClient) {
    return (
      <div>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
        <Loader />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
