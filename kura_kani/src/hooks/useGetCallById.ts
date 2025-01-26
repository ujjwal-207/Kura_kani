import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/clerk-react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!client || isLoaded || !user) return;

    const loadCall = async () => {
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error) {
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id, isLoaded, user]);

  return { call, isCallLoading };
};
