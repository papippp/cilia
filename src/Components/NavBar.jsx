import { useEffect } from "react";
import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function NavBar() {
    const navigate = useNavigate()
    const [authToken, setAuthtoken] = useLocalStorage('authToken', ' ')
    useEffect(() => {
        if (!authToken) {
            navigate('/login')
        }
    })
    const handleSignOut = () => setAuthtoken('')


    return (

        <Navbar expand="lg" bg="light" sticky="top" className="shadow-sm py-3">
            <Container fluid>
                <Navbar.Brand   >
                    <span >Cilia</span>
                </Navbar.Brand>
                <Form className="d-flex" style={{ width: '600px' }}>
                    <FormControl
                        type="search"
                        placeholder="Search..."
                        className="me-2 py-3"
                        aria-label="Search"
                        style={{ fontSize: '1.1rem', borderRadius: '30px' }}
                    />
                    <Button
                        variant="outline-primary"
                        className="py-3 px-4"
                        style={{
                            fontSize: '1.1rem',
                            borderRadius: '30px',
                            marginLeft: '-50px',
                            zIndex: 1,
                            border: 'none',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {/* Search icon placeholder using text */}
                        🔍
                    </Button>
                </Form>


                <Button
                    variant="primary"
                    className="ms-3 py-3 px-4"
                    style={{
                        fontSize: '1.1rem',
                        borderRadius: '30px',
                        fontWeight: '500'
                    }}
                    onClick={handleSignOut}>Logout</Button>
            </Container>
        </Navbar>


    )
}
