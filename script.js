// Loading animation fade out on page load
window.addEventListener('load', () => {
  const loader = document.querySelector('.loading-animation');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
});

// Insert hamburger menu button into nav-container
const navContainer = document.querySelector('.nav-container');
if (navContainer) {
  const hamburger = document.createElement('button');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  // Insert hamburger before nav-links
  const navLinks = navContainer.querySelector('.nav-links');
  navContainer.insertBefore(hamburger, navLinks);

  // Hamburger toggle event
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Smooth scrolling for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu on link click
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    }
  });
});

// Contact form submit handler with floating notification
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    showNotification(
      'Thank you for your message!',
      'For immediate assistance, please WhatsApp me at +977 9864535410 or email rizanmk27@gmail.com'
    );

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      contactForm.reset();
    }, 2000);
  });
}

// Function to show floating notification (consistent with your style)
function showNotification(title, message) {
  const notification = document.createElement('div');
  notification.className = 'floating-notification';
  notification.innerHTML = `
    <div class="notification-header">
      <i class="fas fa-comment-dots"></i>
      <h4>${title}</h4>
      <button class="notification-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
    </div>
    <div class="notification-body">
      <p>${message}</p>
    </div>
    <div class="notification-actions">
      <a href="https://wa.me/9779864535410" class="whatsapp-btn" target="_blank" rel="noopener">
        <i class="fab fa-whatsapp"></i> WhatsApp
      </a>
      <a href="mailto:rizanmk27@gmail.com" class="email-btn" target="_blank" rel="noopener">
        <i class="fas fa-envelope"></i> Email
      </a>
    </div>
  `;

  document.body.appendChild(notification);

  // Show with animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  });

  // Auto close after 8 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 8000);
}
