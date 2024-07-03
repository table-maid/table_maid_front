/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import PosEditButtonList from "../../../components/Pos/PosEditButtonList/PosEditButtonList";
import usePosButtonList from "../../../hooks/usePosButtonList";
import PosEditFloor from "../../../components/Pos/PosEditFloor/PosEditFloor";

function PosTableEditPage() {
  const buttons = usePosButtonList();
  const [tableCountButton, setTableCountButton] = useState("3X3");
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState(0);
  const [floors, setFloors] = useState([
    {
      floorNum: 1,
      floorName: "1층",
      tables: [],
    },
  ]);
  const [nowSelectFloor, setNowSelectFloor] = useState(1);
  const [isOpenFloorEdit, setIsOpenFloorEdit] = useState(false);
  const [isOpenFloorList, setIsOpenFloorList] = useState(false);

  // 버튼을 클릭할때마다 그 수의 맞는 배열 생성
  // 그 배열의 맞는 css 설정
  useEffect(() => {
    // css에 필요한 값
    const parts = tableCountButton.split('X');
    setColumns(parts[0]);
    // 배열 생성
    const modified = tableCountButton.replace('X', '*');
    // eval() 함수는 문자열을 실행 가능한 자바스크립트 코드로 변환
    const resultLenght = eval(modified)

    const newTables = [];
    for (let i = 0; i < resultLenght; i++) {
      newTables.push({id: i + 1, tableName: ""});
    }
    setTables(newTables)
  },[tableCountButton])

  // 층마다의 배열들
  useEffect(() => {
    const updatedFloors = floors.map((floor) => {
      if (floor.floorNum === nowSelectFloor) {
        return { ...floor, tables };
      }
      return floor;
    });
    setFloors(updatedFloors);
  },[tables])
  
  // 선택된 층/구역의 테이블 
  const handleSelectFloor = (floorNum) => {
    setNowSelectFloor(floorNum)

    const selectFloor = floors.filter((floor) => floor.floorNum === floorNum)[0];
    const resultColumns = getColumns(selectFloor.tables.length);
    setColumns(resultColumns)

    setTables(selectFloor.tables)
  }

  // 층 선택될때 css columns 값 재배치
  const getColumns = (value) => {
    for(let buttonCount of buttons) {
      const [rows, colums] = buttonCount.split('X').map(Number);
      if(rows * colums === value) {
        return rows;
      }
    }
    return alert("colums오류")
  } 


  console.log("editpage");
  console.log(floors);

  return (
    <div css={s.posLayout}>
      
      {/* 테이블 갯수 버튼 */}
      <div>
        <PosEditButtonList buttons={buttons} setTableCount={setTableCountButton}/>
      </div>    

      {/* 테이블들 */}
      <div css={s.tableLayout}>
        <div css={s.tableContainer(columns)}>
          {
            tables.map((table, index) => (
              <div css={s.tableButton} key={index}> 
                <div css={s.tableHeader}>
                  {table.id}  
                </div> 
              </div>
            ))
          }
        </div>
      </div>

      {/* 옵션 */}
      <div css={s.managmentLayout}>
       <div css={s.managmentContainer}>
        <button onClick={() => setIsOpenFloorEdit(!isOpenFloorEdit)}>
          층/구역 관리
        </button>
        {/* 층/구역 관리 */}
        <div css={s.floorManagement}>
          {isOpenFloorEdit ? <PosEditFloor floors={floors} setFloors={setFloors} setIsOpenFloorEdit={setIsOpenFloorEdit}/> : ""}
        </div>

        <button>삭제</button>
        <button>수정</button>

        <button onClick={() => setIsOpenFloorList(!isOpenFloorList)}>
          {/* 층 삭제시 오류 해결해야됨 */}
          {floors.filter((floor) => floor.floorNum === nowSelectFloor)[0].floorName}
        </button>
          {/* 생성된 층/구역 List */}
          <div>
          {
          isOpenFloorList 
          ? 
            floors.map((floor, index) => (             
              <div key={index}>
                <button onClick={() => handleSelectFloor(floor.floorNum)}>
                  {floor.floorName}
                </button>
              </div>
            ))
          :
            <></>
          }
          </div>
       </div>
      </div>
        
      











    </div>
  )
}

export default PosTableEditPage
