// Validate the guide against an operational checkout; no Forge calls or customer data.
// node examples/approval-rules.mjs /absolute/path/to/reapprove/src/core.js
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { validateRequest, buildRows, decide, pageStatus, bylineTitle, auditCsv, nudgesDue, afterEdit } =
  await import(pathToFileURL(process.argv[2]).href);
const now = Date.UTC(2026, 10, 19, 12);
const make = (rule, version = 3, requestId = 'example', at = now) => buildRows({
  ...validateRequest({ approvers: ['reviewer-a', 'reviewer-b'], rule, note: 'Check the escalation contact' }, 'author'),
  pageId: '123', spaceId: '456', requester: 'author', version, requestId, now: at,
});
const apply = (rows, who, decision, comment = '') => {
  const out = decide({ rows, accountId: who, decision, comment, version: 3, now: now + 1000 });
  return rows.map(r => out.updates.find(u => u.key === r.key) ?? r);
};
const title = rows => bylineTitle(pageStatus(rows, 3));
const anyApproved = apply(make('any'), 'reviewer-a', 'approved');
assert.equal(title(anyApproved), 'Approved (v3)');
assert.equal(anyApproved[1].state, 'closed');
assert.throws(() => apply(anyApproved, 'reviewer-b', 'rejected', 'Late objection'), /already answered/);
const csv = auditCsv(anyApproved, new Map([['123', 'Support handover']]), new Map());
assert.match(csv, /reviewer-b,Not needed/);
assert.deepEqual(nudgesDue(anyApproved, {}, now + 4 * 86400000), []);
const anyRejected = apply(make('any'), 'reviewer-b', 'rejected', 'Escalation contact is missing');
assert.equal(title(anyRejected), 'Rejected');
assert.equal(anyRejected[0].state, 'closed');
assert.throws(() => apply(anyRejected, 'reviewer-a', 'approved'), /already answered/);
assert.throws(() => apply(make('any'), 'reviewer-b', 'rejected'), /Give a reason/);
const allPartial = apply(make('all'), 'reviewer-a', 'approved');
assert.equal(title(allPartial), 'Approval pending 1/2');
assert.deepEqual(nudgesDue(allPartial, {}, now + 4 * 86400000)[0].approvers, ['reviewer-b']);
const allRejected = apply(allPartial, 'reviewer-b', 'rejected', 'Escalation contact is missing');
assert.equal(title(allRejected), 'Rejected');
assert.equal(allRejected[0].state, 'approved');
assert.equal(allRejected[1].comment, 'Escalation contact is missing');
assert.equal(afterEdit(anyRejected, 4).action, 'review-again');
const fresh = make('all', 4, 'new-request', now + 2000);
const history = [...anyRejected, ...fresh];
assert.equal(pageStatus(history, 4).done, 0);
assert.equal(pageStatus(history, 4).total, 2);
assert.equal(history.filter(r => r.state === 'rejected').length, 1);
console.log('PASS: four sequential decision flows, closed-row CSV, late-decision rejection, required reason, reminder eligibility, edit recovery and fresh round history');
