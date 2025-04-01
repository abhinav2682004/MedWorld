import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Row, Col, Container } from 'react-bootstrap';
import { FaUser, FaTrash } from 'react-icons/fa';
import './UserProfile.css';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL


const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMedicalConditionFields, setShowMedicalConditionFields] = useState(false);
  const [showOtherConditionField, setShowOtherConditionField] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: '',
    medicalCondition: '',
    specificConditions: [],
    otherCondition: ''
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Function to fetch profile data
  const fetchProfileData = async () => {
    const userId=localStorage.getItem("userId");
    await axios.post(`${BASE_URL}/profile/`,{userId:userId})
      .then(response => setProfileData(response.data))
      .catch(error => console.error(error));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setShowMedicalConditionFields(false);
    setShowOtherConditionField(false);
    setProfilePhoto(null);
    setError('');
    fetchProfileData(); // Reset profile data to original values
  };

  const handleMedicalConditionChange = (e) => {
    setShowMedicalConditionFields(e.target.value === 'yes');
  };

  const handleOtherConditionChange = (e) => {
    setShowOtherConditionField(e.target.checked);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    } else {
      setError('Image Format not supported');
      setProfilePhoto(null);
    }
  };

  const handleProfilePhotoDelete = () => {
    setProfilePhoto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setProfileData(prevState => {
      const updatedConditions = checked
        ? [...prevState.specificConditions, id]
        : prevState.specificConditions.filter(condition => condition !== id);
      return {
        ...prevState,
        specificConditions: updatedConditions
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);
    /*const url = isEditing ? 'http://localhost:5632/profile/add' : 'http://localhost:5632/profile/edit';
    const method = isEditing ? 'post' : 'put';

    await axios({
      method: method,
      url: url,
      body: profileData,
      
    })*/
    const userId=localStorage.getItem("userId");
    await axios.post(`${BASE_URL}/profile/add`,{profileData,userId:userId})
      .then(response => {
        setIsEditing(false);
        // Update profile data with response
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error submitting profile data:', error);
        // Optionally set an error state to display to the user
      });
      fetchProfileData();
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Profile</h1>
      <Row className="justify-content-center">
        <Col md={4} className="text-center">
          <div className="profile-photo mb-3">
            {profilePhoto ? (
              <Image src={profilePhoto} roundedCircle width="150" height="150" alt="Profile" />
            ) : (
              <>
                <Image src="#" roundedCircle width="150" height="150" alt="" />
                <FaUser size={100} className="user-icon" />
              </>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <Form.Control type="file" accept="image/*" onChange={handleProfilePhotoChange} disabled={!isEditing} />
            {profilePhoto && (
              <Button variant="danger" onClick={handleProfilePhotoDelete} className="ml-2">
                <FaTrash />
              </Button>
            )}
          </div>
          {error && <p className="text-danger">{error}</p>}
          <h4>{profileData.username}</h4>
          {!isEditing && <Button variant="primary" onClick={handleEditClick}>Edit Profile</Button>}
        </Col>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formFullName">
              <Form.Label column sm="4">Full Name</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  disabled={!isEditing}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm="4">Email ID</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  disabled={!isEditing}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPhoneNumber">
              <Form.Label column sm="4">Phone Number</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  disabled={!isEditing}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formGender">
              <Form.Label column sm="4">Gender</Form.Label>
              <Col sm="8">
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    id="male"
                    value="male"
                    checked={profileData.gender === 'male'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mr-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    id="female"
                    value="female"
                    checked={profileData.gender === 'female'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mr-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Others"
                    name="gender"
                    id="others"
                    value="others"
                    checked={profileData.gender === 'others'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAddress">
              <Form.Label column sm="4">Residential Address</Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Residential Address"
                  disabled={!isEditing}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formMedicalCondition">
              <Form.Label column sm="4">Any abnormal medical condition?</Form.Label>
              <Col sm="8">
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="medicalCondition"
                    id="medicalConditionYes"
                    value="yes"
                    checked={profileData.medicalCondition === 'yes'}
                    onChange={handleMedicalConditionChange}
                    disabled={!isEditing}
                    className="mr-3"
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="medicalCondition"
                    id="medicalConditionNo"
                    value="no"
                    checked={profileData.medicalCondition === 'no'}
                  onChange={handleMedicalConditionChange}
                    disabled={!isEditing}
                  />
                </div>
              </Col>
            </Form.Group>

            {showMedicalConditionFields && (
              <Form.Group as={Row} controlId="formSpecificConditions">
                <Form.Label column sm="4">Specific Conditions</Form.Label>
                <Col sm="8">
                  <Row>
                    <Col sm="6">
                      <Form.Check
                        type="checkbox"
                        label="High or Low Blood Pressure"
                        id="bloodPressure"
                        checked={profileData.specificConditions.includes('bloodPressure')}
                        onChange={handleCheckboxChange}
                        disabled={!isEditing}
                        className="checkbox-label"
                      />
                    </Col>
                    <Col sm="6">
                      <Form.Check
                        type="checkbox"
                        label="Asthma"
                        id="asthma"
                        checked={profileData.specificConditions.includes('asthma')}
                        onChange={handleCheckboxChange}
                        disabled={!isEditing}
                        className="checkbox-label"
                      />
                    </Col>
                    <Col sm="6">
                      <Form.Check
                        type="checkbox"
                        label="Allergies"
                        id="allergies"
                        checked={profileData.specificConditions.includes('allergies')}
                          />
                          </Col>
                          <Col sm="6">
                            <Form.Check
                              type="checkbox"
                              label="Diabetes"
                              id="diabetes"
                              checked={profileData.specificConditions.includes('diabetes')}
                              onChange={handleCheckboxChange}
                              disabled={!isEditing}
                              className="checkbox-label"
                            />
                          </Col>
                          <Col sm="6">
                            <Form.Check
                              type="checkbox"
                              label="Depression"
                              id="depression"
                              checked={profileData.specificConditions.includes('depression')}
                              onChange={handleCheckboxChange}
                              disabled={!isEditing}
                              className="checkbox-label"
                            />
                          </Col>
                          <Col sm="6">
                            <Form.Check
                              type="checkbox"
                              label="Anxiety disorders"
                              id="anxietyDisorders"
                              checked={profileData.specificConditions.includes('anxietyDisorders')}
                              onChange={handleCheckboxChange}
                              disabled={!isEditing}
                              className="checkbox-label"
                            />
                          </Col>
                          <Col sm="12">
                            <Form.Check
                              type="checkbox"
                              label="Others"
                              id="others"
                              checked={profileData.specificConditions.includes('others')}
                              onChange={handleOtherConditionChange}
                              disabled={!isEditing}
                              className="checkbox-label"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                  )}
      
                  {showOtherConditionField && (
                    <Form.Group as={Row} controlId="formOtherCondition">
                      <Form.Label column sm="4">Other Medical Condition</Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          name="otherCondition"
                          value={profileData.otherCondition}
                          onChange={handleInputChange}
                          placeholder="Specify other medical condition"
                          disabled={!isEditing}
                        />
                      </Col>
                    </Form.Group>
                  )}
      
                  {isEditing && (
                    <div className="d-flex justify-content-between">
                      <Button variant="success" type="submit" className="mr-2">Submit</Button>
                      <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
                    </div>
                  )}
                </Form>
              </Col>
            </Row>
          </Container>
        );
      };
      
      export { UserProfile };
      