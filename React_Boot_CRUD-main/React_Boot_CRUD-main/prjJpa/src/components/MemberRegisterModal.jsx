import React from 'react';
import { Modal } from 'react-bootstrap';
import MemberForm from './MemberForm'; // 공용 폼 임포트
import axios from 'axios';

const MemberRegisterModal = ({ show, handleClose, onSave }) => {
    const handleRegister = (data) => {
        axios.post('http://localhost:8080/api/members/new', data)
            .then(() => {
                alert("등록되었습니다.");
                onSave();
                handleClose();
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>신규 등록</Modal.Header>
            <Modal.Body>
                <MemberForm onSubmit={handleRegister} submitText="회원 등록" />
            </Modal.Body>
        </Modal>
    );
};

export default MemberRegisterModal;