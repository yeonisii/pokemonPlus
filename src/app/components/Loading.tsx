"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #200f50;
  width: 100vw;
  height: 100vh;
`;

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <LoadingWrapper>
      <Image
        src="/image/Animation2.gif"
        alt="Loading..."
        priority={true}
        width={300}
        height={300}
      />
    </LoadingWrapper>
  );
};

export default Loading;
