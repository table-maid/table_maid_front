/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import PosEditButtonList from "../../../components/Pos/PosEditButtonList/PosEditButtonList";
import usePosButtonList from "../../../hooks/usePosButtonList";
import PosEditFloor from "../../../components/Pos/PosEditFloor/PosEditFloor";
import PosEditTableName from "../../../components/Pos/PosEditTableName/PosEditTableName";
import { useMutation } from "react-query";
import { saveFloorTableRequest } from "../../../apis/api/posEdit";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";
import { useRecoilState } from "recoil";

function PosTableEditPage() {
  const buttons = usePosButtonList();
  const [adminId] = useRecoilState(adminIdState);
  const [isOpenFloorEdit, setIsOpenFloorEdit] = useState(false);
  const [isOpenFloorList, setIsOpenFloorList] = useState(false);
  const [isOpenTableNameEdit, setIsOpenTableNameEdit] = useState(false);
  const [tableCountButton, setTableCountButton] = useState("3X3");
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState(9);
  const [floors, setFloors] = useState([
    {
      adminId: adminId,
      floorNum: 1,
      floorName: "1층",
      tables: [],
    },
  ]);
  const [nowSelectFloor, setNowSelectFloor] = useState(1);

  // 초기 테이블 설정
  useEffect(() => {
    const [rows, cols] = tableCountButton.split('X').map(Number);
    const newTables = Array(rows * cols).fill().map((_, i) => ({ tableNum: i + 1, tableName: i + 1, checked: false }));
    setTables(newTables);
    setFloors(prevFloors => prevFloors.map(floor => 
      floor.floorNum === 1 ? { ...floor, tables: newTables } : floor
    ));
  }, []);

  // tableCountButton 변경 시 테이블 갯수 설정
  useEffect(() => {
    const [rows, cols] = tableCountButton.split('X').map(Number);
    setColumns(rows);
    const newTables = Array(rows * cols).fill().map((_, i) => ({ tableNum: i + 1, tableName: i + 1, checked: false }));
    setTables(newTables);
    setFloors(prevFloors => prevFloors.map(floor => 
      floor.floorNum === nowSelectFloor ? { ...floor, tables: newTables } : floor
    ));
  }, [tableCountButton]);


  // nowSelectFloor 변경 시 테이블 상태 리셋
  useEffect(() => {
    const currentFloor = floors.find(floor => floor.floorNum === nowSelectFloor);
    if (currentFloor) {
      setTables(currentFloor.tables.map(table => ({ ...table, checked: false })));
      setColumns(getColumns(currentFloor.tables.length))
    }
  }, [nowSelectFloor]);
  
  // nowSelectFloor가 floors 배열에 없을 경우 최소 floorNum을 설정
  useEffect(() => {
    const currentFloor = floors.find(floor => floor.floorNum === nowSelectFloor);
    if (!currentFloor) {
      const minFloorNum = Math.min(...floors.map(floor => floor.floorNum));
      setNowSelectFloor(minFloorNum);
    }
  }, [floors]);


  const handleSelectFloor = (floorNum) => {
    const selectedFloor = floors.find(floor => floor.floorNum === floorNum);
    if(selectedFloor) {
      setTables(selectedFloor.tables.map(table => ({ ...table, checked: false})));
      setColumns(getColumns(selectedFloor.tables.length));
    }
    setNowSelectFloor(floorNum);
  }

  // 테이블 클릭 시 상태 변경
  const handleSelectTable = (tableNum) => {
    setTables(prevTables => {
      const newTables = prevTables.map(table => ({
        ...table,
        checked: table.tableNum === tableNum ? !table.checked : false
      }));
      return newTables;
    });
  };

  // 층 선택될때 css columns 값 재배치
  const getColumns = (tableCount) => {
    for (let buttonCount of buttons) {
      const [rows, columns] = buttonCount.split('X').map(Number);
      if (rows * columns === tableCount) {
        return rows;
      }
    }
    console.warn(`적절한 columns 값을 찾을 수 없습니다. 테이블 수: ${tableCount}`);
    return Math.ceil(Math.sqrt(tableCount)); // 기본값으로 테이블 수의 제곱근에 가까운 정수를 반환
  };

  // 테이블 이름 변경
  const updateTableName = (tableNum, newName) => {
    setTables(prevTables => prevTables.map(table =>
      table.tableNum === tableNum ? { ...table, tableName: newName } : table
    ));
    setFloors(prevFloors => 
      prevFloors.map(floor => floor.floorNum === nowSelectFloor 
        ? { ...floor, tables: floor.tables.map(table => table.tableNum === tableNum ? { ...table, tableName: newName } : table) }
          : floor
      )
    )
  };

  const handleEdit = () => {
    const selectedTable = tables.find(table => table.checked);
    if (!selectedTable) {
      alert("수정할 테이블을 클릭해주세요");
      return;
    }
    setIsOpenTableNameEdit(true);
  };

  const handleDelete = () => {
    const selectedTable = tables.find(table => table.checked);
    if (!selectedTable) {
      alert("삭제할 테이블을 클릭해주세요");
      return;
    }
    setTables(prevTables => prevTables.map(table => 
      table.tableNum === selectedTable.tableNum ? { ...table, tableNum: 444, tableName: "삭제된 테이블 입니다"} : table
    ));
    setFloors(prevFloors => 
      prevFloors.map(floor => floor.floorNum === nowSelectFloor 
        ? { ...floor, tables: floor.tables.map(table => table.tableNum === selectedTable.tableNum ? { ...table, tableNum: 444, tableName: "삭제된 테이블 입니다" } : table) }
          : floor
      )
    )
  };
  console.log(tables);
  console.log(floors);

  
  const saveFloorTable = useMutation({
    mutationKey: "saveFloorTable",
    mutationFn: saveFloorTableRequest,
    onSuccess: (response) => {
      
    },
    onError: (error) => {
      console.log(error);
    }
  })
  
  const handleSavePosEdit = (floors) => {
    if(window.confirm("층과 테이블 설정을 저장하시겠습니까?")) {
      saveFloorTable.mutate(floors)
    }
  }
  
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
              <div css={s.tableButton(table.checked, table.tableNum)} key={index} onClick={() => handleSelectTable(table.tableNum)}> 
                <div css={s.tableHeader}>
                  {table.tableName}  
                </div> 
              </div>
            ))
          }
        </div>
      </div>

      {/* 옵션 */}
      <div css={s.managmentLayout}>

       <div css={s.managmentContainer}>
        {/* 층/구역 관리 */}
        <button onClick={() => setIsOpenFloorEdit(!isOpenFloorEdit)}>
          층/구역 관리
        </button>
        <div css={s.floorManagement}>
          {isOpenFloorEdit 
          ? 
            <PosEditFloor floors={floors} setFloors={setFloors} setIsOpenFloorEdit={setIsOpenFloorEdit}/> 
          :
            <></>
          }
        </div>

        <button onClick={handleDelete}>삭제</button>

        <button onClick={handleEdit}>
          수정
        </button>
        <div css={s.floorManagement}>
          {isOpenTableNameEdit
          ?
            <PosEditTableName 
              selectedTables={tables.find(table => table.checked)}
              updateTableName={updateTableName} 
              setIsOpenTableNameEdit={setIsOpenTableNameEdit}
            />
          :
           <></>
          }
        </div>

        <button onClick={() => setIsOpenFloorList(!isOpenFloorList)}>
          {floors.find((floor) => floor.floorNum === nowSelectFloor)?.floorName || floors[0].floorName}
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

       <button onClick={() => handleSavePosEdit(floors)}>저장하기</button>

      </div>

        
      











    </div>
  )
}

export default PosTableEditPage
