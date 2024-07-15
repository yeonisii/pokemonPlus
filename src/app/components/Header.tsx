"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
// import logo from "../img/pokemonlogo_nukki.png";
// import searchicon from "../img/searchicon.png";
import { useSearchStore } from "@/zustand/useSearchStore";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie"; // 추가됨

// 스타일 컴포넌트

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
  height: 60px;
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
  justify-content: center;
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

const Button = styled.button`
  background-color: #374151;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 144px;
  height: 40px;
  margin-left: 10px;
`;

const HeaderComponent: React.FC = () => {
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToList = () => {
    if (isClient) {
      router.push("/pokemonList");
    }
  };

  const goToMyPage = () => {
    if (isClient) {
      router.push("/myPage");
    }
  };

  return (
    <Header>
      <LogoContainer onClick={goToList}>
        <Image
          src="/image/pokemonlogo_nukki.png"
          alt="Pokemon Logo"
          // layout="intrinsic"
          width={160}
          height={60}
          style={{ width: "auto" }}
        />
      </LogoContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <SearchButton>
          <Image
            src="/image/searchicon.png"
            alt="Search Icon"
            width={24}
            height={24}
            style={{ width: "auto" }}
          />
        </SearchButton>
      </SearchContainer>
      <UserContainer onClick={goToMyPage}>
        <UserIconWrapper>
          <Image
            src="/image/usericon.png"
            alt="User Icon"
            width={40}
            height={40}
            style={{ width: "100%", height: "auto" }}
          />
        </UserIconWrapper>
        <Divider />
        <Button>Sign up</Button>
      </UserContainer>
    </Header>
  );
};

export default HeaderComponent;
