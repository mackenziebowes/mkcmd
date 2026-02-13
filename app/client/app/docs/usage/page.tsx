import {
  BlueprintContainer,
  BlueprintExplorerLayout,
  BlueprintSidebar,
  BlueprintSidebarItem,
  BlueprintNav,
  BlueprintFooter,
  BlueprintDocHeader,
  BlueprintStatusPill,
  BlueprintTerminal,
  BlueprintArgTable,
  BlueprintCodeBlock,
} from "@/components/themed";
import { contentConfig } from "@/lib/contentConfig";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "CLI Usage",
  description: "Documentation for mkcmd CLI - scaffold robust, agent-ready command line interfaces with bunx @mbsi/mkcmd init",
  author: {
    "@type": "Person",
    name: "Mackenzie Bowes",
    url: "https://mackenziebowes.com",
  },
};

export default function UsagePage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
    <BlueprintContainer>
      <BlueprintNav
        brand="MKCMD"
        subtitle="CLI Documentation"
        metadata={[
          { label: "VERSION", value: contentConfig.version },
          { label: "STATUS", value: "ACTIVE" },
        ]}
      />

      <BlueprintExplorerLayout
        sidebar={
          <BlueprintSidebar title="Documentation">
            <BlueprintSidebarItem active>Usage</BlueprintSidebarItem>
          </BlueprintSidebar>
        }
      >
        <BlueprintDocHeader
          title="CLI Usage"
          statusPill={<BlueprintStatusPill>ACTIVE</BlueprintStatusPill>}
          metaData={[
            { label: "PACKAGE", value: "@mbsi/mkcmd" },
            { label: "COMMAND", value: "init" },
          ]}
        />

        <section className="mb-16">
          <h2 className="text-lg uppercase font-normal border-b-2 border-(--ink-primary) pb-2 mb-6">
            Quick Start
          </h2>
          <BlueprintTerminal
            commands={["bunx @mbsi/mkcmd init"]}
            output={[
              "? Project name: my-cli",
              "? Target directory: ./my-cli",
              "? Description: A new CLI tool",
              "✓ Project scaffolded successfully!",
            ]}
          />
        </section>

        <section className="mb-16">
          <h2 className="text-lg uppercase font-normal border-b-2 border-(--ink-primary) pb-2 mb-6">
            Prompts Reference
          </h2>
          <BlueprintArgTable
            headers={["Prompt", "Type", "Description"]}
            rows={[
              { Prompt: "Project name", Type: "text", Description: "Name for the new CLI (used in package.json)" },
              { Prompt: "Target directory", Type: "text", Description: "Where to scaffold (default: ./{project-name})" },
              { Prompt: "Description", Type: "text", Description: "Short description for package.json and README" },
            ]}
          />
          <p className="mt-6 text-sm text-(--ink-secondary)">
            <strong>Global flags:</strong> <code className="bg-(--paper) px-1">-h, --help</code> shows help,{" "}
            <code className="bg-(--paper) px-1">-v, --version</code> prints version.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-lg uppercase font-normal border-b-2 border-(--ink-primary) pb-2 mb-6">
            Output Files
          </h2>
          <BlueprintCodeBlock label="PROJECT STRUCTURE">
{`my-cli/
├── src/
│   ├── config.ts
│   ├── core/
│   │   ├── cli.ts
│   │   ├── log.ts
│   │   └── helpers/
│   │       ├── file-builder.ts
│   │       ├── stringifier.ts
│   │       └── file-utils.ts
│   └── commands/
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md`}
          </BlueprintCodeBlock>
          <p className="mt-6 text-sm text-(--ink-secondary)">
            Create <code className="bg-(--paper) px-1">src/index.ts</code> as your entry point, then run with{" "}
            <code className="bg-(--paper) px-1">bun run src/index.ts {"<command>"}</code>
          </p>
        </section>
      </BlueprintExplorerLayout>

    </BlueprintContainer>
    <BlueprintFooter project="MKCMD" sheet="W-02" revision={contentConfig.version} copyright={contentConfig.copyright} />
    </>
  );
}
