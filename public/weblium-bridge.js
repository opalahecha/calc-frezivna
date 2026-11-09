/* global window, document, MutationObserver, HTMLTextAreaElement */

(() => {
  const init = () => {
    window.frezivnaEmbedCleanup?.();
    const frame = document.getElementById('frezivna-calculator');
    if (!frame) return;

    const origin = 'https://opalahecha.github.io';
    const popupId = '67b87bcdf76622f7a8b716d7';
    const popupSelector = `.popup.popup-active[data-popup-anchor="${popupId}"]`;
    const fieldSelector = `textarea[id="${popupId}-e5c06a00-d22f-4585-9bd8-adea9dcaf308"]`;
    let pending;
    let requestId;
    let submittedId;
    let observer;
    let timeout;

    const send = (data) => frame.contentWindow?.postMessage(data, origin);
    const requestHeight = () => send({ type: 'frezivna:resize-request' });
    const cancelFill = () => {
      pending = undefined;
      observer?.disconnect();
      clearTimeout(timeout);
    };
    const setValue = (field, value) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      ).set;
      setter.call(field, value);
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const showError = () => {
      cancelFill();
      let status = document.getElementById('frezivna-contact-status');
      if (!status) {
        status = document.createElement('p');
        status.id = 'frezivna-contact-status';
        status.setAttribute('role', 'alert');
        frame.insertAdjacentElement('afterend', status);
      }
      status.textContent = 'Не вдалося заповнити форму. Спробуй ще раз.';
    };
    const fill = () => {
      const field = document
        .querySelector(popupSelector)
        ?.querySelector(fieldSelector);
      if (
        !pending ||
        field?.closest('[data-app="contact-form"]')?.dataset.rendered !== 'true'
      )
        return;
      if (field.maxLength > 0 && pending.summary.length > field.maxLength) {
        showError();
        return;
      }
      const { summary, requestId: id } = pending;
      requestId = id;
      cancelFill();
      setValue(field, summary);
    };
    const open = (data) => {
      if (
        typeof data.summary !== 'string' ||
        !data.summary.trim() ||
        typeof data.requestId !== 'string' ||
        !data.requestId ||
        data.requestId.length > 100
      )
        return;
      cancelFill();
      requestId = undefined;
      submittedId = undefined;
      document.getElementById('frezivna-contact-status')?.remove();
      if (
        typeof window.showPopup !== 'function' ||
        !window.popupsInfo?.[popupId] ||
        data.summary.length > 2000
      ) {
        showError();
        return;
      }
      pending = { summary: data.summary, requestId: data.requestId };
      observer = new MutationObserver(fill);
      observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-rendered', 'class'],
      });
      timeout = setTimeout(showError, 20000);
      const selection = pending;
      try {
        Promise.resolve(window.showPopup(popupId)).catch(() => {
          if (pending === selection) showError();
        });
      } catch {
        showError();
      }
      fill();
    };
    const onMessage = (event) => {
      if (event.origin !== origin || event.source !== frame.contentWindow)
        return;
      if (event.data?.type === 'frezivna:contact-request') open(event.data);
      if (event.data?.type === 'frezivna:scroll-to-summary') {
        const offset = event.data.offset;
        if (Number.isFinite(offset) && offset >= 0 && offset <= 100000) {
          window.scrollTo({
            top: Math.max(
              0,
              frame.getBoundingClientRect().top + window.scrollY + offset - 24,
            ),
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'auto'
              : 'smooth',
          });
        }
      }
      if (event.data?.type === 'frezivna:resize') {
        const height = event.data.height;
        if (Number.isFinite(height) && height > 0 && height <= 100000) {
          frame.style.height = `${Math.ceil(height)}px`;
        }
      }
    };
    const onClose = (event) => {
      if (event.detail?.popupId !== popupId) return;
      cancelFill();
      requestId = undefined;
      submittedId = undefined;
    };
    const onSubmit = (event) => {
      submittedId = event.target.closest?.(popupSelector)
        ? requestId
        : undefined;
    };
    const onSuccessClose = (event) => {
      const message = event.target
        .closest?.('[data-role="close"]')
        ?.closest('.w-form-modal');
      const popup = document.querySelector(popupSelector);
      if (
        !popup ||
        !submittedId ||
        submittedId !== requestId ||
        !message?.querySelector('[aria-label="success message icon"]') ||
        message.closest('[data-role="success-message"]') ||
        window.getComputedStyle(message).display === 'none'
      )
        return;
      const id = submittedId;
      submittedId = undefined;
      queueMicrotask(() => {
        cancelFill();
        const field = popup.querySelector(fieldSelector);
        if (field) setValue(field, '');
        popup.querySelector('.popup-close-trigger')?.click();
        requestId = undefined;
        if (id) send({ type: 'frezivna:contact-complete', requestId: id });
      });
    };

    window.addEventListener('message', onMessage);
    document.addEventListener('popup.onClose', onClose);
    document.addEventListener('submit', onSubmit, true);
    document.addEventListener('click', onSuccessClose, true);
    frame.addEventListener('load', requestHeight);
    requestHeight();
    window.frezivnaEmbedCleanup = () => {
      cancelFill();
      window.removeEventListener('message', onMessage);
      document.removeEventListener('popup.onClose', onClose);
      document.removeEventListener('submit', onSubmit, true);
      document.removeEventListener('click', onSuccessClose, true);
      frame.removeEventListener('load', requestHeight);
    };
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
})();
