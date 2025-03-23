// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des tooltips Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Animation douce pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion des images non chargées
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/static/images/placeholder.jpg';
            this.alt = 'Image non disponible';
        });
    });

    // Animation des cartes de produits au scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            if (cardTop < window.innerHeight && cardBottom > 0) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des cartes avec une opacité de 0
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Écouter l'événement de scroll
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une première fois pour les éléments visibles au chargement
    animateOnScroll();

    // Validation des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Gestion du panier (à implémenter selon vos besoins)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            // Ajouter votre logique de panier ici
            
            // Animation de confirmation
            this.innerHTML = '<i class="fas fa-check"></i> Ajouté';
            this.classList.add('btn-success');
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter au panier';
                this.classList.remove('btn-success');
            }, 2000);
        });
    });
}); 