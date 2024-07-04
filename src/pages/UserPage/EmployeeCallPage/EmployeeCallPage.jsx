/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { ShoppingCartState } from "../../../atoms/ShoppingCartAtom";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function EmployeeCallPage(props) {
  const navigate = useNavigate();
  const [cart, setCart] = useRecoilState(ShoppingCartState);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleShoppingClick = () => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, ...selectedItems];
      return updatedCart;
    });
    navigate(`/user/shopping`);
  };

  const handleAddToCart = (itemName) => {
    setSelectedItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.menu.menuName === itemName
      );

      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].count += 1;
        console.log("Updated Items:", updatedItems);
        return updatedItems;
      } else {
        const newItem = {
          menu: {
            menuName: itemName,
            menuPrice: 0,
          },
          options: [],
          count: 1,
        };
        const updatedItems = [...prevItems, newItem];
        return updatedItems;
      }
    });
  };

  const handleIncreaseQuantity = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.itemBox}>
          <button onClick={() => handleAddToCart("수저")} css={s.item}>
            수저
          </button>
          <button onClick={() => handleAddToCart("물컵")} css={s.item}>
            물컵
          </button>
          <button onClick={() => handleAddToCart("얼음")} css={s.item}>
            얼음
          </button>
          <button onClick={() => handleAddToCart("소주컵")} css={s.item}>
            소주잔
          </button>
          <button onClick={() => handleAddToCart("맥주잔")} css={s.item}>
            맥주잔
          </button>
          <button onClick={() => handleAddToCart("물수건")} css={s.item}>
            물수건
          </button>
          <button onClick={() => handleAddToCart("직원호출")} css={s.item}>
            직원호출
          </button>
        </div>
      </div>
      <h3 css={s.itemTitle}>선택된 아이템</h3>
      <div css={s.selectedItemsBox}>
        {selectedItems.map((item, index) => (
          <div key={index} css={s.selectedItem}>
            <h3>{item.menu.menuName}</h3>
            <div css={s.count}>
              <button onClick={() => handleDecreaseQuantity(index)}>
                <FaMinus />
              </button>
              <span>{item.count}</span>
              <button onClick={() => handleIncreaseQuantity(index)}>
                <FaPlus />
              </button>
            </div>
              <button onClick={() => handleRemoveItem(index)} css={s.close}>
              <IoClose size={25}/>
              </button>
          </div>
        ))}
      </div>
      <div css={s.buttonBox}>
        <button onClick={handleShoppingClick}>호출하기</button>
      </div>
    </div>
  );
}

export default EmployeeCallPage;
