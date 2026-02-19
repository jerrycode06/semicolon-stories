---
title: "How I Tamed a 2000-Line AGENTS.md File (And Why You Should Too)"
date: "2026-02-19"
excerpt: "If you have been using AI coding agents for a while, you probably started the same way everyone does. You created an `AGENTS........."
tags: ["AI", "vibe-coding", "learning"]
coverImage: "/agents-md.jpg"
---

# How I Tamed a 2000-Line AGENTS.md File (And Why You Should Too)

If you have been using AI coding agents for a while, you probably started the same way everyone does. You created an `AGENTS.md` or `CLAUDE.md` file, threw in a few project rules, and called it done. Then weeks passed, your project grew, and slowly that file became a monster. Mine hit over 2000 lines before I finally decided something had to change.

This post walks through what I learned about structuring agent instruction files properly, the mistake most developers make, and the modular file approach that actually works.

---

## What Is AGENTS.md (or CLAUDE.md) and Why Does It Matter?

Before getting into the solution, it helps to understand what these files actually do.

When you use an AI coding agent like Claude Code, it reads a special markdown file at the start of every session. For Claude Code, that file is called `CLAUDE.md`. Other tools like OpenAI Codex use `AGENTS.md`. The concept is the same across all of them: it is a plain text file that tells the agent how your project works, what conventions to follow, what libraries you use, and how you expect it to behave.

Think of it like onboarding documentation, but for your AI assistant. Without it, the agent has to guess. With a well-written file, it already knows your project before you type a single message.

According to Anthropic's own documentation, a well-configured `CLAUDE.md` can document things like common bash commands, code style guidelines, testing instructions, repository conventions, developer environment setup, and project-specific warnings. There is no required format, and the recommendation is to keep it concise and human-readable, treating it like documentation that both humans and Claude need to understand quickly.

The problem is that "concise" goes out the window fast on real projects.

---

## The Problem With a Single Giant File

Here is what happens when your instruction file grows past a few hundred lines.

The agent loads the entire file into its context window at the start of every session. Context windows are not infinite, and more importantly, the agent does not weight all content equally. When you throw 2000 lines at it, it tends to pay more attention to the beginning and end, and quietly deprioritize the middle. Rules buried on line 1400 may as well not exist.

There is also the human problem. A 2000-line file is painful to maintain. When you want to update your TypeScript conventions, you have to scroll through Redux patterns, Tailwind component rules, and testing standards just to find the right section. It becomes the file nobody wants to touch.

And then there is the cognitive load problem for the agent itself. If you are asking it to work on a single React component, it does not need to know your Redux thunk patterns or your database migration conventions. Loading all of that context just creates noise.

---

## The Modular File Approach

The fix is to break the single file into a folder structure where each file covers a specific domain, and the root file acts as a lightweight index that tells the agent what to load depending on the task.

Here is the structure I landed on after some iteration:

```bash
AGENTS.md
agents/
  01-react/
    component-patterns.md
    hooks-and-custom-hooks.md
    performance.md
  02-redux/
    redux-architecture.md
    thunks-patterns.md
    selectors-and-testing.md
  03-tailwind/
    core-components.md
    exchange-components.md
  04-testing/
    testing-standards.md
    mocking-and-coverage.md
  05-typescript/
    typescript-patterns.md
    immutability.md
  06-quality/
    performance-utilities.md
    general-principles.md
```

Each subfolder maps to a domain in the project. The numbered prefixes keep things ordered and make it easy to scan at a glance.

The root `AGENTS.md` stays short. Its job is to describe the project at a high level and tell the agent which files to load based on what kind of work is being done:

```markdown
# AI Agent Rules – React + Tailwind Project

This project uses:
- React + TypeScript
- Redux Toolkit + Thunk
- Tailwind (core + Exchange)
- 95–100% test coverage requirement

## Always Load
- agents/04-testing/testing-standards.md
- agents/05-typescript/typescript-patterns.md
- agents/06-quality/general-principles.md

## Load Based on Task

### Component work
- agents/01-react/component-patterns.md
- agents/01-react/hooks-and-custom-hooks.md

### Redux changes
- agents/02-redux/redux-architecture.md
- agents/02-redux/thunks-patterns.md

### Tailwind components
- agents/03-tailwind/core-components.md
- agents/03-tailwind/exchange-components.md

### Connected component work (most common)
- agents/01-react/component-patterns.md
- agents/02-redux/redux-architecture.md
- agents/04-testing/testing-standards.md
- agents/05-typescript/typescript-patterns.md
```

Notice the "Always Load" section at the top. That is intentional. Some rules apply to every single task, no matter what. Testing standards are a good example if you have a strict coverage requirement. TypeScript patterns matter in almost every file. General principles like naming conventions and code style should be universal. Rather than leaving these as conditional, you promote them to always-load status so the agent never skips them.


![Flow Diagram](https://mermaid.ink/img/pako:eNqNVctu20YU_ZXBeKuxyeGbiwK0yARxgtiWCBRt2cWEHEmMyBlmOIytON4EybZdtECLtkDRfYEu2-_pD6Sf0OFDtvWIEG00c-fcc-499wq6gSnPKPThrOBX6YIICeIwYUB9Jufn8TcJ_O_3H96D4HH0PJ4el1mSsAnnEjxhtRRNKnPOwKO8oAn8NmF9XvDsy-Crqcr895c_QFBckVUNnnHSpkpay5zNUS0Jy4jI6p5RripapyKvJKqIlFSw4WFOGRWkQJXIWZpXBe3i91JxMH3alfjdXyAm9RKdkppmnZqSeQC86Mr59eM_3wNNV3SUpPJECaS8rDijbFt4wfmyRqpIlDa15CXqAv1bRcWMi5KwlG5WM-lK-eldp4KRoFlz3Yp0B0REusglTWUj6ND2omFKZVO5poXCcNGrD4Zt6px1Oj_-DTQDcUHSgqKXdGhHdGd019fASq_VbJWdWw8PnGwN-u0D0My15smn51XydNmGO3_4azWi-ZYV8bTfnJ-BZqH78Z4cGnZelo0kL_Iil6tNtsu-4T-BZqNXDWkBJ5uDQI1s83L6mYvT7jZA6IthWbeC7Vo9XLE2-DaB47V34IqLZQLfgosdzKSdNejNrlvIZAdyFsXgfgwt5mwHE_fG3wnFu4gpEHRGulXpENMdyMW9Py3ict1SLVcF7bud5UXhH5mPTDuyRikvuPCPZrPZSP24-ZL6R4ZjaIExXNFVnsmFj6vrhzy9gwOTZnm27e1j0kzHtZyDTF3pPU_oOY5m7-M5NS1D8w7yXAwkztgIonAfiR1iN9wi0TdJJutKxtjG-yvx9LE-PkhytrYFu-bY2WuLYXuBfpBkPSXdDgwz2EeiW65mhIdJ1hPClm1Ep3tZQjMK3YMslwOJZxhGtLcUJ8J4HO2QwBGcizyDvvrToCNYUrWW7RXetPQJlAtaqiX11TFTW90UMoEJu1VpFWFfc16uMwVv5gvoz0hRq1tTZUTSMCdzQcq7qKAso2LMGyahb9luRwL9G3gNfaTjY0fXsWXYlmNZnuHZI7iCvm6ruIsdjLGHXUMhbkfwTSesH2uaWmpsuurLdWzPvf0fjy9slQ?type=png)

## What Claude Code Does Natively

If you are using Claude Code specifically, it has some built-in behaviors worth knowing about.

Claude Code automatically reads `CLAUDE.md` files from subdirectories, not just the project root. This means you can place context-specific instructions right next to the code they apply to:

```bash
/project
  CLAUDE.md              (global rules)
  /backend
    CLAUDE.md            (backend-specific rules)
  /frontend
    CLAUDE.md            (frontend-specific rules)
  /packages/auth
    CLAUDE.md            (auth module rules)
```

When Claude Code enters a directory, it picks up the `CLAUDE.md` file in that directory automatically. This is a cleaner approach for monorepos or projects with very distinct layers.

Claude Code also supports `@include` directives in `CLAUDE.md` files, which lets you pull in other markdown files by reference:

```markdown
@include ./agents/react/component-patterns.md
@include ./agents/testing/testing-standards.md
```

This gives you a programmatic way to compose your instructions without copy-pasting content across files.

---

## A Few Mistakes to Avoid

**Invisible files.** If you create a file and never reference it in the loading strategy, the agent will never read it. I had this problem with my `general-principles.md` file for a while. It had important rules about naming conventions and code style, but because it was not listed under any task section, it was silently ignored. Audit your folder and make sure every file appears somewhere in the root document.

**Files that belong to multiple domains.** A file called `selectors-and-testing.md` sitting inside a Redux folder is a good example. If someone is only doing testing work, they might never load it. Either split the file so each concern lives in the right folder, or reference it from multiple sections in the root file.

**Making everything conditional.** It is tempting to put everything behind a conditional section to keep context minimal. But if something truly matters to code quality on every task, make it always-load. The overhead of a few hundred lines of universal rules is worth it compared to the agent ignoring them on the wrong task.

**Not adding combo sections.** Real work rarely fits into a single domain. A Redux-connected React component with tests and TypeScript types touches four different areas simultaneously. Add explicit sections in your root file for these common combinations so the agent does not have to guess which files apply.

---

## Why This Actually Works Better

The core idea here is task-scoped context. Instead of forcing the agent to hold everything in its head at once, you give it only what it needs for the work at hand. The result is more focused, more accurate responses that reflect the specific conventions of the code area being touched.

There is also a maintenance benefit. When your Tailwind conventions change, you update one file. When your Redux patterns evolve, same thing. The files stay small enough that a developer can read them in a few minutes and actually understand what is there.

And because each file is human-readable documentation, it doubles as onboarding material. A new developer who wants to understand how the project handles testing can open `testing-standards.md` directly. They do not need to wade through 2000 lines of mixed concerns.

---

## Resources to Go Deeper

Here are a few places to read more about how these files work and how to configure them well:

- **Official Claude Code documentation**: https://docs.claude.com/en/docs/claude-code/overview
- **Anthropic's guide on using CLAUDE.md files**: https://claude.com/blog/using-claude-md-files
- **Claude Code GitHub repository and changelog**: https://github.com/anthropics/claude-code
- **ClaudeLog (community-driven tips and techniques)**: https://claudelog.com
- **Complete Claude Code guide by Sid Bharath (regularly updated)**: https://www.siddharthbharath.com/claude-code-the-complete-guide/

---

## Wrapping Up

The single-file approach is fine when you start out. But as your project grows, it becomes a liability. The modular folder structure gives you the best of both worlds: a lightweight root file that is easy to scan, and deep domain-specific files that the agent can load on demand.

The key things to take away are: promote universal rules to always-load, create explicit sections for common task combinations, make sure every file you create is actually referenced somewhere, and treat these files as living documentation that evolves with your codebase.

If your instruction file has grown past a few hundred lines, it is probably worth spending an hour breaking it apart. The payoff in agent quality and maintainability is real.
