import { useState } from "react";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import { Loader } from "lucide-react";

import { useGetCallById } from "@/hooks/useGetCallById";

import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MettingSetup";
import MeetingRoom from "@/components/MettingRoom";

export const Meeting = () => {
  const { id } = useParams();

  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-black">
        Call Not Found
      </p>
    );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};
