import React from 'react';
import { Modal } from 'react-bootstrap';
import MemberForm from './MemberForm';
import { memberApi } from '../services/memberService';

const MemberRegisterModal = ({ show, handleClose, onSave }) => {
    const handleRegister = (data) => {
        memberApi.create(data)
            .then(() => {
                alert("성공적으로 등록되었습니다.");
                onSave();
                handleClose();
            })
            .catch(err => alert("등록 실패: " + err.message));
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>신규 회원 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MemberForm onSubmit={handleRegister} submitText="회원 등록" />
            </Modal.Body>
        </Modal>
    );
};

export default MemberRegisterModal;