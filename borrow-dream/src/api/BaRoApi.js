import axios from "axios";
const Baro_DOMAIN = "http://localhost:8111"; // 백엔드에 대한 주소

const BaroApi = {

    // 문의하기리스트 조회
    boardList: async(boardNo) => {
        const list = {
            boardNo: boardNo
        };
        return await axios.get(Baro_DOMAIN + "/board-list", list);
    },

    // 아이디별 문의하기리스트 조회
    byIdList: async(writerId) => {
        return await axios.get(Baro_DOMAIN + `/myBoardList?writerId=${writerId}`);
    },

    // 문의하기 작성
    writeInquiry: async function(getId, category, title, contents, boardPwd, isUnknown) {
        console.log("아이디 " + getId );
        const object = {
            writerId: getId,
            category: category,
            title: title,
            contents: contents,
            boardPwd: boardPwd,
            isUnknown: isUnknown
        };
        return await axios.post(Baro_DOMAIN + "/board-list/write", object);
    },

    // 게시물 보기 전 비밀번호 체크 
    checkPwd: async(boardNo, boardPwd) => {
        console.log("컨트롤러로가는지 체크" + boardNo + " " + boardPwd);
        const object = {
            boardNo: boardNo,
            boardPwd: boardPwd
        }
        return await axios.post(Baro_DOMAIN + "/check-password", object);
    },

    // 특정 보드넘버의 게시물 내용 불러오기
    inquiryView: async(boardNo) => {
        return await axios.get(Baro_DOMAIN + `/board-list/inquiry-view?boardNo=${boardNo}`);
    },
    
    // 조회수 올리기
    inquiryViewsUp: async(boardNo) => {
        const object = {
            boardNo: boardNo
        }
        return await axios.post(Baro_DOMAIN + "/views-up", object);
    },

    // 특정 보드넘버의 게시물 수정
    inquiryEdit: async(boardNo, getId, category, title, contents, isUnknown) => {
        const object = {
            boardNo: boardNo,
            writerId: getId,
            category: category,
            title: title,
            contents: contents,
            isUnknown: isUnknown
        };
        return await axios.post(Baro_DOMAIN + "/board-list/inquiry-edit", object);
    },
    // 글 삭제
    inquiryDelete: async(boardNo) => {
        const object = {
            boardNo: boardNo
        };
        return await axios.post(Baro_DOMAIN + "/board-list/inquiry-delete", object);
    },
    
    // 댓글 불러오기
    commentLoad: async(getNum) => {
        return await axios.get(Baro_DOMAIN + `/comment-view?boardNo=${getNum}`);
    },
    
    // 댓글 작성
    writeComment: async(getNum, commentId, contents) => {
        const object = {
            boardNo: getNum,
            commentId: commentId,
            contents: contents
        };
        return await axios.post(Baro_DOMAIN + "/comment-write", object);

    },

    // 댓글 삭제
    commentDelete: async(commentNo) => {
        const object = {
            commentNo: commentNo
        }
        return await axios.post(Baro_DOMAIN + "/comment-delete", object);
    },
      // QnA게시판 가지고오기
      showQna: async() => {
        return await axios.get(Baro_DOMAIN + "/qna-list");
    },
    // 리뷰리스트 가지고오기
    reviewList: async() => {
        return await axios.get(Baro_DOMAIN + "/review-list");
    },
    // 리뷰작성
    writeReview: async(url, id, youLike, title, content) => {
        console.log("타이틀" + title + "사진주소" + url + "내용" + content + "좋아요" + youLike + "아이디" + id);
        const object = {
            rUrl: url,
            rId: id,
            youLike: youLike,
            rTitle: title,
            rContents: content
        }
        return await axios.post(Baro_DOMAIN + "/review-write", object);
    }, 
    //리뷰 상세보기
    viewReview: async(reviewNo) => {
        console.log("리뷰넘버" + reviewNo);
        return await axios.get(Baro_DOMAIN + `/review-list/review?reviewNo=${reviewNo}`);
    },
    // 리뷰 수정
    editReview: async(title, content, url, youLike, reviewNo) => {
        console.log("수정한타이틀" + title + "수정한사진주소" + url + "수정한내용" + content + "수정한좋아요" + youLike );
        const object = {
            rTitle: title,
            rContents: content,
            rUrl: url,
            youLike: youLike,
            reviewNo: reviewNo
        }
        return await axios.post(Baro_DOMAIN + "/review-edit", object);
    },

    // 리뷰 삭제
    deleteReview: async(reviewNo) => {
        const object = {
            reviewNo: reviewNo
        }
        return await axios.post(Baro_DOMAIN + "/review-delete", object);
    },

    // 내빌드 목록
    myLendList: async() => {
        return await axios.get(Baro_DOMAIN + "/myLend");
    },

    // 내빌드 작성
    writeLentItem: async(getId, url, title, content, howMany, howMuch) => {
        const object = {
            borrowId: getId,
            myItem: title,
            itemExplain: content,
            itemUrl: url,
            itemQuantity: howMany,
            itemPrice: howMuch
        }
        return await axios.post(Baro_DOMAIN + "/myLentItem/write", object)
    },

    // 내빌드 상세보기
    viewMyLentItem: async(myNo) => {
        return await axios.get(Baro_DOMAIN + `/viewMyItem?myNo=${myNo}`);
    },

    // 쪽지보내기
    writeMessage: async(title, contents, receiver, sender) => {
        const object = {
            sender: sender,
            receiver: receiver,
            msgTitle: title,
            msgContents: contents
        }
        return await axios.post(Baro_DOMAIN + "/writeMsg", object);
    },

    // 받은사람 기준으로 쪽지리스트
    receiverList: async(receiver) => {
        return await axios.get(Baro_DOMAIN + `/receiverList?receiver=${receiver}`);
    },

    // 받은메세지상세보기
    viewReceiveMsg: async(getNum) => {
        console.log(getNum);
        return await axios.get(Baro_DOMAIN + `/receiver?msgNo=${getNum}`);
    },

    // 보낸메세지 리스트
    senderMsgList: async(sender) => {
        return await axios.get(Baro_DOMAIN + `/senderList?sender=${sender}`);
    },

    // 보낸메세지 상세보기
    viewSendMsg: async(getNum) => {
        return await axios.get(Baro_DOMAIN + `/sender?msgNo=${getNum}`);
    }

    


};

export default BaroApi;