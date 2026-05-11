/* ==========================================
   MODAL FUNCTIONS - Certificate enlargement modal
   ========================================== */

/**
 * Opens the certificate modal with enlarged image and details
 * @param {string} imageSrc - Path to the certificate image
 * @param {string} title - Certificate title
 * @param {string} description - Certificate description
 * @param {string} certUrl - URL to official certificate
 */
function openCertificateModal(imageSrc, title, description, certUrl) {
  const modal = document.getElementById('certificate-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const viewOfficialBtn = document.getElementById('view-official-btn');

  // Set modal content
  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  viewOfficialBtn.href = certUrl || '#';

  // Show modal and prevent background scrolling
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the certificate modal and restores normal scrolling
 */
function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

/* ==========================================
   EVENT LISTENERS - Modal interactions and triggers
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('certificate-modal');

  if (!modal) {
    return;
  }

  // Close modal when clicking outside the content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeCertificateModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeCertificateModal();
    }
  });

  // Close modal with close buttons
  const closeBtn = modal.querySelectorAll('button[data-close-modal]');
  if (closeBtn.length > 0) {
    closeBtn.forEach((btn) => {
      btn.addEventListener('click', closeCertificateModal);
    });
  }

  // Certificate image click handlers - open modal with certificate details
  const certImages = document.querySelectorAll('[data-cert-image]');
  certImages.forEach((img) => {
    img.addEventListener('click', function() {
      const certData = {
        src: this.getAttribute('data-cert-image'),
        title: this.getAttribute('data-cert-title'),
        description: this.getAttribute('data-cert-description'),
        url: this.getAttribute('data-cert-url'),
      };
      openCertificateModal(certData.src, certData.title, certData.description, certData.url);
    });
  });

  // Alternative modal trigger buttons (if any)
  const certButtons = document.querySelectorAll('[data-open-cert-modal]');
  certButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const certData = {
        src: this.getAttribute('data-cert-image'),
        title: this.getAttribute('data-cert-title'),
        description: this.getAttribute('data-cert-description'),
        url: this.getAttribute('data-cert-url'),
      };
      openCertificateModal(certData.src, certData.title, certData.description, certData.url);
    });
  });
});
