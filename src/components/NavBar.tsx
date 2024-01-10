import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <div className="p-4 shadow-xl bg-neutral">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/campgrounds" className="btn btn-ghost text-xl">
            YelpCamp
          </Link>
          <div className="flex items-center gap-2">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/campgrounds"
                appearance={{
                  baseTheme: dark,
                  elements: {
                    avatarBox: { width: "2.5rem", height: "2.5rem" },
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
