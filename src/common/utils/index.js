export const printErr = (text) => {
  if (!document.querySelector('.err')) {
    const div = document.createElement('div');
    const target = document.querySelector('body');

    div.className = 'err';
    div.textContent = text;
    target.insertBefore(div, document.querySelector('#root'));

    setTimeout(() => {
      target.removeChild(div);
    }, 3000);
  }
};
