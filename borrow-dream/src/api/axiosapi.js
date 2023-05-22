import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = { // 객체 선언

    // 로그인, customLogin : 비동기 함수
    customLogin : async(id, pwd) => { // 키 컬럼명과 포스트맨 컬럼명이 같아야함
        console.log(id + " " + pwd + "");

        const login = {
            id : id, // 키 : 값
            pwd : pwd
        };
        return await axios.post(KH_DOMAIN + "/login", login);
    },

    // 회원 조회
    customGet : async(id) => {
        // 값을 하나씩 넣을 때마다 ?붙여야 함! 
        return await axios.get(KH_DOMAIN + `/custom?id=${id}`);
    },
    
    // 회원 가입 여부 확인
    customRegCheck : async(id) => {
    return await axios.get(KH_DOMAIN + `/check?id=${id}`);
    },

    // 회원 아이디 찾기
    customFind : async(name, email) => {
        const find = {
            name : name,
            email : email
        };
        return await axios.get(KH_DOMAIN + `/find?name=${name}&email=${email}`, find);
    },

    // 비밀번호 찾기
    customFindPwd : async(id, email) => {
        const findpwd = {
            id : id,
            email : email
        };
        return await axios.get(KH_DOMAIN + `/findpwd?id=${id}&email=${email}`, findpwd);
    },

    // 새 비밀번호 저장
    customNewPwd: async(id, pwd) => {
        const newpwd = {
            id : id,
            pwd : pwd
        };
        return await axios.get(KH_DOMAIN + `/newpwd?id=${id}&pwd=${pwd}`, newpwd);   
    },
    
    // 회원가입
    customReg : async(name, id, pwd, tel, email, addr) => {
        console.log(name + " " + id + " " + pwd + "" + tel + "" + email + " " + addr);
        const custom = {
            //서버가 찾아야 할 값(property) : 입력할 값
            name : name,
            id : id,
            pwd : pwd,
            tel : tel,
            email : email,
            addr : addr
        };
        return await axios.post(KH_DOMAIN + "/new", custom);
    },

    // 마이페이지 정보 조회
    customEdit : async(getId) => {
        const mypage = {
            id : getId
        };
        return await axios.get(KH_DOMAIN + `/mypage?id=${getId}`, mypage);
    },
    
    // 마이페이지 정보수정 
    customUpdate : async(id, updatedData) => { // updatedDate: 변경된 정보를 담은 객체
        return await axios.post(KH_DOMAIN + `/mypage/mypageupdate?id=${id}`, updatedData);
    },


    // 마이페이지 회원정보 수정
    customUpdateInfo : async(name, id, pwd, tel, email, addr) => {
        console.log(name, id, pwd, tel, email, addr);
        const customObj = {
            name : name,
            id : id,
            pwd : pwd,
            tel : tel,
            email : email,
            addr : addr
        };
        return await axios.post(KH_DOMAIN + "/mypage/mypageupdate" , customObj);
    },

    // 장바구니 조회
    cartListGet : async(id) => {
        return await axios.get(KH_DOMAIN + `/cart?id=${id}`);
    },

    // 회원탈퇴
    customDel : async(userId) => {
        const del = {
            id: userId
        };
        return await axios.post(KH_DOMAIN + "/del", del);
    }
};

export default AxiosApi;