import React, { useState } from "react";

import { CloseIcon, LoadingIcon, RefreshIcon } from "../../../../Icons/Icons";
import "./ContactPanel.css";
import { sendMail } from "./../../../../../service";

const sendMsg = (user, message, onSending, onSent, onSetMessage, close) => {
  onSending(true);
  sendMail({ sender: user.email, content: message }).then(resp => {
    onSending(false);
    onSent(true);

    setTimeout(() => {
      onSent(false);
      onSetMessage("");
      close();
    }, 3000);
  });
};

const ContactPanel = ({ close, showContact }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState("");
  const [sent, setSent] = useState("");
  const [user, setUser] = useState({});

  return (
    <>
      {showContact && (
        <span className="contact-container">
          <header className="contact-header">
            <h2>Contacto</h2>
            <button className="close-btn" onClick={close}>
              <CloseIcon />
            </button>
          </header>
          <section>
            <p>
              Si tenes alguna duda o sugerencia por favor escribinos y vamos a
              responderte cuanto antes.
            </p>
            <div className="help-input-row">
              <label htmlFor="name">Nombre y Apellido</label>
              <input
                type="text"
                name="name"
                onChange={e =>
                  setUser({ ...user, displayName: e.target.value })
                }
                disabled={sending || sent}
              />
            </div>
            <div className="help-input-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={e => setUser({ ...user, email: e.target.value })}
                disabled={sending || sent}
              />
            </div>
            <div className="help-input-row">
              <label htmlFor="message">Mensaje</label>
              <textarea
                name="message"
                row="30"
                maxLength="500"
                onChange={e => setMessage(e.target.value)}
                disabled={sending || sent}
              />
            </div>
            <div className="char-counter">
              {message.length}/500 {message.length >= 480 && "!"}
            </div>
            <button
              className="send-btn"
              onClick={() =>
                sendMsg(user, message, setSending, setSent, setMessage, close)
              }
              disabled={
                !user.displayName ||
                !user.email ||
                !message.length ||
                !message ||
                sending ||
                sent
              }
            >
              {!sending && !sent ? (
                "Enviar Consulta"
              ) : sending ? (
                <span className="btn-content-svg">
                  <LoadingIcon /> Enviando
                </span>
              ) : (
                <span className="btn-content-svg green-fill">
                  {/* <CheckSVG /> */}
                  <RefreshIcon />
                  <span>Enviado</span>
                </span>
              )}
            </button>
          </section>
        </span>
      )}
    </>
  );
};

export default ContactPanel;
