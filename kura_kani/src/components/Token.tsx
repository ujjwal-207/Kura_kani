import { useAuth } from "@clerk/clerk-react";

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
      const response = await fetch("https://kura-kani.onrender.com/api/token", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.log("error", error);
    }
  };

  return fetchToken;
};
