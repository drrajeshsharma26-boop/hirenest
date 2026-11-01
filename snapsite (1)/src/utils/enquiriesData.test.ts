import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_SEED_ENQUIRIES,
  buildHireNestWhatsAppUrl,
  buildStudentReplyWhatsAppUrl,
  buildHireNestMailtoUrl,
  generateLeadsCSV,
  generateLeadId,
  HIRE_NEST_PHONE,
  HIRE_NEST_EMAIL,
} from './enquiriesData';

test('INITIAL_SEED_ENQUIRIES contains realistic seed leads', () => {
  assert.ok(INITIAL_SEED_ENQUIRIES.length >= 3);
  const digitalMarketingLead = INITIAL_SEED_ENQUIRIES.find(
    (l) => l.program === 'Digital Marketing'
  );
  assert.ok(digitalMarketingLead);
  assert.equal(digitalMarketingLead.status, 'New');
  assert.equal(digitalMarketingLead.learningMode, 'Offline');
});

test('generateLeadId produces valid format HN-YYYY-XXXX', () => {
  const id = generateLeadId();
  assert.match(id, /^HN-\d{4}-\d{4}$/);
});

test('buildHireNestWhatsAppUrl points to 8860670794 and formats message', () => {
  const url = buildHireNestWhatsAppUrl({
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul@example.com',
    program: 'Digital Marketing',
    learningMode: 'Offline',
    message: 'What is the fee and duration?',
  });

  assert.ok(url.includes(`wa.me/91${HIRE_NEST_PHONE}`));
  assert.ok(url.includes(encodeURIComponent('Rahul Sharma')));
  assert.ok(url.includes(encodeURIComponent('Digital Marketing')));
  assert.ok(url.includes(encodeURIComponent('Sector 63, Noida')));
});

test('buildStudentReplyWhatsAppUrl creates direct reply link for student number', () => {
  const lead = INITIAL_SEED_ENQUIRIES[0];
  const url = buildStudentReplyWhatsAppUrl(lead);

  // Phone was +91 98112 34567, so it should resolve to wa.me/919811234567
  assert.ok(url.includes('wa.me/919811234567'));
  assert.ok(url.includes(encodeURIComponent(lead.fullName)));
  assert.ok(url.includes(encodeURIComponent('Hire Nest')));
});

test('buildHireNestMailtoUrl creates mailto to hirenestsolution@gmail.com', () => {
  const url = buildHireNestMailtoUrl({
    fullName: 'Pooja Verma',
    program: 'Digital Marketing',
    phone: '9811234567',
    email: 'pooja@example.com',
  });

  assert.ok(url.startsWith(`mailto:${HIRE_NEST_EMAIL}`));
  assert.ok(url.includes('Pooja%20Verma') || url.includes('Pooja+Verma') || url.includes('Pooja'));
});

test('generateLeadsCSV outputs standard CSV with headers and records', () => {
  const csv = generateLeadsCSV(INITIAL_SEED_ENQUIRIES);
  assert.ok(csv.startsWith('Lead ID,Date & Time,Full Name,Email,Phone,Program,Learning Mode,Status,Source,Student Message,Internal Notes'));
  assert.ok(csv.includes('Pooja Verma'));
  assert.ok(csv.includes('Digital Marketing'));
});
