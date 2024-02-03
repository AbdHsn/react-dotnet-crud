import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceAdd from './ServiceAdd';
import Button from 'react-bootstrap/Button';
import ServiceEdit from './ServiceEdit';

const ServiceList = () => {
  //States Variables
  const [services, setServices] = useState([]); //List variables
  const [showAddModal, setShowAddModal] = useState(false); //opening add modal flag
  const [showEditModal, setShowEditModal] = useState(false); //opening edit modal flag
  const [selectedService, setSelectedService] = useState(null); //service object for sending data to edit form

  // Get all services api call
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://localhost:7117/api/Service');
        setServices(response.data);
      } catch (error) {
        console.error("There was an error fetching the services:", error);
      }
    };

    fetchServices();
  }, []);

  // Methods handle add modal actions
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  //Create new service api call
  const handleNewService = async (serviceName) => {
    try {
      const response = await axios.post('https://localhost:7117/api/Service', {
        serviceName: serviceName
      });
      const addedService = response.data;
      setServices(prevServices => [...prevServices, addedService]);
      handleCloseAddModal();
    } catch (error) {
      console.error('Failed to add service:', error);
    }
  };


  // Methods handle edit modal actions
  const handleShowEditModal = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  //Edit api call
  const handleEditService = async (serviceId, serviceName) => {
    try {
      await axios.put(`https://localhost:7117/api/Service/${serviceId}`, {
        serviceId: serviceId,
        serviceName: serviceName
      });

      let updatedService = {
        serviceId: serviceId,
        serviceName: serviceName
      };

      // Update the services state to reflect the updated service
      setServices(services.map(service => service.serviceId === serviceId ? updatedService : service));
      handleCloseEditModal();
    } catch (error) {
      console.error('Failed to update service:', error);
      // Handle error, e.g., show error message to user
    }
  };

  //Delete api call
  const deleteService = async (serviceId) => {
    try {
      await axios.delete(`https://localhost:7117/api/Service/${serviceId}`);

      // removing delete item from service list.
      setServices(services.filter(service => service.serviceId !== serviceId));
    } catch (error) {
      console.error("Error deleting the service:", error);
    }
  };

  return (
    <>
      <Button onClick={handleShowAddModal}>Add Service</Button>
      <ServiceAdd
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleNewService}
      />
      <ServiceEdit
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleEdit={handleEditService}
        service={selectedService}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service.serviceId}>
              <th scope="row">{service.serviceId}</th>
              <td>{service.serviceName}</td>
              <td>
                <Button variant="primary" className="mr-2" onClick={() => handleShowEditModal(service)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteService(service.serviceId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  );
}

export default ServiceList;
