console.log("🦷 Sistema Odontológico IPSTAUCLA cargado correctamente");


document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = '#007bff'; 
        }
    });
});

function mostrarMensaje(texto, tipo = 'success') {
    const contenedor = document.createElement('div');
    contenedor.className = `alert alert-${tipo} alert-fixed`;
    contenedor.innerText = texto;
    document.body.appendChild(contenedor);
    
    setTimeout(() => contenedor.remove(), 3000);
};