import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  CloseIcon,
  LoadingIcon,
  CheckIcon,
  ErrorIcon
} from "../../../../Icons/Icons";
import "./ContactPanel.css";
import { sendMail } from "./../../../../../service";

const sendMsg = (
  user,
  message,
  onSending,
  onSent,
  onSetMessage,
  onSetSuccess,
  close
) => {
  onSending(true);
  sendMail({ user, message }).then(resp => {
    if (resp) {
      onSending(false);
      onSent(true);

      setTimeout(() => {
        onSent(false);
        onSetMessage("");
        onSetSuccess(true);
        close();
      }, 3000);
    } else {
      onSending(false);
      onSent(true);
      onSetSuccess(false);
    }
  });
};

const ContactPanel = ({ close, showContact }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
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
            {!sent ? (
              <button
                className="send-btn"
                onClick={() =>
                  sendMsg(
                    user,
                    message,
                    setSending,
                    setSent,
                    setMessage,
                    setSuccess,
                    close
                  )
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
                {!sending ? (
                  "Enviar Consulta"
                ) : (
                  <span className="btn-content-svg">
                    <LoadingIcon /> Enviando
                  </span>
                )}
              </button>
            ) : success ? (
              <span className="sent-label">
                <span>El mensaje ha sido enviado correctamente!</span>
                <CheckIcon />
              </span>
            ) : (
              <span className="warning-msg ">
                <span> Ocurrió un error al intentar enviar el mensaje.</span>
                <ErrorIcon />
              </span>
            )}
          </section>
        </span>
      )}
    </>
  );
};

ContactPanel.propTypes = {
  close: PropTypes.func.isRequired,
  showContact: PropTypes.bool.isRequired
};

export default ContactPanel;
