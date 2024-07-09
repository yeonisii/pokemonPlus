"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import logo from "../img/pokemonlogo.png"; // 로고 이미지를 로드합니다.

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #e5e7eb;
  border-bottom: 2px solid #a855f7;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px; // 이미지 높이와 동일하게 설정
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  margin-right: 5px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.div`
  background: url("/path/to/user-icon.png") no-repeat center center;
  background-size: cover;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const SignUpButton = styled.button`
  background-color: #374151;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const HeaderComponent = () => {
  return (
    <Header>
      <LogoContainer>
        <Image
          src={logo}
          alt="Pokemon Logo"
          layout="fixed"
          width={100}
          height={40}
        />
      </LogoContainer>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001a1 1 0 0 0-.117.195l-3.85 3.85a1 1 0 0 0 1.415 1.415l3.85-3.85a1 1 0 0 0 .195-.117h.001a6.5 6.5 0 0 0 1.398-1.397zm-5.6-1.697a5.5 5.5 0 1 1 7.778 0 5.5 5.5 0 0 1-7.778 0z" />
          </svg>
        </SearchButton>
      </SearchContainer>
      <UserContainer>
        <UserIcon />
        <SignUpButton>Sign up</SignUpButton>
      </UserContainer>
    </Header>
  );
};

export default HeaderComponent;
