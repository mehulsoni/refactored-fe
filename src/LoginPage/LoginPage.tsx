import React from 'react';
import { Formik } from 'formik';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { navigate } from '@reach/router';
import { userService } from '../Services/UserServices';

const LoginPage = () => {
    return (
        <div>
            <h3>Login</h3>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={(values, actions) => {
                    userService
                        .login(values.email, values.password)
                        .then(() => navigate!('/'))
                        .catch(console.error);
                    actions.setSubmitting(false);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Container>
                                <Row>
                                    <Col sm={5}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            onChange={props.handleChange}
                                            value={props.values.email}
                                            onBlur={props.handleBlur}
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                        <br />
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            onChange={props.handleChange}
                                            value={props.values.password}
                                            onBlur={props.handleBlur}
                                            name="password"
                                            type="password"
                                            placeholder="Enter your passsword"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>{' '}
                        <Button href={'/register'} variant="primary" type="button">
                            Register
                        </Button>
                    </form>
                )}
            </Formik>
            <br />
        </div>
    );
};

export default LoginPage;
