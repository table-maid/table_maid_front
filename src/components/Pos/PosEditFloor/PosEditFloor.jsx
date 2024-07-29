import { useState } from "react";
import { useMutation } from "react-query";
import { deleteFloorRequest } from "../../../apis/api/posEdit";
import { useRecoilState } from "recoil";
import { adminIdState } from "../../../atoms/AdminIdStateAtom";

function PosEditFloor({ floors, setFloors, setIsOpenFloorEdit }) {
  const [adminId] = useRecoilState(adminIdState);
  const [isOpenAddFloor, setisOpenAddFloor] = useState(false);
  const [floorNum, setFloorNum] = useState(0);
  const [floorName, setFloorName] = useState("");
  const [localFloors, setLocalFloors] = useState(floors);

  // 층 추가
  const addFloor = () => {
    const newTables = [];
    for (let i = 0; i < 9; i++) {
      newTables.push({adminId: 1, tableNum: i + 1, tableName: i + 1, checked: false });
    }

    setLocalFloors([
      ...localFloors,
      {
        adminId: adminId,
        floorNum: parseInt(floorNum),
        floorName: floorName,
        tables: newTables,
      },
    ]);
  };

  // 층 삭제
  const deleteFloorMutation = useMutation({
    mutationKey: "deleteFloorMutation",
    mutationFn: deleteFloorRequest,
    onSuccess: (response) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteFloor = (floorNum) => {
    if (localFloors.length <= 1) {
      return alert("적어도 한 층은 있어야 합니다.");
    }
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    const updatedFloors = localFloors.filter(
      (floor) => floor.floorNum !== floorNum
    );
    setLocalFloors(updatedFloors);
    deleteFloorMutation.mutate({ adminId, floorNum });
  };

  // 저장
  const handleSave = () => {
    setFloors(localFloors);
    setIsOpenFloorEdit(false);
  };

  // 취소
  const handleCancel = () => {
    setLocalFloors(floors);
    setIsOpenFloorEdit(false);
  };

  return (
    <>
      {/* header */}
      <div>
        <h2>층/구역 관리</h2>
        <button onClick={() => setisOpenAddFloor(!isOpenAddFloor)}>추가</button>
        {isOpenAddFloor ? (
          <div>
            <input
              type="number"
              onChange={(e) => setFloorNum(e.target.value)}
            />
            층
            <input type="text" onChange={(e) => setFloorName(e.target.value)} />
            구역명
            <button onClick={addFloor}>추가하기</button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* body */}
      <div>
        <h4>층/구역명</h4>
        {/* 층 list */}
        <div>
          {localFloors.map((floor, index) => (
            <div key={index}>
              <div>{floor.floorNum}</div>
              <div>{floor.floorName}</div>
              <button onClick={() => deleteFloor(floor.floorNum)}>삭제</button>
            </div>
          ))}
        </div>
        {/* 순서 button */}
        <div>
          <button>위</button>
          <button>아래</button>
        </div>
      </div>

      {/*  */}
      <div>
        <button onClick={handleCancel}>취소</button>
        <button onClick={handleSave}>저장</button>
      </div>
    </>
  );
}

export default PosEditFloor;
