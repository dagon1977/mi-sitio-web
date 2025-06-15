document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir envío real para este ejemplo
            formFeedback.style.display = 'none'; // Ocultar feedback anterior
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback'; // Resetear clases

            let isValid = true;
            let firstInvalidField = null;

            // Limpiar mensajes de validación previos y clases
            contactForm.querySelectorAll('.validation-message').forEach(msg => msg.style.display = 'none');
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('invalid', 'valid');
            });

            // Validación de Nombre Completo
            const fullName = document.getElementById('fullName');
            if (fullName.value.trim() === '') {
                displayValidationError(fullName, 'El nombre completo es obligatorio.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = fullName;
            } else if (fullName.value.trim().length < 3) {
                displayValidationError(fullName, 'El nombre debe tener al menos 3 caracteres.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = fullName;
            } else {
                markFieldValid(fullName);
            }

            // Validación de Correo Electrónico
            const email = document.getElementById('email');
            if (email.value.trim() === '') {
                displayValidationError(email, 'El correo electrónico es obligatorio.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = email;
            } else if (!isValidEmail(email.value.trim())) {
                displayValidationError(email, 'Por favor, introduce un correo electrónico válido.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = email;
            } else {
                markFieldValid(email);
            }

            // Validación de Mensaje
            const message = document.getElementById('message');
            if (message.value.trim() === '') {
                displayValidationError(message, 'El mensaje no puede estar vacío.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = message;
            } else if (message.value.trim().length < 10) {
                displayValidationError(message, 'El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = message;
            } else {
                markFieldValid(message);
            }
            
            // Validación de Términos y Condiciones
            const agreeTerms = document.getElementById('agreeTerms');
            if (!agreeTerms.checked) {
                displayValidationError(agreeTerms, 'Debes aceptar los términos y condiciones.');
                isValid = false;
                // No hacemos foco en el checkbox, sino en el mensaje o el primer campo inválido.
            } else {
                markFieldValid(agreeTerms); // Aunque no tiene borde, para consistencia
            }


            if (isValid) {
                // Simulación de envío exitoso
                formFeedback.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                formFeedback.classList.add('success');
                formFeedback.style.display = 'block';
                contactForm.reset(); // Limpiar el formulario
                // Quitar clases de validación tras éxito
                contactForm.querySelectorAll('input, textarea').forEach(input => {
                    input.classList.remove('valid');
                });

            } else {
                formFeedback.textContent = 'Por favor, corrige los errores en el formulario.';
                formFeedback.classList.add('error');
                formFeedback.style.display = 'block';
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });
    }

    function displayValidationError(field, message) {
        field.classList.add('invalid');
        field.classList.remove('valid');
        const validationMessageContainer = field.closest('.form-group').querySelector('.validation-message');
        if (validationMessageContainer) {
            validationMessageContainer.textContent = message;
            validationMessageContainer.style.display = 'block';
        }
    }
    
    function markFieldValid(field) {
        field.classList.remove('invalid');
        field.classList.add('valid');
         const validationMessageContainer = field.closest('.form-group').querySelector('.validation-message');
        if (validationMessageContainer) {
            validationMessageContainer.style.display = 'none';
            validationMessageContainer.textContent = '';
        }
    }

    function isValidEmail(email) {
        // Expresión regular simple para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Añadir validación "en vivo" mientras el usuario escribe (opcional, para mejorar UX)
    contactForm.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.id === 'fullName') {
                if (this.value.trim() !== '' && this.value.trim().length >= 3) markFieldValid(this);
                // No mostrar 'invalid' en tiempo real para no ser molesto, solo al enviar.
            } else if (this.id === 'email') {
                 if (this.value.trim() !== '' && isValidEmail(this.value.trim())) markFieldValid(this);
            } else if (this.id === 'message') {
                 if (this.value.trim() !== '' && this.value.trim().length >= 10) markFieldValid(this);
            } else {
                if (this.value.trim() !== '') markFieldValid(this);
            }
            // No se validan checkboxes en el 'input' event.
        });
    });
     document.getElementById('agreeTerms')?.addEventListener('change', function() {
        if (this.checked) {
            markFieldValid(this);
        } else {
            // Solo mostrar error de checkbox al intentar enviar
        }
    });


});