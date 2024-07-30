import React, { useState } from "react";
import { useMutation } from "react-query";
import { updateTableRequest } from "../../../apis/api/posEdit";

function PosEditTableName({ floorNum, table, updateTableName, setIsOpenTableNameEdit }) {
  const [tableName, setTableName] = useState(table.tablesName);

  const handleChange = (e) => {
    setTableName(e.target.value);
  };

  const handleSubmit = () => {
    updateTableName(table.tablesNum, tableName);
    setIsOpenTableNameEdit(false);
    updateTableMutation.mutate({
      adminId: table.adminId,
      floorNum: floorNum,
      tablesNum: table.tablesNum,
      tablesName: tableName,
    });
  };

  const handleCancel = () => {
    setIsOpenTableNameEdit(false);
  };

  const updateTableMutation = useMutation({
    mutationKey: "updateTableMutation",
    mutationFn: updateTableRequest,
    onSuccess: (response) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <h1>테이블 수정</h1>
      테이블명
      <input type="text" value={tableName} onChange={handleChange} />
      <button onClick={handleCancel}>취소</button>
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
}

export default PosEditTableName;
