# scripting-happy-birthdays

### Getting Started

```
git clone https://github.com/RichardWatkins1/scripting-happy-birthdays.git
cd scripting-happy-birthdays
yarn
```

### Running tests

```
yarn test
```

### Running Script

Birthday emails are sent using AWS SES. SES requires a verified email in order to send emails.

```
VERIFIED_EMAIL=<verified_email> node index.js
```
