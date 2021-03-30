import emailjs from 'emailjs-com';

const handleEmailJsFail = (error) => {
  console.warn('Failed ...', error);
};

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const idValidEmail = (email) => emailRegExp.test(String(email).toLowerCase());

const createEmailValidator = () => {
  let timeoutRef = null;

  return (el) => {
    if (!(el instanceof HTMLElement)) {
      console.warn('Email cannot be validated');
      // do not block further processing
      return true;
    }

    if (!idValidEmail(el.value)) {
      // add class for incorrect input
      el.classList.add('shake');

      clearTimeout(timeoutRef);
      timeoutRef = setTimeout(
        () => {
          // remove class for incorrect input
          el.classList.remove('shake');
          timeoutRef = null;
        },
        // 820 align with css animation duration
        820,
      );

      return false;
    }

    return true;
  };
};

const contactEmailValidator = createEmailValidator();
const subscribeEmailValidator = createEmailValidator();

document.addEventListener('DOMContentLoaded', () => {
  // email form handler
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const { email } = this.elements;

    if (!contactEmailValidator(email)) {
      return;
    }
    event.target.classList.add('disabled');
    const loader = document.getElementsByClassName('lds-ellipsis')[0];
    loader.style.display = 'block';
    emailjs.sendForm('gmail', 'template_asI2nKbM', this).then(
      () => {
        document.getElementById('contact-us-title').textContent = 'We will reach out to you shortly';
        document.getElementById('contact-form').style.display = 'none';
        loader.style.display = 'none';
      },
      handleEmailJsFail,
    );
  });

  document.querySelector('.subscribe-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const { email } = this.elements;

    if (!subscribeEmailValidator(email)) {
      return;
    }

    emailjs.sendForm('gmail', 'subscription', this).then(
      () => {
        document.querySelector('.footer__subscribe-label').textContent = 'You have been successfully subscribed';
        document.getElementById('footer__subscribe-input').style.display = 'none';
        document.querySelector('.footer__subscribe-button-set').style.display = 'none';
      },
      handleEmailJsFail,
    );
  });

  // Read More handler
  document.getElementById('app').onclick = (e) => {
    if (e.target.classList.contains('do-button')) {
      const containerId = e.target.getAttribute('data-container');
      if (containerId) {
        document.getElementById(containerId).style.display = 'block';
        e.target.style.display = 'none';
      }
    }
  };
});
