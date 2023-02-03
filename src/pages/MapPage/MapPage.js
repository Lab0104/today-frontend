import React, { useEffect, useState } from "react";
import "./MapPage.css";
// import KakaoMap from "../../components/KakaoMapApi/KakaoMap";
import { useDebounce } from "../../hooks/useDebounce";
import Map from "../../components/KakaoMapApi/Map";

function List(props) {
  const [listArry, setListArry] = useState([]);
  const [liked, setLiked] = useState([0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    props.searchData.map((data, index) => {
      let copy = [...listArry];
      copy.push(data.address_name);
      setListArry([...copy]);
    });
    console.log(props.listArry);
  }, [props.searchData]);

  return (
    <div>
      {listArry.map((list, idx) => (
        <div key={idx}>
          <div>
            <h4
              onClick={() => {
                setModal(!modal);
                setIndex(idx);
              }}
            >
              {list}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  liked[idx] += 1;
                  setLiked([...liked]);
                }}
              >
                👍
              </span>
              {liked[idx]}
            </h4>
            <p>2월 17일 발행</p>
            <button
              onClick={() => {
                let copy = [...listArry];
                copy.splice(idx, 1);
                setListArry(copy);
                let copyLiked = [...liked];
                copyLiked.splice(idx, 1);
                setLiked(copyLiked);
              }}
            >
              글 삭제
            </button>
          </div>
          <hr></hr>
        </div>
      ))}

      <button
        onClick={() => {
          const copy = [];
          let pushed = false;
          listArry.map((list, idx) => {
            copy.map((compareList, i) => {
              if (list < compareList && pushed === false) {
                copy.splice(i, 0, list);
                pushed = true;
              }
              return 0;
            });
            pushed ? (pushed = false) : copy.push(list);
            return 0;
          });
          setListArry(copy);
        }}
      >
        가나다순 정렬하기
      </button>
      <input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          let copyList = [...listArry];
          copyList.push(inputValue);
          setListArry(copyList);

          let copyLiked = [...liked];
          copyLiked.push(0);
          setLiked(copyLiked);
        }}
      >
        글 추가
      </button>
    </div>
  );
}

function MapPage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <div className="main">
      <div className="searchTab">
        <div className="searchBox">
          <div className="title">
            <img src="" alt="nav"></img>
            <p>오늘하루</p>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} value={searchValue}></input>
          </div>
          <div className="fliter">
            <button className="selected">모두</button>
            <button>비어있는 모임방</button>
            <button>참여중인 모임방</button>
            <button>학술</button>
            <button>취미</button>
          </div>
        </div>
        <div className="dashBoard">
          <div className="searchResult">
            모임명 <span>밥</span> 검색결과
          </div>
          <hr />
          <div className="largeBox">
            <div className="title">
              <img src="" alt="Icon"></img>
              <div className="text">
                <p>스터디 모임 (2/4)</p>
                <p>코딩테스트 자바 스터디</p>
              </div>
              <img className="liked" src="" alt="Liked"></img>
            </div>
            <hr className="line"></hr>
            <div className="content">
              <p>경기 용인시 기흥구 강남서로 9 2022-12-29 13:00 ~ 18:00</p>
              <p>
                <span>모집중</span> | 2022-12-29 12:00 - 모집 마감
              </p>
              <p className="tag">준비물 없음 | 초보자 환영 | 모임 시간 준수</p>
              <p className="time">30분 전</p>
            </div>
          </div>
          <hr />
          <div className="smallBox">
            <p className="count">모임 124개</p>
            <p> 정확도순 </p>
            <p> 인기도순 </p>
            <p> 마감날짜순 </p>
          </div>
          <List searchData={searchData}></List>
        </div>
      </div>
      <div className="mapComponent">
        <Map keyword={debouncedSearchTerm} setSearchData={setSearchData}></Map>
        {/* <KakaoMap keyword={debouncedSearchTerm}></KakaoMap> */}
      </div>
    </div>
  );
}

export default MapPage;
