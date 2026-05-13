const login = async (datos) => {
    const res = await fetch('/api/auth/login', { /* ... */ });
    const data = await res.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol); 
        window.location.href = 'index.html';
    }
};