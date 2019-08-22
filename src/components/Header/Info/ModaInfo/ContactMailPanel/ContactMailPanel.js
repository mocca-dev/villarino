import React from "react";

import "./ContactMailPanel.css";

const ContactMailPanel = () => {
  return (
    <section>
      <p>
        Si tenes alguna duda o sugerencia por favor escribinos y vamos a
        responderte cuanto antes.
      </p>
      <a
        className="send-email-link"
        href="mailto:consultanos.sugerinos@gmail.com?subject=Consulta desde 319"
      >
        <div className="send-email-container">Enviar e-mail</div>
      </a>
    </section>
  );
};

export default ContactMailPanel;
