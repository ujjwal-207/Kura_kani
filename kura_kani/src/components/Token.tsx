import { useAuth } from "@clerk/clerk-react";

const getHost = () => {
  const islocalhost = import.meta.env.DEV;
  return islocalhost
    ? "http://192.168.1.70:5000/api/token"
    : "https://kura-kani-eta.vercel.app/api/token";
};

export const Token = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const fetchToken = async () => {
    try {
      if (!isLoaded) {
        console.log("Authentication is still loading");
        return;
      }

      if (!isSignedIn) {
        console.log("User is not signed in");
        return;
      }

      const token = await getToken();
      const response = await fetch(`${getHost()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data.token;
    } catch (error) {
      console.log("error", error);
    }
  };
  return fetchToken;
};
