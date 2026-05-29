// Gerenciador de Modais
function openModal(workflowId) {
  const modal = document.getElementById(`modal-${workflowId}`);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(workflowId) {
  const modal = document.getElementById(`modal-${workflowId}`);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
  document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeAllModals();
  }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAllModals();
  }
});
