import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validatePhone, validateEnquiryForm } from './enquiryValidation';

test('validateEmail checks standard email formats', () => {
  assert.equal(validateEmail('hello@example.com'), true);
  assert.equal(validateEmail('student.lead@hirenext.org'), true);
  assert.equal(validateEmail('notanemail'), false);
  assert.equal(validateEmail('@domain.com'), false);
  assert.equal(validateEmail('user@'), false);
});

test('validatePhone checks minimum digits requirement', () => {
  assert.equal(validatePhone('+91 98765 43210'), true);
  assert.equal(validatePhone('9876543210'), true);
  assert.equal(validatePhone('12345'), false); // too short
  assert.equal(validatePhone(''), false);
});

test('validateEnquiryForm catches missing fields', () => {
  const result = validateEnquiryForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.program);
  assert.ok(result.errors.learningMode);
});

test('validateEnquiryForm accepts complete valid submission', () => {
  const result = validateEnquiryForm({
    fullName: 'Alex Rivera',
    email: 'alex@example.com',
    phone: '+91 9876543210',
    program: 'Java Full Stack',
    learningMode: 'Online',
    message: 'Interested in the upcoming weekend batch',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateEnquiryForm accepts Digital Marketing program submission', () => {
  const result = validateEnquiryForm({
    fullName: 'Sonia Kapoor',
    email: 'sonia@example.com',
    phone: '+91 9988776655',
    program: 'Digital Marketing',
    learningMode: 'Offline',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});
