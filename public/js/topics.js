document.getElementById('category').addEventListener('change', function(event) {
    const selectedCategory = event.target.value;
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        if (selectedCategory === 'any' || card.dataset.category === selectedCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
