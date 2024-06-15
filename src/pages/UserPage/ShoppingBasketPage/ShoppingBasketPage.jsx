/** @jsxImportSource @emotion/react */
import * as s from "./style";
import useUserApis from "../../../hooks/useUserApis";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ShoppingCartState } from "../../../atoms/ShoppingCartAtom";

function ShoppingBasketPage(props) {
  const { adminInfo } = useUserApis();
  const [cart, setCart] = useRecoilState(ShoppingCartState);

  const handleDeleteFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(cart)
  }, [])

  return (
    <div css={s.layout}>
      <div>{adminInfo?.companyName}</div>
      {cart.map((item, index) => (
        <div key={index}>
          <img src={item.menu.menuImgUrl} alt="메뉴 이미지" />
          <h2>{item.menu.menuName}</h2>
          <p>가격: {item.menu.menuPrice}</p>
          <div>
            {item.options.map((opt, idx) => (
              <div key={idx}>
                <p>
                  {opt.optionName} ( + {opt.optionPrice} )
                </p>
              </div>
            ))}
          </div>
          <button onClick={() => handleDeleteFromCart(index)}>
            장바구니에서 삭제
          </button>
        </div>
      ))}
      <button>주문하기</button>
    </div>
  );
}

export default ShoppingBasketPage;
