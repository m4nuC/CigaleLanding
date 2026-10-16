import test from 'node:test';
import assert from 'node:assert/strict';
import { moteCount, shouldAnimate, stagger } from '../js/hero.js';

test('moteCount returns no particles on narrow viewports', () => {
  assert.equal(moteCount(320), 0);
  assert.equal(moteCount(479), 0);
});

test('moteCount grows to twelve and clamps at desktop widths', () => {
  assert.equal(moteCount(480), 1);
  assert.equal(moteCount(1280), 11);
  assert.equal(moteCount(1360), 12);
  assert.equal(moteCount(5000), 12);
});

test('moteCount is monotonic and safe with non-integer inputs', () => {
  assert.equal(moteCount(800.8), 5);
  assert.ok(moteCount(800) <= moteCount(800.8));
  assert.equal(moteCount(Number.NaN), 0);
});

test('shouldAnimate follows the reduced motion preference', () => {
  assert.equal(shouldAnimate(false), true);
  assert.equal(shouldAnimate(true), false);
});

test('stagger returns per-index delays and clamps negative values', () => {
  assert.equal(stagger(0, 120), '0ms');
  assert.equal(stagger(1, 120), '120ms');
  assert.equal(stagger(3, 120), '360ms');
  assert.equal(stagger(-2, 120), '0ms');
});
