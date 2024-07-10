"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import psyduck from "../img/psyduckicon.png"; // 싸이덕 아이콘

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #374151;
  color: #ffffff;
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
          <Image src={psyduck} alt="Psyduck" width={40} height={40} />
          <Text>Pokemon_Plus</Text>
        </CenterContainer>
      </Footer>
    </Container>
  );
};

export default FooterComponent;
