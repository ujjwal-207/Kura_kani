import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  const handelClick = async () => {
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
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <nav className="flex justify-between fixed z-50 w-full bg-slate-500 px-6 py-4 lg:px-10">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Kura_Kani logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Kura_Kani
        </p>
      </Link>
      <div className="flex-between gap-5">
        <header>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <Button onClick={handelClick} disabled={!isLoaded || !isSignedIn}>
          Token
        </Button>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
