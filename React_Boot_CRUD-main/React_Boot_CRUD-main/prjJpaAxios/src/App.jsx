import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import MemberList from './components/MemberList';
import MemberRegisterModal from './components/MemberRegisterModal';
import MemberEditModal from './components/MemberEditModal';

function App() {
  const [showRegModal, setShowRegModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenRegModal = () => setShowRegModal(true);
  const handleCloseRegModal = () => setShowRegModal(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedId(null);
  };

  const handleEditClick = (id) => {
    setSelectedId(id);
    setShowEditModal(true);
  };

  const handleSave = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
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
            <MemberList key={refreshKey} onEdit={handleEditClick} />
          </Col>
        </Row>
      </Container>

      <MemberRegisterModal 
        show={showRegModal} 
        handleClose={handleCloseRegModal} 
        onSave={handleSave} 
      />

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