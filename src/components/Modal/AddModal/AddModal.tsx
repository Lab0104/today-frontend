import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";
import { toggleButtons } from "../../../reducer/ToggleSlice";

import { useDaumPostcodePopup } from "react-daum-postcode";
import "./AddModal.scss";

import {
  BsAlarm,
  BsMap,
  BsCalendar2,
  BsPeopleFill,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import DatePicker from "components/Assest/DataPIcker";

import { categories } from "components/CategoryList/CategoryList";
import { Controller, useForm } from "react-hook-form";
import DatePickerForm from "components/Assest/DatePickerForm";
import { Geocoder } from "components/Assest/Geocoder";

type FormValues = {
  user_nicname: string; //작성자 닉네임
  date: string; //모임 날짜
  deadline: string; //모임 마감 날짜
  maximum_participants: number; //모집 정원
  address: string; //주소
  address_latitude: number; //주소(위도)
  address_longitude: number; //주소(경도)
  large_category: string; //대분류
  category: string; //소분류 카테고리
  title: string; //제목
  sub_title: string; //소제목
  contnets: string; //모임 소개
};

const AddModal = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("주소");
  const [category, setCategory] = useState("모임 카테고리");
  const [view, setView] = useState(false);

  const {
    register,
    control,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<FormValues>();

  const Dropdown = (): JSX.Element => {
    return (
      <div className="drop-box">
        <ul>
          {categories.map((data, idx1) => {
            return (
              <div className="wrapper" key={"box" + idx1}>
                <li className="data-name" key={"name" + idx1}>
                  {data.name}
                </li>
                <div className="data-list" key={"list" + idx1}>
                  {data.list.map((list, idx2) => {
                    return (
                      <li
                        key={idx2}
                        onClick={() => {
                          setCategory(data.name + " > " + list);
                        }}
                      >
                        {list}
                      </li>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };

  const open = useDaumPostcodePopup();
  const POPUPWIDTH = 500;
  const POPUPHEIGHT = 400;

  const handleComplete = (data: {
    sigungu: string;
    address: string;
    addressType: string;
    bname?: string | undefined;
    buildingName?: string | undefined;
  }) => {
    // 향후 매칭에 활용 될 시군 데이터
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
  };

  const onAddressClick = () => {
    open({
      onComplete: handleComplete,
      width: POPUPWIDTH,
      height: POPUPHEIGHT,
      left: document.body.offsetWidth / 2 - POPUPWIDTH / 2,
      top: window.screen.height / 2 - POPUPHEIGHT / 2,
    });
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    dispatch(closeModal());
    dispatch(toggleButtons({ idx: 3 }));

    Geocoder(data.address)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container-box">
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
        <button
          className="exit-button"
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 3 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content-box_add">
          <div className="input-box">
            <div className="input-title">
              <input placeholder="모임 제목" {...register("title")}></input>
            </div>
            <div
              className="category"
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? (
                <div className="drop-down">
                  <BsChevronUp />
                </div>
              ) : (
                <div className="drop-down">
                  <BsChevronDown />
                </div>
              )}
              {view && <Dropdown></Dropdown>}
              <input
                type="text"
                // readOnly
                value={category}
                {...register("category")}
              ></input>
            </div>

            <div className="input-info">
              <div className="people info-box">
                <BsPeopleFill />
                <input
                  placeholder="인원 수"
                  type="number"
                  min="2"
                  {...register("maximum_participants")}
                ></input>
              </div>
              <div className="date info-box">
                <div>
                  <BsCalendar2 />
                </div>
                <DatePickerForm
                  control={control}
                  name="date"
                  placeholder="모임 시작시간"
                  includeTime="true"
                />
                <DatePickerForm
                  control={control}
                  name="endDate"
                  placeholder="모임 종료시간"
                  includeTime="true"
                />
              </div>
              <div className="place info-box">
                <BsMap />
                <input
                  type="text"
                  onClick={onAddressClick}
                  value={address}
                  readOnly
                  {...register("address")}
                />
                {/* <input type="text" placeholder="상세주소" /> */}
              </div>
              <div className="deadline info-box">
                <BsAlarm />
                <DatePickerForm
                  control={control}
                  name="deadLine"
                  placeholder="모집 마감날짜"
                  includeTime="false"
                />
              </div>
            </div>
            <div className="input-content">
              <textarea
                placeholder="모임 내용"
                {...register("contnets")}
              ></textarea>
              <div className="tag">
                <input placeholder="#태그" />
                <input placeholder="#태그" />
                <input placeholder="#태그" />
                <input placeholder="#태그" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="add"
            // onClick={() => {
            //
            // }}
            disabled={isSubmitting}
          >
            개설 하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
