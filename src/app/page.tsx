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
      <Link
        href="/pokemonList"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="m-4 p-4 rounded-xl"
      >
        <div className="flex flex-col items-center">
          {isHovered ? (
            <Image
              src={openDevice}
              alt="Opened Device"
              width={500}
              height={500}
              className="border-none shadow-none"
            />
          ) : (
            <Image
              src={closeDevice}
              alt="Closed Device"
              width={500}
              height={500}
              className="border-none shadow-none"
            />
          )}
          <h1 className="mt-4">
            {" "}
            {/* 추가된 여백 */}
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
      </Link>
    </main>
  );
}
