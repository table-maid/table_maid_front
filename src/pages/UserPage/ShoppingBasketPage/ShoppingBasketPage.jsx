/** @jsxImportSource @emotion/react */
import * as s from "./style";
import useUserApis from "../../../hooks/useUserApis";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import { sendMenu } from "../../../apis/api/order";
import {
  ShoppingCartState,
  TotalPriceState,
} from "../../../atoms/ShoppingCartAtom";
import { useSearchParams } from "react-router-dom";
import { getCompanyNameRequest } from "../../../apis/api/user";

function ShoppingBasketPage(props) {
  const { adminInfo } = useUserApis();
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get("adminId");
  const [cart, setCart] = useRecoilState(ShoppingCartState);
  const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceState);
  const [companyName, setCompanyName] = useState("");

  const handleDeleteFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  console.log(cart);

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
  });

    const getCompanyNameQuery = useQuery(
      ["getCompanyNameQuery"],
      () =>
        getCompanyNameRequest({
          adminId: adminId,
        }),
      {
        enabled: !!adminId,
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
          setCompanyName(response.data);
          console.log(response.data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        const itemTotal =
          item.menu.menuPrice +
          item.options.reduce((acc, opt) => acc + opt.optionPrice, 0);
        return total + itemTotal;
      }, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [cart, setTotalPrice]);

  return (
    <div css={s.layout}>
      <div>{companyName?.companyName}</div>
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

      <div>
        <h2>전체 총 가격: {totalPrice}</h2>
      </div>

      <button onClick={() => SEEsendMenus.mutate(cart)}>주문하기</button>
    </div>
  );
}

export default ShoppingBasketPage;
