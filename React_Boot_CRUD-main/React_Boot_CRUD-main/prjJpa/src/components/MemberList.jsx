import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Pagination, Badge } from 'react-bootstrap';
import axios from 'axios';

const MemberList = ({ onEdit }) => {
    const [members, setMembers] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchMembers(currentPage);
    }, [currentPage]);

    const fetchMembers = (page) => {
        axios.get(`http://localhost:8080/api/members/list?page=${page}`)
            .then(res => {
                setMembers(res.data.content);
                setPageInfo(res.data);
            });
    };

    const handleDelete = (id) => {
        if(window.confirm("정말 이 회원을 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:8080/api/members/${id}`)
                .then(() => fetchMembers(currentPage));
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title className="mb-4">회원 전체 목록</Card.Title>
                <Table hover responsive className="text-center align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>이름</th>
                            <th>나이</th>
                            <th>주소</th>
                            <th>전화번호</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length > 0 ? members.map(member => (
                            <tr key={member.memberId}>
                                <td><Badge bg="secondary">{member.memberId}</Badge></td>
                                <td className="fw-bold">{member.name}</td>
                                <td>{member.age}세</td>
                                <td className="text-start">{member.address}</td>
                                <td>{member.phone}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" className="me-1" onClick={() => onEdit(member.memberId)}>수정</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(member.memberId)}>삭제</Button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="py-4">등록된 회원이 없습니다.</td></tr>
                        )}
                    </tbody>
                </Table>
                
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        {[...Array(pageInfo.totalPages || 0).keys()].map(num => (
                            <Pagination.Item key={num} active={num === currentPage} onClick={() => setCurrentPage(num)}>
                                {num + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MemberList;