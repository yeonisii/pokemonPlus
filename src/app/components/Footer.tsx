"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import psyduck from "../img/psyduckicon.png"; //싸이덕 아이콘
import facebookIcon from "../img/facebookicon.png"; // 페이스북 아이콘
import twitterIcon from "../img/twittericon.png"; // 트위터 아이콘
import instagramIcon from "../img/instargramicon.png"; // 인스타그램 아이콘

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #374151;
  color: #ffffff;
`;

const Placeholder = styled.div`
  width: 50px;
  height: 50px;
  border: 2px dashed #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  margin: 0 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

const FooterComponent = () => {
  return (
    <Footer>
      <Placeholder>Placeholder</Placeholder>
      <CenterContainer>
        <Text>@2024 열일하조</Text>
        <Image src={psyduck} alt="Psyduck" width={40} height={40} />
        <Text>Pokemon_Plus</Text>
      </CenterContainer>
      <SocialIcons>
        <Icon>
          <Image src={facebookIcon} alt="Facebook" width={32} height={32} />
        </Icon>
        <Icon>
          <Image src={twitterIcon} alt="Twitter" width={32} height={32} />
        </Icon>
        <Icon>
          <Image src={instagramIcon} alt="Instagram" width={32} height={32} />
        </Icon>
      </SocialIcons>
    </Footer>
  );
};

export default FooterComponent;
