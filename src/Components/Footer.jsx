import { Button, Container, Navbar, ProgressBar } from "react-bootstrap";

export default function Footer() {

    return (
        <Navbar expand="lg" bg="dark" fixed="bottom" className="shadow-sm py-1 player-bar">
            <Container fluid className="d-flex justify-content-between align-items-center">
                {/* Song Info */}
                <div className="d-flex align-items-center" style={{ width: '200px' }}>
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Album cover"
                        className="rounded me-2"
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div>
                        <div className="text-white">Song Title</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>Artist Name</div>
                    </div>
                </div>

                {/* Playback Controls */}
                <div className="d-flex flex-column align-items-center" style={{ width: '400px' }}>
                    <div className="d-flex align-items-center mb-1">
                        <Button variant="link" className="text-white mx-2">
                            <i className="bi bi-skip-backward-btn  fs-4"></i>
                        </Button>
                        <Button variant="link" className="text-white mx-2" style={{ fontSize: '1.5rem' }}>
                            <i className="bi bi-play  fs-4"></i>
                        </Button>
                        <Button variant="link" className="text-white mx-2">
                            <i className="bi bi-skip-forward-btn  fs-4"></i>
                        </Button>
                    </div>
                    <div className="d-flex align-items-center w-100">
                        <span className="text-muted me-2" style={{ fontSize: '0.8rem' }}>1:23</span>
                        <ProgressBar
                            now={35}
                            className="flex-grow-1"
                            style={{ height: '4px', cursor: 'pointer' }}
                        />
                        <span className="text-muted ms-2" style={{ fontSize: '0.8rem' }}>3:45</span>
                    </div>
                </div>

                {/* Volume Controls */}
                <div className="d-flex align-items-center" style={{ width: '200px' }}>
                    <Button variant="link" className="text-white">
                        <i className="bi bi-volume-down  "></i>
                    </Button>
                    <ProgressBar
                        now={70}
                        className="flex-grow-1 mx-2"
                        style={{ height: '4px', cursor: 'pointer' }}
                    />
                    <Button variant="link" className="text-white">
                        <i className="bi bi-volume-up "></i>
                    </Button>
                </div>
            </Container>
        </Navbar>
    )
}
