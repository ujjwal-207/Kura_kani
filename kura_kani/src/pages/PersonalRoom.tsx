import { useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row back">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);
    console.log(meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    navigate(`/meeting/join?call_id=${meetingId}&&default`);
  };

  const meetingLink = `${"https://kura-kani-r9ks.onrender.com/"}meeting/join?call_id=${meetingId}&&default`;

  return (
    <section className="flex size-full flex-col gap-10 text-black">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-400" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-blend-darken"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
