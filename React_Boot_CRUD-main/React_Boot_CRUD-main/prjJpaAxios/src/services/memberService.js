import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/members'
});

export const memberApi = {
    // 목록 조회 (페이징)
    getList: (page) => api.get(`/list?page=${page}`),
    
    // 단일 회원 상세 조회
    getOne: (id) => api.get(`/${id}`),
    
    // 신규 등록
    create: (data) => api.post('/new', data),
    
    // 정보 수정
    update: (id, data) => api.put(`/${id}`, data),
    
    // 회원 삭제
    delete: (id) => api.delete(`/${id}`)
};