"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import logo from "../img/pokemonlogo_nukki.png";
import searchicon from "../img/searchicon.png";
import usericon from "../img/usericon.png";
import { useSearchStore } from "@/zustand/useSearchStore";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie"; // 추가됨

const HeaderComponent: React.FC = () => {
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const session = Cookies.get("session");
      setIsLoggedIn(!!session);
    };

    checkLoginStatus();
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

  const goToSignIn = () => {
    if (isClient) {
      router.push("/sign-in");
    }
  };

  const handleLogout = () => {
    Cookies.remove("session"); // 쿠키를 삭제
    setIsLoggedIn(false);
    if (isClient) {
      router.push("/");
    }
  };

  const isDetailPage = pathname.includes("/pokemonList/");

  return (
    <Header>
      <LogoContainer onClick={goToList}>
        <Image
          src={logo}
          alt="Pokemon Logo"
          layout="intrinsic"
          width={160}
          height={60}
        />
      </LogoContainer>
      {!isDetailPage && (
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
          <SearchButton>
            <Image src={searchicon} alt="Search Icon" width={24} height={24} />
          </SearchButton>
        </SearchContainer>
      )}
      <UserContainer>
        <Divider />
        <UserIconWrapper onClick={goToMyPage}>
          <Image src={usericon} alt="User Icon" width={40} height={40} />
        </UserIconWrapper>
        {!isLoggedIn ? (
          <Button onClick={goToSignIn}>Sign in</Button>
        ) : (
          <Button onClick={handleLogout}>Sign out</Button>
        )}
      </UserContainer>
    </Header>
  );
};

export default HeaderComponent;

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
