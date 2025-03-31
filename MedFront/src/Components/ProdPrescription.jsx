import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card, Button,Image } from 'react-bootstrap'; // Assuming you are using Bootstrap for other parts
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const ProdPrescription = () => {
    const navigate=useNavigate();
    const [prod,setProd]=useState(null);
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    useEffect(()=>{
        fetchItems();
    },[])
    const fetchItems = async () => {
        try{
            const token=localStorage.getItem("token");
            const role = localStorage.getItem("role");
            const userId=localStorage.getItem("userId");
            const pid=localStorage.getItem("pid");
            const response=await axios.post(`http://localhost:5632/home/getProd/${pid}`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                            Role: role
                        }
                    }
                )
                console.log(response.data);
                setProd(response.data);
        }
        catch(e){
            console.log('Error : ',e);
            toast.error('Failed to Reload Product');
        }
    }
    const handleFileChange = (e) => {
        setPrescriptionFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        if(prescriptionFile)
            navigate('/confirmProd');
        else toast.error('Please Upload the Prescription')
    };

    return (
<Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-center mb-4 text-gray-800">Prescription Upload</h2>
                        <div className="mb-4">
                            <h4 className="text-gray-800 mb-3">This Product Requires Prescription:</h4>
                            {prod === null ? (
                                <p className="text-gray-600 text-center">No items require prescription.</p>
                            ) : (
                                    <Row className="cart-item mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4" >
                                        <Col md={2} className="flex items-center justify-center">
                                            <Image src={prod.imageUrl} thumbnail className="w-24 h-24 object-cover" />
                                        </Col>
                                        <Col md={4} className="flex flex-col justify-center">
                                            <h5 className="text-xl font-semibold text-gray-700">{prod.productName}</h5>
                                            <div className="quantity-control flex items-center mt-2">
                                                <h5 className="mx-2 text-lg">1</h5>
                                            </div>
                                        </Col>
                                        <Col md={2} className="flex items-center justify-center">
                                            <p className="text-lg font-medium text-gray-700">Total: ₹{prod.price}</p>
                                        </Col>
                                        <Col md={2} className="flex items-center justify-center">
                                        </Col>
                                    </Row>
                                )
                            }
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="prescriptionFile" className="block text-gray-800">Upload Prescription:</label>
                                    <input
                                        type="file"
                                        id="prescriptionFile"
                                        accept=".pdf,.jpg,.png"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <Button type="submit" variant="primary" className="w-full py-2 mt-4">
                                    Upload Prescription
                                </Button>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProdPrescription;
