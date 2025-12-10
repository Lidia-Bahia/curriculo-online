// contato.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  if (!form) return;

  const nome  = document.getElementById('nome');
  const email = document.getElementById('email');
  const msg   = document.getElementById('msg') || form.querySelector('textarea[name="msg"]');

  function showError(el, text) {
    if (!el) return;
    let e = el.nextElementSibling;
    if (!e || !e.classList || !e.classList.contains('err')) {
      e = document.createElement('div');
      e.className = 'err';
      el.parentNode.insertBefore(e, el.nextSibling);
    }
    e.textContent = text;
  }

  function clearErrors() {
    form.querySelectorAll('.err').forEach(x => x.textContent = '');
    const st = document.getElementById('status'); if (st) st.textContent = '';
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v||'').trim());
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearErrors();
    let ok = true;

    if (!nome || !nome.value.trim()) { showError(nome, 'Informe seu nome.'); ok = false; }
    if (!email || !validEmail(email.value)) { showError(email, 'E-mail inválido.'); ok = false; }
    if (!msg || msg.value.trim().length < 5) { showError(msg, 'Escreva uma mensagem (mín. 5 caracteres).'); ok = false; }

    if (!ok) return;

    // criando uma área de status simples
    let status = document.getElementById('status');
    if (!status) { status = document.createElement('div'); status.id = 'status'; form.appendChild(status); }

    status.textContent = 'Enviando...';
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    setTimeout(function () {
      form.reset();
      status.textContent = 'Mensagem enviada com sucesso!';
      if (btn) btn.disabled = false;
    }, 700);
  });

  // limpar erro ao digitar
  [nome, email, msg].forEach(f => {
    if (!f) return;
    f.addEventListener('input', () => {
      const nxt = f.nextElementSibling;
      if (nxt && nxt.classList && nxt.classList.contains('err')) nxt.textContent = '';
      const st = document.getElementById('status'); if (st) st.textContent = '';
    });
  });
});
