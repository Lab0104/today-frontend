import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "@emotion/styled";

const DatePicker = (props: any): any => {
  const [startDate, setStartDate] = useState(null);
  const [startDateNow, setStartDateNow] = useState(new Date());

  return (
    <>
      {props.includeTime ? (
        <CustomDatePicker
          selected={startDateNow}
          onChange={(date: any) => setStartDateNow(date)}
          locale={ko}
          dateFormat={props.time ? props.time : "yyyy. M. d h:mm aa"}
          // dateFormat="yyyy. M. d h:mm aa"
          minDate={new Date()}
          showDisabledMonthNavigation
        />
      ) : (
        <CustomDatePicker
          placeholderText={props.text}
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          locale={ko}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat={props.time ? props.time : "yyyy. M. d h:mm aa"}
          // dateFormat="yyyy. M. d h:mm aa"
          minDate={new Date()}
          showDisabledMonthNavigation
        />
      )}
    </>
  );
};

const CustomDatePicker = styled(ReactDatePicker)`
  border: none;
  font-size: 12px;
  padding: 0;
`;

export default DatePicker;
