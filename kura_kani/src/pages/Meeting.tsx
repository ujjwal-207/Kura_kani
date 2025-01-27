import { useState } from "react";
import { useParams } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
// import { Loader } from "lucide-react";
import { useGetCallById } from "@/hooks/useGetCallById";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MettingSetup";
import MeetingRoom from "@/components/MettingRoom";

const Meeting = () => {
  // const urlParams = new URLSearchParams(window.location.search);
  // const callId = urlParams.get("call_id");
  // const callType = urlParams.get("call_type") || "default";
  const { id } = useParams<{ id: string }>();
  console.log(id);
  // const { isLoaded, user } = useUser();
  const { call } = useGetCallById(id || "");
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-black">
        Call Not Found
      </p>
    );

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

export default Meeting;
