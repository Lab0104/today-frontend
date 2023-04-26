import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "@emotion/styled";

const DatePicker = (props: any): any => {
  const [startDate, setStartDate] = useState(null);

  return (
    <CustomDatePicker
      placeholderText={props.text}
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      showTimeSelect
      locale={ko}
      timeFormat="HH:mm"
      timeIntervals={15}
      // dateFormat={props.time ? "h:mm aa" : "yyyy. M. d h:mm aa"}
      dateFormat="yyyy. M. d h:mm aa"
      minDate={new Date()}
      showDisabledMonthNavigation
    />
  );
};

const CustomDatePicker = styled(ReactDatePicker)`
  border: none;
  font-size: 12px;
  padding: 0;
`;

export default DatePicker;
