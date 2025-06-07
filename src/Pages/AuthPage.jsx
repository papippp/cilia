import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"


export default function AuthPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [authToken, setAuthtoken] = useLocalStorage('authToken', ' ')
    const url = 'https://905a6b86-1fdd-4d12-8263-1084f3ab6f14-00-17bt5dqlaktwa.sisko.replit.dev'

    const navigate = useNavigate()
    useEffect(() => {
        if (authToken) {
            navigate('/profile')
        }
    }, [authToken, navigate])



    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${url}/signup`, { username, password })
            console.log(response.data)

        }
        catch (error) {
            console.error(error)
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${url}/login`, { username, password })
            if (response.data && response.data.auth === true && response.data.token) {
                setAuthtoken(response.data.token)
                console.log(response.data)
                alert('sign in')
            }


        }
        catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100">
                    <Col xs={12} md={6} lg={4} className="mx-auto p-4 border shadow-lg rounded-3">
                        <h2 className="text-center mb-4">Cilia</h2>
                        <Form onSubmit={handleLogin} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Control
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="enter email"
                                    type="email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="enter password"
                                    type="password"
                                />
                            </Form.Group>
                            <Button variant="primary" className="w-100 rounded-pill mb-3" type="submit"> Login</Button>
                        </Form>
                        <div className="text-center">
                            <Button variant="secondary" className="rounded-pill" onClick={handleShow}>Register</Button>
                        </div>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <Container className="d-grid gap-2 p-4">
                            <h3 className="text-center mb-4">Sign up here</h3>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="enter email"
                                        type="email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password"
                                        type="password"
                                    />

                                </Form.Group>
                                <Button variant="primary" className="w-100 rounded-pill" onClick={handleSignUp} >sign up</Button>
                            </Form>

                        </Container>

                    </Modal.Body>
                </Modal>
            </Container>
        </>

    )

}