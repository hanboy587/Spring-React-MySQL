import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";
import { GetSignInUserResponseDto } from "./response/user";
import { PostBoardRequestDto } from "./request/board";
import { PostBoardResponseDto, GetBoardResponseDto, IncreaseViewCountResponseDto, GetFavoriteListReponseDto, GetCommentListResponseDto } from "./response/board";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

// token header 생성 //
const authorization = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } }
}

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;

// 로그인 요청 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(res => {
            const responseBody: SignInResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response.data) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })

        return result;
}

// 회원가입 요청 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(res => {
            const responseBody: SignUpResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response.data) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })

    return result;
}


// 게시물 작성 //
export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then(res => {
            const responseBody: PostBoardResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })

        return result;
}



// 유저 로그인 정보 반환 //
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(res => { 
            const responseBody: GetSignInUserResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response.data) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        });

    return result;
}

// 이미지 업로드 //
const FILE_DOMAIN = `${DOMAIN}/file`

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartForm = { headers: { 'Content-Type': 'multipart/fomr-data' } };

export const fileUploadReqeust = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartForm)
        .then(res => {
            const responseBody: string = res.data;
            return responseBody;
        })
        .catch(err => {
            return null;
        })
    return result;
}



// 게시물 가져오기
export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(res => {
            const responseBody: GetBoardResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })
        return result;
}

// 게시물 조회수 증가
export const increaseViewCountRequest = async (boardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
        .then(res => {
            const responseBody: IncreaseViewCountResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })
        
        return result;
}

// 좋아요 리스트 불러오기
export const getFavoriteListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
        .then(res => {
            const responseBody: GetFavoriteListReponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })
        return result;
}

// 댓글 리스트 불러오기
export const getCommentListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
        .then(res => {
            const responseBody: GetCommentListResponseDto = res.data;
            return responseBody;
        })
        .catch(err => {
            if (!err.response) return null;
            const responseBody: ResponseDto = err.response.data;
            return responseBody;
        })

        return result;
}