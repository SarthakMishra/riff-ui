# MCP server

Let your coding agent browse, search and install standalone Riff components through the shadcn MCP server, with the @riff registry set in components.json.

[Live preview and interactive docs](https://sarthakmishra.com/riff-ui/agents/mcp)

The shadcn CLI includes an MCP server. Connect it to your agent and the agent can list, search and install components from every registry in your `components.json`, including `@riff`, without you copying commands.

## Register the namespace

The MCP server reads registries from `components.json`, so add `@riff` there first:

```json
{
  "registries": {
    "@riff": "https://sarthakmishra.com/riff-ui/r/{name}.json"
  }
}
```

## Connect your agent

`mcp init` writes the server into your agent's config. Pick yours.

### Claude Code

```sh
npx shadcn@latest mcp init --client claude
```

Restart Claude Code and run `/mcp` to check that the shadcn server is connected.

### Cursor

```sh
npx shadcn@latest mcp init --client cursor
```

Then enable the shadcn server under **Cursor Settings → MCP**.

### VS Code

```sh
npx shadcn@latest mcp init --client vscode
```

Open `.vscode/mcp.json` and choose **Start** next to the shadcn server.

### opencode

```sh
npx shadcn@latest mcp init --client opencode
```

Restart opencode to load the server.

### Codex

Codex reads MCP servers from `~/.codex/config.toml`. Add the server there, then restart Codex:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## Try it

Ask in plain language. The agent finds the item in the registry and runs the install for you:

- "Show me the components in the @riff registry."
- "Add the quota meter from @riff to the billing page."
- "Install the Riff agent skill."

## MCP and the skill together

The MCP server knows what exists and how to install it. The [skill](../agents.md) knows when to use each component and how to use it well. Install both: the server for discovery, the skill for judgement.
