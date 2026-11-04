# Reapprove for Confluence: user guide

Reapprove is a Confluence Cloud app by Design Master Solutions. Page approvals are tied to the page version: when someone edits an approved page, the approval stops counting and the same approvers are asked to review the new version. This repository holds the public documentation and is the place to report problems.

## Ask for approval

1. Open a Confluence page. Under the title, click **Request approval** (it shows the current state, for example *Not requested*).
2. In **Approvers**, choose one or more people.
3. Under **Rule**, choose **Everyone must approve** or **Any one approver is enough**.
4. Add an optional **Note for the approvers** and click **Request approval of version N**.

The approvers get a page comment with an @mention, so they see it in the Confluence bell and by e-mail, with the page title.

If an approver has not answered after 3 days, Reapprove adds another comment that @mentions only the approvers still missing, and repeats it every 7 days while the request stays open. Each step is sent once, and it stops as soon as everyone has answered or the request is cancelled.

## Approve or reject

Open the page and click the state under the title. Click **Approve version N**, or write **Your comment** and click **Reject**. A comment is required to reject, and it goes to the page history and to the reply comment.

## What happens when the page is edited

- The state under the title reads **Approved (vN)** while the page is still on the approved version.
- After an edit, it reads **Needs re-approval**, and the same approvers are mentioned again to review the new version. An old note or reason does not carry into the new round.
- Adding or removing a label does not create a page version, so it does not reset the approval.
- A request nobody answered yet just follows the latest version, without new comments, so a burst of edits does not spam anyone.

The person who asked can **Cancel request** at any time. **New request** starts a round with other approvers or another rule.

## Where to follow approvals

- **On the page:** the dialog shows the **History**: who decided which version, when, and why.
- **In a space:** the space sidebar has **Approvals**, listing every page with a request, its state, the reviewed version, the last approved version and the current version. A line at the top counts pages by state, starting with what needs action (needs re-approval, rejected, pending). Click a count to list only those pages; click it again, or **Show all**, to see every page. **Export history (CSV)** shows every decision in the space, one line per approver per round (page, version, approver, decision, comment, who asked, when asked and decided, in UTC), ready to paste into a spreadsheet for an audit. Pages you cannot see are left out.
- **For you:** **Apps > My approvals** lists what waits for your decision, oldest request first, with how many days each one has been waiting.

Pages you cannot see in Confluence stay hidden in these lists, because titles and versions are read with your own permissions.

## Data and privacy

The app is Runs on Atlassian: it has no servers of its own and sends no data outside Atlassian. It stores, in Atlassian Forge storage of your site, one record per approver per round: page ID, page version, state, dates, the note or reason typed and the Atlassian account IDs of the requester and the approver. Page titles and content are read live and never stored. Once a week it reports the stored account IDs to Atlassian through the Personal data reporting API; when an account is closed, its account ID and the text it typed are removed and the decision stays. Privacy policy: https://www.designmastersolutions.com/privacy.html#atlassian-apps

## Pricing

Sold through the Atlassian Marketplace, per Confluence user, free for up to 10 users. Requesting and deciding need an active subscription; see the Marketplace listing for the current price.

## Support

- Ticket: https://portal.designmastersolutions.com/submitticket.php
- E-mail: info@designmastersolutions.com

Answers in English or Portuguese.
