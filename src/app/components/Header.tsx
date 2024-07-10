"use client";

import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Image from "next/image";
import logo from "../img/pokemonlogo_nukki.png";
import searchicon from "../img/searchicon.png";
import usericon from "../img/usericon.png";
import { useSearchStore } from "@/zustand/useSearchStore";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #e5e7eb;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  margin-right: 5px;
  flex-grow: 1;
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

const UserIconWrapper = styled.div`
  cursor: pointer;
`;

const Divider = styled.div`
  height: 24px;
  width: 2px;
  background-color: #374151;
  margin: 0 10px;
`;

const SignUpButton = styled.button`
  background-color: #374151;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 144px;
  height: 40px;
`;

const HeaderComponent: React.FC = () => {
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Header>
      <LogoContainer>
        <Image
          src={logo}
          alt="Pokemon Logo"
          layout="fixed"
          width={160}
          height={82}
        />
      </LogoContainer>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>
          <Image src={searchicon} alt="Search Icon" width={24} height={24} />
        </SearchButton>
      </SearchContainer>
      <UserContainer>
        <UserIconWrapper>
          <Image src={usericon} alt="User Icon" width={40} height={40} />
        </UserIconWrapper>
        <Divider />
        <SignUpButton>Sign up</SignUpButton>
      </UserContainer>
    </Header>
  );
};

export default HeaderComponent;
