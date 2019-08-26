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
        target="_blank"
        rel="noopener noreferrer"
        className="send-email-link"
        href={`mailto:consultanos.sugerinos@gmail.com?subject=Consulta Horarios 319 - v${
          process.env.REACT_APP_VERSION
        }`}
      >
        <div className="send-email-container">Enviar e-mail</div>
      </a>
    </section>
  );
};

export default ContactMailPanel;
