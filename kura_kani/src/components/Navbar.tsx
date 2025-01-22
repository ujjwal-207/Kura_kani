import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-[#FDF7F4]  px-6 py-4 lg:px-10">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="/assets/Kura_kani.png"
          width={52}
          height={52}
          alt="Kura_Kani logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-[rgb(38,107,181)] max-sm:hidden">
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
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </header>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
