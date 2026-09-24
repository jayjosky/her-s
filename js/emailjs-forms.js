// Shared EmailJS submission handler for the application and donation forms.
// Each form must have data-emailjs-form, and a .form-message element to
// report status into. Hidden inputs named "subject" and "form_type" are
// populated automatically if present. On success, a popup confirms the
// submission instead of (or alongside) the inline status text.
(function () {
  var PUBLIC_KEY = '0qDZU_hJUYFo9CYWk';
  var SERVICE_ID = 'service_2j6krvw';
  var TEMPLATE_ID = 'template_17prah6';
  var AUTO_CLOSE_MS = 4000;

  var modalTimer = null;

  function getModal() {
    var modal = document.getElementById('successModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.id = 'successModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'successModalMessage');
    modal.innerHTML =
      '<div class="success-modal-card">' +
      '<div class="success-modal-icon">&#10003;</div>' +
      '<p id="successModalMessage"></p>' +
      '<button type="button" class="btn btn-primary" id="successModalOk">Okay</button>' +
      '</div>';
    document.body.appendChild(modal);

    var closeIt = function () { closeModal(modal); };
    modal.querySelector('#successModalOk').addEventListener('click', closeIt);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeIt();
    });

    return modal;
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    if (modalTimer) {
      clearTimeout(modalTimer);
      modalTimer = null;
    }
  }

  function showSuccessModal(message) {
    var modal = getModal();
    modal.querySelector('#successModalMessage').textContent = message;
    modal.classList.add('open');
    if (modalTimer) clearTimeout(modalTimer);
    modalTimer = setTimeout(function () { closeModal(modal); }, AUTO_CLOSE_MS);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (window.emailjs) {
      window.emailjs.init({ publicKey: PUBLIC_KEY });
    }

    document.querySelectorAll('[data-emailjs-form]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        var output = form.querySelector('.form-message');
        var submitBtn = form.querySelector('button[type=submit]');

        if (!form.checkValidity()) {
          if (output) {
            output.textContent = 'Please complete all required fields.';
            output.style.color = '#b91c1c';
          }
          return;
        }

        var subjectField = form.querySelector('input[name=subject]');
        if (subjectField && form.dataset.subjectTemplate) {
          var nameField = form.querySelector('[name=name]');
          subjectField.value = form.dataset.subjectTemplate.replace(
            '{name}',
            (nameField && nameField.value) || 'New submission'
          );
        }

        if (output) {
          output.textContent = 'Sending...';
          output.style.color = '#64748b';
        }
        if (submitBtn) submitBtn.disabled = true;

        if (!window.emailjs) {
          if (output) {
            output.textContent = 'Could not load the email service. Please try again or email info.helpempowerrefugees@gmail.com directly.';
            output.style.color = '#b91c1c';
          }
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form).then(
          function () {
            var successMessage = form.dataset.successMessage || "Thank you — we've received your submission and will be in touch soon.";
            if (output) {
              output.textContent = '';
            }
            showSuccessModal(successMessage);
            form.reset();
            if (submitBtn) submitBtn.disabled = false;
          },
          function () {
            if (output) {
              output.textContent = 'Something went wrong. Please try again or email info.helpempowerrefugees@gmail.com directly.';
              output.style.color = '#b91c1c';
            }
            if (submitBtn) submitBtn.disabled = false;
          }
        );
      });
    });
  });
})();
