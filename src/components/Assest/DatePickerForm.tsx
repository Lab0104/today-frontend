import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";

const DatePickerForm = ({
  control,
  name,
  placeholder,
  includeTime,
}: any): any => {
  return (
    <>
      {includeTime ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <ReactDatePicker
              onChange={(value: any) => {
                field.onChange(value);
              }}
              selected={field.value}
              dateFormat={"yyyy. M. d h:mm aa"}
              minDate={new Date()}
              showDisabledMonthNavigation
              locale={ko}
              placeholderText={placeholder}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <ReactDatePicker
              onChange={(value: any) => {
                field.onChange(value);
              }}
              selected={field.value}
              dateFormat={"yyyy. M. d h:mm aa"}
              minDate={new Date()}
              showDisabledMonthNavigation
              locale={ko}
              placeholderText={placeholder}
            />
          )}
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

export default DatePickerForm;
