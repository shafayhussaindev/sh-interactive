// Run with: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import fn, { config } from '../netlify/functions/contact.mjs';

const post = (body, ip = '1.1.1.1') =>
  fn(new Request('http://x/api/contact', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) }), { ip });
const good = { name: 'Ayesha', email: 'ayesha@example.com', scope: ['Full-Stack Web App'], brief: 'A booking portal for our clinic.' };

test('serves the address the form posts to', () => assert.equal(config.path, '/api/contact'));

test('rejects other methods and bad bodies', async () => {
  assert.equal((await fn(new Request('http://x/api/contact'), {})).status, 405);
  assert.equal((await post('{oops')).status, 400);
  assert.equal((await post({ ...good, email: 'nope' }, '2.2.2.2')).status, 400);
});

test('spam trap answers ok without sending', async () => {
  const res = await post({ ...good, company: 'bot' }, '3.3.3.3');
  assert.deepEqual([res.status, await res.json()], [200, { ok: true }]);
});

test('sends through Resend with the visitor as reply-to', async () => {
  process.env.RESEND_API_KEY = 'test-key';
  const real = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, init) => ((sent = { url, body: JSON.parse(init.body) }), new Response('{}', { status: 200 }));
  try {
    const res = await post(good, '4.4.4.4');
    assert.equal(res.status, 200);
    assert.equal(sent.url, 'https://api.resend.com/emails');
    assert.equal(sent.body.reply_to, 'ayesha@example.com');
  } finally {
    globalThis.fetch = real;
    delete process.env.RESEND_API_KEY;
  }
});

test('without a key it says the form is not set up', async () => {
  const res = await post(good, '5.5.5.5');
  assert.equal(res.status, 500);
});
