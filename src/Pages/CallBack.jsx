import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash.substring(1).split('&').reduce((initial, item) => {
            const [key, value] = item.split('=');
            initial[key] = decodeURIComponent(value);
            return initial;
        }, {});

        if (hash.access_token) {
            localStorage.setItem('spotifyToken', hash.access_token);
            navigate('/profile');
        }
    }, [navigate]);

    return <div>Loading...</div>;
}