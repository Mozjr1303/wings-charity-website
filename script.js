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
    'case-pph-coma': {
      category: 'Hospital Referral Scenario 01',
      title: 'Postpartum Haemorrhage (PPH) & Maternal Coma',
      body: 'Following an emergency caesarean section at a district hospital in Malawi, a mother suffered catastrophic postpartum haemorrhage resulting in prolonged coma in intensive care. Hospital ward nurses referred the newborn to Wings, where we provided a dedicated private nanny in the home, 3 months of infant formula and clothes, and direct utility funding for clean water and electricity so bottles could be boiled safely.'
    },
    'case-eclampsia': {
      category: 'Hospital Referral Scenario 02',
      title: 'Eclampsia Complications & Acute Lactation Failure',
      body: 'Severe pre-eclampsia progressed into eclamptic seizures during labor for a young mother in extreme poverty. While mother and baby survived, physical trauma and medications caused complete lactation failure. Wings stepped in with 100% free infant formula, feeding bottles, an in-home nanny to safeguard the infant during dizzy spells, and paid water and electricity utilities.'
    },
    'case-mental-incapacity': {
      category: 'Hospital Referral Scenario 03',
      title: 'Maternal Mental Incapacity & Kinship Caregiver Backing',
      body: 'Following traumatic labor, a mother suffered acute postpartum psychiatric complications and lacked mental capacity to safely care for her baby. An elderly grandmother stepped forward in severe poverty. Wings placed a private nanny in the home, covered formula, clothing, and domestic utilities for 0–3 months while the mother received medical monitoring.'
    },
    'neonatal-care': {
      category: 'Emergency Clinical Referral',
      title: 'Protecting Vulnerable Newborns When Mothers Cannot Care',
      body: 'In Malawi, when mothers face coma, severe illness, or lack mental capacity, Wings provides a complete 0–3 month care lifeline: infant formula, clothing, private nannies, and paid household electricity and clean water utilities free of charge.'
    },
    'maternal-recovery': {
      category: 'Postnatal Maternal Recovery',
      title: 'In-Home Private Nannies During Maternal Critical Recovery',
      body: 'Private nannies placed directly in the home take charge of round-the-clock feedings, swaddling, and hygiene, relieving exhausted grandmothers and allowing recovering mothers the medical space needed to heal.'
    },
    'family-resilience': {
      category: 'Poverty & Utility Aid',
      title: 'Electricity & Clean Water Utility Funding for Safe Feeding',
      body: 'Safe bottle feeding requires continuous clean water for boiling and electricity for sterilisation and warmth. Wings pays domestic utility bills directly for qualifying families for 0–3 months.'
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
