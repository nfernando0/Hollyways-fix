import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../context/UserContext';

function ModalDonate({ show, onHide }) {

    const { id } = useParams();

    // let fundId = parseInt(param.id);

    const [form, setForm] = useState({
        donate_amount: '',
        fund_id: '',
        user_id: ''
    });
    const [state] = useContext(UserContext);

    const { donate_amount } = form;

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleBuy = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.set("donate_amount", donate_amount);
            formData.set("user_id", state.user.id);
            formData.set("fund_id", id);


            // const body = JSON.stringify(formData);

            const response = await API.post('/donated', formData);
            console.log("transaction success :", response)

            const token = response.data.data.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log("transaction failed : ", error);
        }
    });

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Body>
                    <Form onSubmit={(e) => handleBuy.mutate(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nominal Donation</Form.Label>
                            <Form.Control required type="text" placeholder="donate_amount" name="donate_amount" value={donate_amount} onChange={handleChange} />
                        </Form.Group>
                        <Button style={{ backgroundColor: 'var(--bg)', border: 'none', width: '100%', padding: '0.2rem', fontWeight: 'bold', borderRadius: '10px', marginTop: '2rem' }} type="submit">
                            Donate
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalDonate