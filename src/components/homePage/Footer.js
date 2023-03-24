import React from 'react';
import '../style/Footer.css';
import { Button } from './Button';



function Footer() {
  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
      <p className='footer-subscription-heading'>
          Adres schroniska: XYZ
        </p>
        <p className='footer-subscription-heading'>
          Chciałbyś się z nami skontaktować ?
        </p>
        <p className='footer-subscription-text'>
          Podaj swój adres email poniżej.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Twój adres email'
            />
            <Button buttonStyle='btn--outline'>Skontaktuj się</Button>
          </form>
        </div>
      </section> */}
    </div>
  );
}

export default Footer;