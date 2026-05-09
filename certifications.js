function openCertificateModal(imageSrc, title, description, certUrl) {
  const modal = document.getElementById('certificate-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const viewOfficialBtn = document.getElementById('view-official-btn');

  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  viewOfficialBtn.href = certUrl || '#';

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('certificate-modal');
  
  if (!modal) {
    return;
  }

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeCertificateModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeCertificateModal();
    }
  });

  const closeBtn = modal.querySelectorAll('button[data-close-modal]');
  if (closeBtn.length > 0) {
    closeBtn.forEach((btn) => {
      btn.addEventListener('click', closeCertificateModal);
    });
  }

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
