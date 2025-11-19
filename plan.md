# **plan.md — nx-arch Development Plan**

## 📦 Project Name

**nx-arch** (CLI package)
Primary command:

```
npx create-nx-arch-app
```

---

# **1. Project Setup**

## 1.1 Repository & Structure

* 🟥 Create monorepo or single repo using pnpm workspaces
* 🟥 Packages:

  * `packages/cli`
  * `packages/core`
  * `packages/templates`
  * `packages/plugins/*`
* 🟥 Setup Typescript project references
* 🟥 Setup build tooling (tsup / bun build / turbo)

## 1.2 Initial CLI Bootstrapping

* 🟥 Add `commander` (or oclif)
* 🟥 Implement base CLI wrapper
* 🟥 Setup version, help, --debug flags
* 🟥 Create first command:

  ```
  create-nx-arch-app <project-name>
  ```

---

# **2. Core System Architecture**

## 2.1 Required Modules

* 🟥 Config system (`.nxarch.config.json`)
* 🟥 Template loader (file-based templates)
* 🟥 Generator engine (copy templates + variable injection)
* 🟥 Package manager detector
* 🟥 File system utilities (fs-extra + globby)
* 🟥 Logger + UI prompts (prompts / enquirer)

## 2.2 Internal APIs

* 🟥 `loadConfig()`, `writeConfig()`
* 🟥 `applyPreset()`
* 🟥 `applyApiModePlugin()`
* 🟥 `applyUiPlugin()`
* 🟥 `applyVerticalPreset()`
* 🟥 `doctor()` – project validation

---

# **3. CLI Commands**

## 3.1 `create-nx-arch-app`

* 🟥 Prompt project basics
* 🟥 Choose frontend type:

  * marketing / landing
  * dashboard
  * saas
  * ecommerce
* 🟥 Choose API architecture:

  * REST
  * server-actions
  * tRPC
  * GraphQL
  * websocket
* 🟥 Choose ORM: Prisma / Drizzle / None
* 🟥 Choose UI: shadcn, tailwind, chakra
* 🟥 Generate folder structure
* 🟥 Inject dependencies
* 🟥 Generate example API + UI pages
* 🟥 Write `.nxarch.config.json`

## 3.2 `nxarch add module <name>`

* 🟥 Generate:

  * `/app/(app)/<name>/page.tsx`
  * server action or route handler
  * optional schema (Prisma/Drizzle)
  * hooks + client code (tRPC)
* 🟥 Respect user’s configured API & UI modes

## 3.3 `nxarch add endpoint <name> --type=rest`

* 🟥 Generate REST/tRPC/GraphQL handler
* 🟥 Inject into router (if applicable)

## 3.4 `nxarch enable <feature>`

* 🟥 Enable tRPC
* 🟥 Enable Websocket
* 🟥 Enable GraphQL
* 🟥 Enable Testing suite
* 🟥 Enable Authentication

## 3.5 `nxarch doctor`

* 🟥 Check missing dependencies
* 🟥 Check config mismatches
* 🟥 Check correct folder structure
* 🟥 Suggest fixes automatically

---

# **4. Templates System**

## 4.1 Base Templates

* 🟥 next.config
* 🟥 tsconfig
* 🟥 env + env.example
* 🟥 tailwind + postcss
* 🟥 layout.tsx & main structure

## 4.2 API Templates

* 🟥 `/templates/api/rest/*`
* 🟥 `/templates/api/server-actions/*`
* 🟥 `/templates/api/trpc/*`
* 🟥 `/templates/api/graphql/*`

## 4.3 UI Templates

* 🟥 `/templates/ui/shadcn/dashboard/*`
* 🟥 `/templates/ui/shadcn/landing/*`
* 🟥 `/templates/ui/tailwind/landing/*`
* 🟥 `/templates/ui/chakra/dashboard/*`

## 4.4 Vertical Presets

* 🟥 Dashboard preset
* 🟥 SaaS preset (plans, subscriptions, settings layout)
* 🟥 Ecommerce preset (products, categories, cart shell)
* 🟥 Marketing preset (hero, features, CTA blocks)

---

# **5. Plugins Architecture**

## 5.1 Plugin System

* 🟥 Load internal plugins from `/packages/plugins/*`
* 🟥 Define plugin interface:

```
interface NxArchPlugin {
  name: string;
  scaffold(ctx): Promise<void>;
  generate?(ctx): Promise<void>;
  doctor?(ctx): Promise<DoctorResult[]>;
}
```

## 5.2 Core Plugins to Implement

* 🟥 REST plugin
* 🟥 Server Actions plugin
* 🟥 tRPC plugin
* 🟥 GraphQL plugin
* 🟥 Websocket plugin
* 🟥 shadcn UI plugin
* 🟥 Tailwind UI plugin
* 🟥 Prisma plugin
* 🟥 Drizzle plugin

---

# **6. Infrastructure Setup**

## 6.1 GitHub Actions (Optional)

* 🟥 Setup build + test
* 🟥 Setup linting

## 6.2 Automated testing

* 🟥 Snapshot tests for generated output
* 🟥 CLI behaviour tests
* 🟥 Template correctness tests

---

# **7. Distribution**

## 7.1 Packaging

* 🟥 Bundle CLI with tsup
* 🟥 Publish `create-nx-arch-app` as separate package:

  * `create-nx-arch-app` (wrapper)
  * `nx-arch` (core CLI)

## 7.2 Versioning

* 🟥 Use changesets for package version bumps
* 🟥 Semantic versioning required

---

# **8. v1.0 Milestones**

## Phase 1 – MVP (Internal use)

* 🟥 CLI Scaffolding
* 🟥 REST + server actions
* 🟥 shadcn + dashboard template
* 🟥 module generator
* 🟥 config writer/reader

## Phase 2 – Developer Ready

* 🟥 Add tRPC plugin
* 🟥 Add Prisma integration
* 🟥 Add landing preset
* 🟥 Add ecommerce preset
* 🟥 Add doctor command

## Phase 3 – “Amazing” Release

* 🟥 Multi-architecture support (REST + tRPC + GraphQL coexistence)
* 🟥 Codegen for forms, validation, schema
* 🟥 Vertical SaaS boilerplate
* 🟥 VSCode snippets
* 🟥 GitHub Actions boilerplate
* 🟥 Plugin SDK for external plugin authors

---

# **9. Stretch Goals**

* 🟥 UI admin to generate modules visually
* 🟥 Live preview of generated output
* 🟥 Browser-based blueprint builder (JSON → codegen)
* 🟥 AI-assisted CLI mode using OpenAI (optional)
* 🟥 “Blueprint-as-code” JSON format for entire apps

---

# **10. Summary Table (Progress Overview)**

| Area                | Status |
| ------------------- | ------ |
| CLI Base            | 🟥     |
| Config System       | 🟥     |
| Templates           | 🟥     |
| Plugins Core        | 🟥     |
| Presets             | 🟥     |
| API Modes           | 🟥     |
| UI Systems          | 🟥     |
| Testing             | 🟥     |
| DX Polish           | 🟥     |
| Packaging & Release | 🟥     |

---

Implement precisely as planned.