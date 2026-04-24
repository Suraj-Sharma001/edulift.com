/*
 Simple smoke test script for the main candidate flows.
 Run after starting the dev server:
   npm run dev
 In another shell (PowerShell):
   npm run test:smoke

 This script uses global fetch available in Node 18+. If your node is older, run the tests with a modern node or install node-fetch.
*/

const BASE = process.env.BASE_URL || 'http://localhost:3000';

function rnd() {
  return Math.random().toString(36).slice(2, 8);
}

async function assert(ok, msg) {
  if (!ok) {
    console.error('FAIL:', msg);
    process.exit(1);
  }
}

(async () => {
  console.log('Starting smoke tests against', BASE);

  const candidateEmail = `smoke+${rnd()}@example.com`;
  const password = 'Password123!';

  console.log('1) Registering candidate', candidateEmail);
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Smoke Tester', email: candidateEmail, password, role: 'candidate' })
  });
  let body = await res.json();
  await assert(res.ok && body.ok, 'Registration should succeed');
  console.log('  -> ok, token present:', !!body.token);

  const token = body.token;

  console.log('2) Login with same candidate');
  res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: candidateEmail, password })
  });
  body = await res.json();
  await assert(res.ok && body.ok && body.token, 'Login should succeed and return token');
  console.log('  -> ok');

  const authToken = body.token;

  console.log('3) Apply for scholarship (protected)');
  res = await fetch(`${BASE}/api/auth/scholarship-apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    body: JSON.stringify({ name: 'Smoke Tester', primary_email: candidateEmail, contect_number: '+1234567890', college_name: 'Test Uni', degree: 'BSc' })
  });
  body = await res.json();
  await assert(res.status === 201 && body.message, 'Scholarship apply should succeed');
  console.log('  -> ok');

  console.log('4) Apply for internship (protected)');
  res = await fetch(`${BASE}/api/auth/internship-apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    body: JSON.stringify({ name: 'Smoke Tester', email: candidateEmail, position: 'Smoke Internship' })
  });
  body = await res.json();
  await assert(res.status === 201 && body.ok, 'Internship apply should succeed');
  console.log('  -> ok');

  const applicationId = body.applicationId;

  console.log('4b) Attempt duplicate internship application (should fail)');
  res = await fetch(`${BASE}/api/auth/internship-apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    body: JSON.stringify({ name: 'Smoke Tester', email: candidateEmail, position: 'Smoke Internship' })
  });
  body = await res.json();
  await assert(res.status === 400, 'Duplicate internship apply should be rejected');
  console.log('  -> ok');

  console.log('5) Create recruiter and update application status');
  const recEmail = `rec+${rnd()}@example.com`;
  res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Rec Tester', email: recEmail, password, role: 'recruiter' })
  });
  body = await res.json();
  await assert(res.ok && body.ok, 'Recruiter registration should succeed');

  // login recruiter
  res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: recEmail, password })
  });
  body = await res.json();
  await assert(res.ok && body.ok && body.token, 'Recruiter login should succeed');
  const recToken = body.token;

  // Update status
  res = await fetch(`${BASE}/api/auth/update-application-status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${recToken}` },
    body: JSON.stringify({ applicationId, status: 'Under Review' })
  });
  body = await res.json();
  await assert(res.ok && body.ok && body.application && body.application.status === 'Under Review', 'Recruiter should be able to update status');
  console.log('  -> ok');

  console.log('5) Fetch my applications');
  res = await fetch(`${BASE}/api/auth/my-applications`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  });
  body = await res.json();
  await assert(res.ok && Array.isArray(body.applications), 'Should return applications array');
  console.log('  -> ok, found applications:', body.applications.length);

  console.log('\nAll smoke tests passed.');
  process.exit(0);
})();
