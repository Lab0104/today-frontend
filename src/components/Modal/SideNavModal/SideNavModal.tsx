import React, { useMemo } from "react";
import styled from "@emotion/styled";
// import { CSSTransition } from "react-transition-group";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { loginNavigationMenus, navigationMenus } from "utils/navigationMenus";
import { TypeUser } from "userTypes";
import "../Modal.scss";

interface modalProps {
  isOpen: boolean;
  selector?: string;
}

export default function SideNavModal({ isOpen }: modalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state: { user: TypeUser }) => state.user);

  const navMenus = useMemo(
    () => (isLogged ? loginNavigationMenus : navigationMenus),
    [isLogged]
  );

  const onNavItemClick = (href: string) => {
    dispatch(closeModal());
    navigate(href);
  };

  return (
    <>
      <Overlay>
        <SideNav isOpen={isOpen}>
          <Header>
            <Title>오늘 하루</Title>
            <CloseButton>
              <AiOutlineClose
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(closeModal())}
              />
            </CloseButton>
          </Header>
          {navMenus &&
            navMenus.map((menus, idx) => (
              <MenuList key={idx}>
                {menus &&
                  menus.map((menu, idx) => (
                    <span key={idx} onClick={() => onNavItemClick(menu.href)}>
                      {menu.name}
                    </span>
                  ))}
              </MenuList>
            ))}
        </SideNav>
        <Dim onClick={() => dispatch(closeModal())} />
      </Overlay>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
`;

const navOpenKeyFrame = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;
const navCloseKeyFrame = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%)
  }
`;

const SideNav = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  top: 0;
  width: 60%;
  max-width: 296px;
  min-width: 200px;
  height: 100%;
  padding: 30px 30px 30px 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.3);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  animation: ${({ isOpen }) => (isOpen ? navOpenKeyFrame : navCloseKeyFrame)}
    400ms ease-in-out;
  &::-webkit-scrollbar {
    display: none;
  }

  & span {
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.span`
  cursor: default;
  font-size: 24px;
  font-weight: 700;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & span {
    width: fit-content;
    color: #474747;
  }

  & span:hover {
    text-decoration: underline;
  }

  &:last-of-type span {
    color: #707070;
    font-size: 14px;
  }

  &:not(&:last-of-type)::after {
    content: "";
    border-top: 1px solid #979797;
  }
`;

const Dim = styled.div`
  height: 1440px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;
