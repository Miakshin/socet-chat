import { printErr } from '../common/utils';

test('text in error equal test', () => {
  printErr('test');
  expect(document.querySelector('._err').textContent).toEqual('test');
});
