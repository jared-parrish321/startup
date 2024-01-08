function login() {
  const nameEl = document.querySelector('#name');
  localStorage.setItem('userName', nameEl.value);
  window.location.href = 'day.html';
}
