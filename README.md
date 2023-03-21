Tech test by Kirt Rainford for Starling Bank.

Displays a transaction round-up amount for a week with a button to transfer the round-ups to a saver goal.

# Approach

## API Gateway
See `api-gateway/worker.js` for a basic API gateway. I'm hosting this on my own domain with CloudFlare workers at `https://starling-api-gateway.floatingdown.workers.dev/api/v2`. I created this as a really quick and simple "backend-for-frontend". I opted for this as it fit the requirements for the scope of this project, but I would look at other approaches depending on the requirements of the product I'm building.

## Frontend
Deployed with Surge because it's quick and convenient at: [https://starling-roundup-test.surge.sh/](https://starling-roundup-test.surge.sh/).

At this URL, you can test the code with an API token. Note: I decided to use an input for the API token so it can be entered manually rather than implement a production-ready system for managing secrets/token refresh.

## Testing
I had planned to write full test suites for the code, however upon exploring the API with Postman I realised this was not going to be practical for the time it would require, so I decided not to write tests. Despite this, I do have testing tools set up in this repo for vitest and React Testing Library. For production, I would use Jest rather than vitest but I like to try out new things with personal or test projects.

## Styling
I decided not to spend time making things pretty and instead focus on end to end functionality. I have used some basic styled components but intentionally kept these minimal and functional.

# TODO:
- Need to keep a record of which transactions have already been rounded up to prevent duplicate roundup transfers for a single transaction
- Currently all transactions are rounded, but this needs to be reviewed so we ensure we include only the appropriate types of transaction in the roundup
- Support adding to a pre-existing savings goal instead of creating one for every transfer
- We'll need to exclude any round-up transactions when calculating units for a round-up (we don't want to roundup a transaction that was a roundup transfer to a savings goal)
- Review a better approach for adding funds to savings goals; should we use only one savings goal for all round-ups or allow round-ups to be added to any savings goal?
- Consider the case where a savings goal was created but no transfer was initiated (e.g. network failure) - perhaps we should remove the savings goal or re-try the transfer?
- Should only allow rounding up once a week is in the past (i.e. don't do a roundup for the current week)
- Support currencies other than GBP
- Review/test with an account that has more complex categories (currently using the account's default category)