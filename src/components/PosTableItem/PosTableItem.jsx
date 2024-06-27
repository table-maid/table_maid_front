/** @jsxImportSource @emotion/react */
import { FaPlus } from "react-icons/fa";
import * as s from "./style";

const PosTableItem = ({
  table,
  index,
  headerColor,
  isSelected,
  handleClick,
  handleTableSelect,
  groupPayment,
}) => {
  const hasItems = table.selectedItems.length > 0;

  return (
    <div
      css={[s.tableButton]}
      key={index}
      onClick={() => handleTableSelect(index)}
    >
      <div css={s.table}>
        <div
          css={[
            s.tableHeader(hasItems),
            { backgroundColor: headerColor },
            isSelected && s.selectedTableHeader,
          ]}
        >
          <span css={s.tableNumber}>{index + 1}</span>
          <span css={s.tablePeople}></span>
          {groupPayment && <p>단체</p>}
        </div>
        <div css={s.tableDetails}>
          {table.selectedItems.length === 0 ? (
            <div css={s.buttonBox}>
              <div
                css={s.button}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(index);
                }}
              >
                <FaPlus size={"50"} />
              </div>
            </div>
          ) : (
            table.selectedItems.map((item, itemIndex) => (
              <div css={s.menuBox} key={itemIndex}>
                <div css={s.menuItem}>
                  <span>{item.menuName}</span>
                  <span>{item.menuCount}</span>
                </div>
              </div>
            ))
          )}
        </div>
        {table.totalPrice > 0 && (
          <div css={s.totalPrice}>
            {table.totalPrice.toLocaleString()}원
          </div>
        )}
      </div>
    </div>
  );
};

export default PosTableItem;
