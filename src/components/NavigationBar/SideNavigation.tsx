import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { loginNavigationMenus, navigationMenus } from "utils/navigationMenus";

export default function SideNavigation({
  loginStatus,
  isOpen,
}: {
  loginStatus: boolean;
  isOpen: boolean;
}) {
  const navigate = useNavigate();

  const navMenus = useMemo(
    () => (loginStatus ? loginNavigationMenus : navigationMenus),
    [loginStatus]
  );

  return (
    <>
      <SideNav isOpen={isOpen}>
        <CloseButton>
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => console.log("모달 창 끄는 로직")}
          />
        </CloseButton>
        {navMenus &&
          navMenus.map((menus, idx) => (
            <MenuList key={idx}>
              {menus &&
                menus.map((menu, idx) => (
                  <span key={idx} onClick={() => navigate(menu.href)}>
                    {menu.name}
                  </span>
                ))}
            </MenuList>
          ))}
      </SideNav>
      <Dim isOpen={isOpen} onClick={() => console.log("모달 창 끄는 로직")} />
    </>
  );
}

const SideNav = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: -10px;
  width: 296px;
  height: 1024px;
  padding: 30px;
  z-index: 9;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateX(-${({ isOpen }) => (isOpen ? 0 : 306)}px);
  transition: transform 0.5s ease-in-out;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.3);

  & span {
    cursor: pointer;
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:not(&:last-of-type)::after {
    content: "";
    border-top: 1px solid black;
  }
`;

const Dim = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  height: 1440px;
  position: absolute;
  top: 0;
  right: 0;
  botton: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;
