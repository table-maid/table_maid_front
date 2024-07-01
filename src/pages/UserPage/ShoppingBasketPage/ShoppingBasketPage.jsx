/** @jsxImportSource @emotion/react */
import * as s from "./style";
import useUserApis from "../../../hooks/useUserApis";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";
import { sendMenu } from "../../../apis/api/order";
import {
  ShoppingCartState,
  TotalPriceState,
} from "../../../atoms/ShoppingCartAtom";
import { FaRegTrashCan, FaPlus, FaMinus } from "react-icons/fa6";
import Image from "../../../assets/img/장바구니2.png";

function ShoppingBasketPage(props) {
  const { adminInfo } = useUserApis();
  const [cart, setCart] = useRecoilState(ShoppingCartState);
  const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceState);

  const handleDeleteFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleIncreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, count: (item.count || 1) + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
          : item
      )
    );
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
    },
  });

  useEffect(() => {
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => {
        const itemTotal =
          (item.menu.menuPrice +
            item.options.reduce((acc, opt) => acc + opt.optionPrice, 0)) *
          (item.count || 1); // 수량 반영
        return total + itemTotal;
      }, 0);
    };

    const newTotalPrice = calculateTotalPrice();
    if (newTotalPrice !== totalPrice) {
      setTotalPrice(newTotalPrice);
    }
  }, [cart, totalPrice, setTotalPrice]);

  return (
    <div css={s.layout}>
      <h1>{adminInfo?.companyName}</h1>
      <div css={s.container}>
        {cart.length === 0 ? (
          <div css={s.noItem}>
            <img src={Image} alt="" />
            <p>장바구니가 텅 비어 있습니다.</p>
          </div>
        ) : (
          <div css={s.menuBox}>
            {cart.map((item, index) => (
              <div key={index}>
                <div css={s.menuList}>
                  <div css={s.menuItem}>
                    <h2>{item.menu.menuName}</h2>
                    <p>가격: {item.menu.menuPrice}</p>
                  </div>
                  <img src={item.menu.menuImgUrl} alt="메뉴 이미지" />
                  <div>
                    {item.options.map((opt, idx) => (
                      <div key={idx}>
                        <p>
                          {opt.optionName} ( + {opt.optionPrice} )
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div css={s.countBox}>
                  <div css={s.count}>
                    {item.count > 1 ? (
                      <button onClick={() => handleDecreaseQuantity(index)}>
                        <FaMinus />
                      </button>
                    ) : (
                      <button onClick={() => handleDeleteFromCart(index)}>
                        <FaRegTrashCan size={20} />
                      </button>
                    )}
                    <p>{item.count || 1}</p>
                    <button onClick={() => handleIncreaseQuantity(index)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div css={s.bottom}>
          <h2>총 가격 {totalPrice} 원</h2>
          <button onClick={() => SEEsendMenus.mutate(cart)}>주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBasketPage;
