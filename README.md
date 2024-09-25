# juliuszlioba.com mailer

Request body example:
```json
{
  "botcheck": "false",
  "name": "Julius",
  "email": "julius@juliuszllioba.com",
  "subject": "julius sent a message from juliuszlioba.com",
  "message_subject": "Test subject",
  "message": "Test message"
}
```

## Email dev

Email tamplates stored in folder `./emails`.<br>
To start dev server for tamplates run:

```
pnpm run dev-email
```

## Nextjs server

start development:

```
pnpm run dev
```

`./src/app/api/config/limiter.ts` contains limiter configuration to limit only 5 request per 1 min