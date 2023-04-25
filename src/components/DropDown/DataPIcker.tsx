import { useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "@emotion/styled";

const DatePicker = (): any => {
  const [startDate, setStartDate] = useState(null);

  return (
    <CustomDatePicker
      placeholderText="날짜"
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      showTimeSelect
      locale={ko}
      timeFormat="HH:mm"
      timeIntervals={15}
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
