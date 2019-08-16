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
      onSetSuccess(true);

      setTimeout(() => {
        onSent(false);
        onSetMessage("");
        close();
      }, 3000);
    } else {
      onSending(false);
      onSent(true);
      onSetSuccess(false);
    }
  });
};

const emailValidation = (setValidEmail, setUser, user, e) => {
  const email = e.target.value;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email)) {
    setUser({ ...user, email });
    setValidEmail(true);
  } else {
    setValidEmail(false);
  }
};

const ContactPanel = ({ close }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [dirtyEmail, setDirtyEmail] = useState(false);
  const [user, setUser] = useState({});

  return (
    <section className="contact-container">
      <form>
        <p>
          Si tenes alguna duda o sugerencia por favor escribinos y vamos a
          responderte cuanto antes.
        </p>
        <div className="help-input-row">
          <label htmlFor="name">Nombre y Apellido</label>
          <input
            type="text"
            name="name"
            onChange={e => setUser({ ...user, displayName: e.target.value })}
            disabled={sending || sent}
          />
        </div>
        <div className="help-input-row">
          <label className="email-lbl" htmlFor="email">
            <span>Email</span>
            {!validEmail && dirtyEmail && (
              <span className="invalid-format-badge">
                <ErrorIcon />
                <span className="invalid-format">Formato incorrecto</span>
              </span>
            )}
          </label>
          <input
            type="email"
            name="email"
            onChange={e => emailValidation(setValidEmail, setUser, user, e)}
            disabled={sending || sent}
            onKeyDown={() => setDirtyEmail(true)}
            className={!validEmail && dirtyEmail ? "invalid-format-input" : ""}
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
              !validEmail ||
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
            <ErrorIcon />
            <span> Ocurrió un error al intentar enviar el mensaje.</span>
            <button
              className="close-warning-btn"
              onClick={() => {
                setSent(false);
                setSuccess(true);
              }}
            >
              <CloseIcon />
            </button>
          </span>
        )}
      </form>
    </section>
  );
};

ContactPanel.propTypes = {
  close: PropTypes.func.isRequired
};

export default ContactPanel;
