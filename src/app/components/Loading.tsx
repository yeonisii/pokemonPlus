"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gif from "../img/Animation2.gif";
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
  background-color: #200f50; // 여기서 백그라운드 색깔을 이미지와 동일하게 설정
`;

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  if (!isLoading) {
    return null; // 로딩이 끝난 후에는 아무 것도 렌더링하지 않음
  }

  return (
    <LoadingWrapper>
      <Image src={gif} alt="Loading..." priority={true} />
    </LoadingWrapper>
  );
};

export default Loading;
