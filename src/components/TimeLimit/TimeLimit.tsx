import React, { useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  setLimitTime,
  setIsTimeout,
  setEmailSendClick,
} from "../../reducer/EmailVerify";

const Time = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 90px;
  font-size: 12px;
  color: red;
`;

export default function TimeLimit() {
  const dispatch = useDispatch();
  const { limitTime: limit } = useSelector(
    (state: { emailVerify: any }) => state.emailVerify
  );
  const savedCallback = useRef<any>();

  const convertTime = useCallback(() => {
    const minute = "0" + Math.floor(limit / 60);
    const second = limit % 60 >= 10 ? limit % 60 : "0" + (limit % 60);
    return minute + ":" + second;
  }, [limit]);

  const autoDecrease = () => {
    if (limit > 170) {
      dispatch(setEmailSendClick({ emailSendClick: false }));
    } else {
      dispatch(setEmailSendClick({ emailSendClick: true }));
    }
    if (limit > 0) {
      dispatch(setLimitTime({ limitTime: limit - 1 }));
      dispatch(setIsTimeout({ isTimeout: true }));
    }
    if (limit === 0) {
      dispatch(setIsTimeout({ isTimeout: false }));
    }
  };

  useEffect(() => {
    savedCallback.current = autoDecrease;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, []);

  return <Time>{convertTime()}</Time>;
}
