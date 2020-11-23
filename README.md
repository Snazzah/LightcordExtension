# Lightcord Extension
The web extension to make Lightcord work.

## Why do I need this?
The Cloudflare configuration for the domain `discord.com` [now blocks out requests](https://github.com/discord/discord-api-docs/issues/2078#issuecomment-697829305) that do not have the [proper user agent](https://discord.com/developers/docs/reference#user-agent). Since browsers are strict and do not allow the modification of user agents from inside a page, this extension sets the user agent for outgoing requests from Lightcord. (and does not require the use of a backend)

Before then the CloudFlare configuration for `discordapp.com` did not actively block requests with the incorrect user agents, but since the use of API requests to that domain is being deprecated, this extension is now required for future versions of Lightcord.

## What exactly is happening here?
- For every request being created for `discord.com` from Lightcord, the `User-Agent` header is replaced with `DiscordBot (https://lightcord.js.org 1.0.0)`
- All requests to `discordapp.com` from Lightcord will be redirected to `discord.com`.
- The `Access-Control-Allow-Headers` header in every response from Discord will have `user-agent` appended to it, since Firefox requires it in the CORS preflight.
- This extension also allows any request to `discord.com` from projects in [GitHub Codespaces](https://github.com/features/codespaces) to work. (Since Lightcord development use GitHub Codespaces)