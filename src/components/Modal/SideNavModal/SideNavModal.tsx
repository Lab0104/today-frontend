import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";
import { AiOutlineClose } from "react-icons/ai";
import { loginNavigationMenus, navigationMenus } from "utils/navigationMenus";
import { TypeUser } from "userTypes";
import Portal from "../Portal";
import "../Modal.scss";

interface modalProps {
  isOpen: boolean;
  selector?: string;
}

export default function SideNavModal({ isOpen, selector }: modalProps) {
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
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
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
          <Dim isOpen={isOpen} onClick={() => dispatch(closeModal())} />
        </Overlay>
      </Portal>
    </CSSTransition>
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

const SideNav = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: -10px;
  width: 296px;
  height: 100%;
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
