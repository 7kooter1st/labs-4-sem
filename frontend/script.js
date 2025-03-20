document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn-theme');
    let theme = 0;
    if (button) {
        button.addEventListener('click', function() {
            const body = document.body;
            if (theme == 0) {
                body.style.backgroundColor = 'white';
                theme = 1;
            } else {
                body.style.backgroundColor = '#0f0f0f';
                theme = 0;
            }
        });
    } else {
        console.error('Кнопка с id "btn-theme" не найдена.');
    }
});