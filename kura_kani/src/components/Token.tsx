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
      const response = await fetch("http://localhost:5000/api/token", {
        method: "GET",
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
