import { Button } from "@/components/ui/button";
import "../(home)/MyScheme.css";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div>
      <section className="title-bar">
        <div className="title-container">
          <div className="logo-section">
            <h1 className="logo-title fade-in">
              <span>Website Logo </span>
            </h1>
          </div>

          <nav className="top-navbar">
            <header className="flex justify-end items-center  gap-4 h-10">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" className="text-black">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="ghost" className="text-black">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
              <div className="">
                <ModeToggle />
              </div>
            </header>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default NavBar;
