import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const OrderApi = {
    // 주문내역 조회
    orderListGet : async(id) => {
        return await axios.get(KH_DOMAIN + `/order?id=${id}`);
    },

    // 주문내역 추가
    orderInsert: async (userId) => {
        return await axios.post(KH_DOMAIN + "/order/insert", { userId });
      }

    // 결제정보 추가
}

export default OrderApi;