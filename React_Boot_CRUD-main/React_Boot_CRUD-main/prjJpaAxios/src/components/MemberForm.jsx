import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const MemberForm = ({ initialData, onSubmit, submitText = "저장하기" }) => {
    const [member, setMember] = useState({
        name: '', age: '', address: '', phone: ''
    });

    useEffect(() => {
        if (initialData) setMember(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(member);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">이름</Form.Label>
                <Form.Control name="name" value={member.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">나이</Form.Label>
                <Form.Control type="number" name="age" value={member.age} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">주소</Form.Label>
                <Form.Control name="address" value={member.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">전화번호</Form.Label>
                <Form.Control name="phone" value={member.phone} onChange={handleChange} />
            </Form.Group>
            <div className="d-grid mt-4">
                <Button variant="primary" type="submit">{submitText}</Button>
            </div>
        </Form>
    );
};

export default MemberForm;