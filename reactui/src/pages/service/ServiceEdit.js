import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ServiceEdit = ({ show, handleClose, handleEdit, service }) => {
  const [serviceName, setServiceName] = useState('');

  useEffect(() => {
    if (service) {
      setServiceName(service.serviceName);
    }
  }, [service]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" onClick={() => handleEdit(service.serviceId, serviceName)}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ServiceEdit;
