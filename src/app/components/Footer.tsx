"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
// import psyduck from "../img/psyduckicon.png"; // 싸이덕 아이콘

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; // 자식 요소의 position 설정을 위해 필요
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #374151;
  color: #ffffff;
  width: 100%;
  height: 70px;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  margin: 0 10px;
`;

const FooterComponent = () => {
  return (
    <Container>
      <Footer>
        <CenterContainer>
          <Text>@2024 열일하조</Text>
          <Image
            src="/image/psyduckicon.png"
            alt="Psyduck"
            width={40}
            height={40}
          />
          <Text>Pokemon_Plus</Text>
        </CenterContainer>
      </Footer>
    </Container>
  );
};

export default FooterComponent;
