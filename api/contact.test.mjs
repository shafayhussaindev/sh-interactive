// Run with: node --test api/contact.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { escapeHtml, validate } from './contact.js';

const good = { name: 'Ayesha', email: 'ayesha@example.com', scope: ['Full-Stack Web App'], brief: 'A booking portal for our clinic.' };

test('accepts a complete inquiry and trims it', () => {
  const r = validate({ ...good, name: '  Ayesha  ' });
  assert.equal(r.ok, true);
  assert.equal(r.data.name, 'Ayesha');
});

test('rejects missing or bad fields', () => {
  assert.equal(validate({ ...good, name: '' }).ok, false);
  assert.equal(validate({ ...good, email: 'not-an-email' }).ok, false);
  assert.equal(validate({ ...good, brief: 'too short' }).ok, false);
  assert.equal(validate({ ...good, brief: 'x'.repeat(5001) }).ok, false);
  assert.equal(validate(null).ok, false);
});

test('only keeps known scope options', () => {
  assert.equal(validate({ ...good, scope: ['<script>'] }).ok, false);
  assert.deepEqual(validate({ ...good, scope: ['Full-Stack Web App', 'hack'] }).data.scope, ['Full-Stack Web App']);
});

test('escapes HTML in visitor input', () => {
  assert.equal(escapeHtml('<b onclick="x">&</b>'), '&lt;b onclick=&quot;x&quot;&gt;&amp;&lt;/b&gt;');
});
