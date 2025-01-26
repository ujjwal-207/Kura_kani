import { Link } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";

const MobileNav = () => {
  const pathname = window.location.pathname;

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <img
            src="/assets/hamburgbutton.png"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none ">
          <Link to="/" className="flex items-center gap-1">
            <img
              src="/assets/Kura_kani.png"
              width={32}
              height={32}
              alt="Kura_kani"
            />
            <p className="text-[26px] font-extrabold text-black">Kura_Kani</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-black">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        to={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <img
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
