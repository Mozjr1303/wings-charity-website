(function () {
  'use strict';

  // Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
  }

  function toggleMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileDrawer.hidden = isExpanded;
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // Get Involved Modal
  const modal = document.getElementById('get-involved-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalButtons = document.querySelectorAll('[data-open-modal="get-involved"]');
  const closeModalButtons = document.querySelectorAll('[data-close-modal]');
  const form = document.getElementById('get-involved-form');
  const feedback = document.getElementById('form-feedback');
  let lastFocusedElement = null;

  function openModal() {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    closeMobileMenu();
    closeStoryModal(false);
    modal.hidden = false;
    if (feedback) feedback.hidden = true;
    const firstInput = modal.querySelector('input, select, button');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  closeModalButtons.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (feedback) {
        feedback.hidden = false;
      }
      form.reset();
    });
  }

  // Contact Page Form
  const contactPageForm = document.getElementById('contact-page-form');
  const contactPageFeedback = document.getElementById('contact-page-feedback');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (contactPageFeedback) {
        contactPageFeedback.hidden = false;
      }
      contactPageForm.reset();
    });
  }

  // Stories of Impact Reader Modal
  const STORIES_DATA = {
    'neonatal-care': {
      category: 'Neonatal Care & Safeguarding',
      title: 'Protecting High-Risk Newborns in the First Weeks of Life',
      body: 'In Malawi, premature and low-birth-weight infants face heightened vulnerability during the transition from hospital wards to home life. Through our First 100 Days and Protection & Safety programmes, Wings provides warm newborn care bundles, hygiene essentials, and close follow-up pathways so fragile infants remain safeguarded.'
    },
    'maternal-recovery': {
      category: 'Postnatal Maternal Health',
      title: 'Accompanying Mothers Through Postpartum Recovery',
      body: 'Complicated deliveries and emergency interventions require attentive postnatal follow-up. Our women-led Compassionate Care programme connects mothers with respectful clinical guidance, routine maternal checkups, and emotional accompaniment throughout recovery.'
    },
    'family-resilience': {
      category: 'Family & Community Support',
      title: 'Standing Beside Grandmothers and Extended Caregivers',
      body: 'When a mother experiences severe illness or crisis after childbirth, grandmothers and extended family members often step forward to care for the newborn. Wings works alongside families to provide infant nutrition guidance, essential supplies, and community health referrals.'
    }
  };

  const storyModal = document.getElementById('story-modal');
  const storyModalCategory = document.getElementById('story-modal-category');
  const storyModalTitle = document.getElementById('story-modal-title');
  const storyModalBody = document.getElementById('story-modal-body');
  const storyModalClose = document.getElementById('story-modal-close');
  const storyModalDismiss = document.getElementById('story-modal-dismiss');
  const storyModalInvolve = document.getElementById('story-modal-involve');
  const storyReadButtons = document.querySelectorAll('.story-read-btn');

  function openStoryModal(storyId) {
    const story = STORIES_DATA[storyId];
    if (!storyModal || !story) return;
    lastFocusedElement = document.activeElement;
    if (storyModalCategory) storyModalCategory.textContent = story.category;
    if (storyModalTitle) storyModalTitle.textContent = story.title;
    if (storyModalBody) storyModalBody.textContent = story.body;
    storyModal.hidden = false;
    if (storyModalClose) storyModalClose.focus();
  }

  function closeStoryModal(restoreFocus = true) {
    if (!storyModal) return;
    storyModal.hidden = true;
    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  storyReadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-story-id');
      openStoryModal(id);
    });
  });

  if (storyModalClose) {
    storyModalClose.addEventListener('click', () => closeStoryModal(true));
  }

  if (storyModalDismiss) {
    storyModalDismiss.addEventListener('click', () => closeStoryModal(true));
  }

  if (storyModalInvolve) {
    storyModalInvolve.addEventListener('click', () => {
      closeStoryModal(false);
      openModal();
    });
  }

  if (storyModal) {
    storyModal.addEventListener('click', (event) => {
      if (event.target === storyModal) {
        closeStoryModal(true);
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (storyModal && !storyModal.hidden) {
        closeStoryModal(true);
      } else if (modal && !modal.hidden) {
        closeModal();
      } else {
        closeMobileMenu();
      }
    }
  });
})();
