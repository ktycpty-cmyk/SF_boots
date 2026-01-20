import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; // 사용하지 않는 Button, Form, Row, Col은 제거해도 됩니다.
import axios from 'axios';
import MemberForm from './MemberForm'; // ⭐ 이 줄이 빠져있어서 에러가 발생했습니다!

const MemberEditModal = ({ show, handleClose, memberId, onSave }) => {
    const [existingMember, setExistingMember] = useState(null);

    useEffect(() => {
        if (show && memberId) {
            axios.get(`http://localhost:8080/api/members/${memberId}`)
                .then(res => setExistingMember(res.data));
        }
    }, [show, memberId]);

    const handleUpdate = (data) => {
        axios.put(`http://localhost:8080/api/members/${memberId}`, data)
            .then(() => {
                alert("수정되었습니다.");
                onSave();
                handleClose();
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-warning">
                <Modal.Title className="fw-bold">회원 정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 이제 MemberForm을 정상적으로 인식합니다 */}
                <MemberForm 
                    initialData={existingMember} 
                    onSubmit={handleUpdate} 
                    submitText="수정 완료" 
                />
            </Modal.Body>
        </Modal>
    );
};

export default MemberEditModal;