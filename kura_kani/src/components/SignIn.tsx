import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import Loader from "./Loader";

export const SignIn = () => {
  return (
    <div>
      <div className="justify-center bg-[#FDF7F4]">
        <div className=" place-items-center">
          <img
            src="/assets/Kura_kani.png"
            width={92}
            height={92}
            alt="Kura_Kani logo"
            className="max-sm:size-10"
          />
          <h1 className="text-lg font-bold">Kura_Kani</h1>
        </div>
      </div>
      <div className="place-items-center   h-[500px] w-[500px] pl-11 ml-[600px] bg-black">
        <div className="pt-7 pb-7">
          <h1 className="text-white font-bold text-xl">Sign In to Continue</h1>
          <p>It will take some time sorry for that</p>
        </div>

        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
        <Loader />
      </div>
    </div>
  );
};
