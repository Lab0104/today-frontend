/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const fontWhiteBold = css`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;
const containerDefaultOptions = css`
  box-sizing: border-box;
  display: flex;
  min-height: 370px;
  color: #ccc;
  text-align: left;
`;

const FooterMenuContainer = styled.div<{ background: string }>`
  padding: 40px 20px;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  background-color: ${({ background }) => background};
  ${containerDefaultOptions}
`;

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
`;
const Menus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
  & > p {
    cursor: pointer;
    ${fontWhiteBold}
  }
  & > span {
    cursor: pointer;
  }
`;

const ContractContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const menuList = [
  ["서비스", "공지사항", "계정 일시잠금", "자주 묻는 질문", "고객센터"],
  ["회사", "회사 소개", "오늘 하루", "채용", "블로그", "공고"],
  ["문의", "광고 문의", "PR 문의", "IR 문의", "제휴 문의"],
  [
    "고객 센터",
    "전화 : 1577-0000 (09:00 - 18:00, 공휴일 휴무)",
    "이메일(고객전용) : support@today.im",
    "이메일(외부전용) : cop@today.im",
    "민원 접수",
  ],
];
const contractList = [
  "개인정보처리방침",
  "홈페이지 이용약관",
  "위치정보 이용약관",
  "비회원 이용약관",
  "마이데이터 서비스 이용약관",
];
const corpInfoList = [
  "사업자 등록번호 : 000-00-00000",
  "(주) OO Company",
  "TEL : 1577-0000",
  "개인정보 책임자 : 문지혜",
];

export default function FooterMenus() {
  return (
    <FooterMenuContainer background={"#6667AB"}>
      <MenuContainer>
        {menuList &&
          menuList.map((menus, index) => (
            <Menus key={index}>
              {menus &&
                menus.map((menu, idx) =>
                  idx === 0 ? (
                    <p key={idx}>{menu}</p>
                  ) : (
                    <span key={idx}>{menu}</span>
                  )
                )}
            </Menus>
          ))}
      </MenuContainer>
      <ContractContainer>
        {contractList &&
          contractList.map((contract, idx) =>
            idx === 0 ? (
              <span key={idx} css={fontWhiteBold}>
                {contract}
              </span>
            ) : (
              <span key={idx}>{contract}</span>
            )
          )}
      </ContractContainer>
      <ContractContainer>
        {corpInfoList &&
          corpInfoList.map((info, idx) => <span key={idx}>{info}</span>)}
      </ContractContainer>
    </FooterMenuContainer>
  );
}
