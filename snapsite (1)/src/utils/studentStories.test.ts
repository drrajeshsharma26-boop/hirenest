import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRatingSummary,
  filterPublishedStories,
  validateStorySubmission,
  getNextCarouselIndex,
  getPrevCarouselIndex,
  clampCarouselIndex,
  StudentStory,
} from './studentStories';

test('calculateRatingSummary handles empty state without fabricating numbers', () => {
  const summary = calculateRatingSummary([]);
  assert.equal(summary.averageRating, null);
  assert.equal(summary.totalCount, 0);
  assert.equal(summary.isAwaitingAuditedReviews, true);
  assert.ok(summary.verificationStatement.includes('Awaiting independent cohort audit'));
});

test('calculateRatingSummary calculates correct distribution and average for verified stories', () => {
  const sampleStories: StudentStory[] = [
    {
      id: '1',
      studentName: 'Rohan Mehta',
      program: 'MERN Stack',
      cohort: 'Batch 2026-Q1',
      rating: 5,
      headline: 'Rigorous and hands-on',
      review: 'The project-based sprints and direct code reviews helped me build real full-stack web applications.',
      verified: true,
      status: 'published',
      createdAt: '2026-03-01',
    },
    {
      id: '2',
      studentName: 'Priya Verma',
      program: 'Data Analytics',
      cohort: 'Batch 2026-Q1',
      rating: 4,
      headline: 'Solid SQL and Python foundation',
      review: 'The mentorship on real datasets gave me confidence in writing complex analytical queries.',
      verified: true,
      status: 'published',
      createdAt: '2026-03-10',
    },
    {
      id: '3',
      studentName: 'Draft Student',
      program: 'Java Full Stack',
      cohort: 'Batch 2026-Q2',
      rating: 5,
      headline: 'Unverified draft',
      review: 'Pending audit and student authorization before publishing.',
      verified: false,
      status: 'pending_verification',
      createdAt: '2026-04-01',
    },
  ];

  const published = filterPublishedStories(sampleStories);
  assert.equal(published.length, 2); // Excludes pending_verification

  const summary = calculateRatingSummary(sampleStories);
  assert.equal(summary.totalCount, 2);
  assert.equal(summary.averageRating, 4.5);
  assert.equal(summary.ratingDistribution[5], 1);
  assert.equal(summary.ratingDistribution[4], 1);
  assert.equal(summary.isAwaitingAuditedReviews, false);
});

test('validateStorySubmission rejects invalid inputs', () => {
  const invalid = validateStorySubmission({
    studentName: 'A',
    rating: 6,
    review: 'Short',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.studentName);
  assert.ok(invalid.errors.rating);
  assert.ok(invalid.errors.review);
  assert.ok(invalid.errors.program);
});

test('validateStorySubmission accepts valid story data', () => {
  const valid = validateStorySubmission({
    studentName: 'Tanvi Saxena',
    program: 'Python Full Stack',
    cohort: 'Batch 2026-Q1',
    rating: 5,
    review: 'The instructors provided daily feedback on every backend repository commit.',
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('carousel index helpers wrap correctly across bounds', () => {
  // 3 items: 0, 1, 2
  assert.equal(getNextCarouselIndex(0, 3), 1);
  assert.equal(getNextCarouselIndex(1, 3), 2);
  assert.equal(getNextCarouselIndex(2, 3), 0); // wraps to start

  assert.equal(getPrevCarouselIndex(0, 3), 2); // wraps to end
  assert.equal(getPrevCarouselIndex(2, 3), 1);
  assert.equal(getPrevCarouselIndex(1, 3), 0);

  // Single item or empty
  assert.equal(getNextCarouselIndex(0, 1), 0);
  assert.equal(getPrevCarouselIndex(0, 1), 0);
  assert.equal(clampCarouselIndex(5, 3), 2);
  assert.equal(clampCarouselIndex(-1, 3), 0);
});
