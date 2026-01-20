import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import MemberForm from './MemberForm';
import { memberApi } from '../services/memberService';

const MemberEditModal = ({ show, handleClose, memberId, onSave }) => {
    const [existingMember, setExistingMember] = useState(null);

    useEffect(() => {
        if (show && memberId) {
            memberApi.getOne(memberId)
                .then(res => setExistingMember(res.data))
                .catch(err => console.error("데이터 불러오기 실패:", err));
        }
    }, [show, memberId]);

    const handleUpdate = (data) => {
        memberApi.update(memberId, data)
            .then(() => {
                alert("정보가 수정되었습니다.");
                onSave();
                handleClose();
            })
            .catch(err => alert("수정 실패: " + err.message));
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-warning">
                <Modal.Title className="fw-bold">회원 정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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