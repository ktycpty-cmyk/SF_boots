import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import MemberList from './components/MemberList';
import MemberRegisterModal from './components/MemberRegisterModal';
import MemberEditModal from './components/MemberEditModal'; // 수정 모달 임포트

function App() {
  // 1. 등록 모달 관련 상태
  const [showRegModal, setShowRegModal] = useState(false);
  
  // 2. 수정 모달 관련 상태
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // 수정할 회원의 ID 저장

  // 3. 목록 새로고침을 위한 키
  const [refreshKey, setRefreshKey] = useState(0);

  // 등록 모달 열기/닫기
  const handleOpenRegModal = () => setShowRegModal(true);
  const handleCloseRegModal = () => setShowRegModal(false);

  // 수정 모달 열기/닫기
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedId(null); // 닫을 때 ID 초기화
  };

  // MemberList에서 '수정' 버튼을 눌렀을 때 실행될 함수
  const handleEditClick = (id) => {
    setSelectedId(id);      // 전달받은 ID를 상태에 저장
    setShowEditModal(true); // 수정 모달 표시
  };

  // 저장(등록/수정) 완료 후 목록 새로고침
  const handleSave = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      {/* 네비게이션 바 */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
        <Container>
          <Navbar.Brand href="#" className="fw-bold">MEMBER SYSTEM</Navbar.Brand>
          <Button variant="outline-light" onClick={handleOpenRegModal}>
            + 신규 회원 등록
          </Button>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* key={refreshKey}: 등록/수정 후 이 값이 바뀌면 MemberList가 다시 그려집니다.
              onEdit: MemberList 내부의 수정 버튼 클릭 시 handleEditClick 실행
            */}
            <MemberList 
              key={refreshKey} 
              onEdit={handleEditClick} 
            />
          </Col>
        </Row>
      </Container>

      {/* 회원 등록 모달 */}
      <MemberRegisterModal 
        show={showRegModal} 
        handleClose={handleCloseRegModal} 
        onSave={handleSave} 
      />

      {/* 회원 수정 모달 (추가됨) */}
      <MemberEditModal 
        show={showEditModal} 
        handleClose={handleCloseEditModal} 
        memberId={selectedId} 
        onSave={handleSave} 
      />
    </div>
  );
}

export default App;