/** @jsxImportSource @emotion/react */
import * as s from "./style";
import useUserApis from "../../../hooks/useUserApis";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ShoppingCartState } from "../../../atoms/ShoppingCartAtom";
import { useMutation } from "react-query";
import { sendMenu } from "../../../apis/api/order";

function ShoppingBasketPage(props) {
  const { adminInfo } = useUserApis();
  const [cart, setCart] = useRecoilState(ShoppingCartState);

  const handleDeleteFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // SEE로 get요청 보내기
  const SEEsendMenus = useMutation({
    mutationKey: "SEEsendMenus",
    mutationFn: sendMenu,
    onSuccess: (response) => {
      console.log("주문성공");
      console.log(response);
    },
    onError: (Error) => {
      console.log("주문실패");
      console.log(Error);
    }
  }) 

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
      <button onClick={() => SEEsendMenus.mutate(cart)}>주문하기</button>
    </div>
  );
}

export default ShoppingBasketPage;
