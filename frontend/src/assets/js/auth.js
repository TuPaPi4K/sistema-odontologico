const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // CORRECCIÓN: IDs exactos del HTML
        const nombre_usuario = document.getElementById('nombre_usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_usuario, contrasena })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.clear();
                localStorage.setItem('token', data.token);
                localStorage.setItem('rol', data.rol); 
                localStorage.setItem('usuario', data.nombre);
                window.location.href = '/frontend/index.html';
            } else {
                alert('Error: ' + data.msg);
            }
        } catch (error) {
            alert('El backend está apagado o no hay conexión.');
        }
    });
}