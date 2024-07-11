import React, { useState } from "react";
import styled from "styled-components";

const SidevarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background-color: #3b4cca;
  color: white;
  transition: left 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 100%;
  transform: translateX(-100%);
  background-color: #3b4cca;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const SidebarContent = styled.div`
  padding: 20px;
`;

const SidebarItem = styled.div`
  margin: 10px 0;
`;

const Sidevar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidevarContainer isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? "닫기" : "열기"}
      </ToggleButton>
      <SidebarContent>
        <SidebarItem>닉네임 변경</SidebarItem>
        <SidebarItem>추가 기능</SidebarItem>
        <SidebarItem>회원 탈퇴</SidebarItem>
      </SidebarContent>
    </SidevarContainer>
  );
};

export default Sidevar;
