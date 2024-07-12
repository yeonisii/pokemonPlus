"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import openDevice from "../app/img/opendevice.png";
import closeDevice from "../app/img/closedevice.png";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="flex justify-center items-center h-screen">
      <Link href="/pokemonList">
        <a
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="m-4 p-4 border-4 border-dotted border-red-400 rounded-xl hover:shadow-md"
        >
          <div className="flex flex-col items-center">
            {isHovered ? (
              <Image
                src={openDevice}
                alt="Opened Device"
                width={200}
                height={200}
              />
            ) : (
              <Image
                src={closeDevice}
                alt="Closed Device"
                width={200}
                height={200}
              />
            )}
            <h1>
              <span>포</span>
              <span className="text-red-600">켓</span>
              <span className="text-yellow-400">몬</span>
              <span className="text-green-600"> 도감</span>으로
              <span className="font-bold animate-[slideRight_0.5s_forwards]">
                {" "}
                이동
              </span>
            </h1>
          </div>
        </a>
      </Link>
    </main>
  );
}
