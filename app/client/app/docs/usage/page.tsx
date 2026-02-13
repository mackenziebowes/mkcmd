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
} from "@/components/themed";

export default function UsagePage() {
  return (
    <BlueprintContainer>
      <BlueprintNav
        brand="MKCMD"
        subtitle="CLI Documentation"
        metadata={[
          { label: "VERSION", value: "1.0.0" },
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
          <h2 className="text-lg uppercase font-normal border-b-2 border-[var(--ink-primary)] pb-2 mb-6">
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
      </BlueprintExplorerLayout>

      <BlueprintFooter project="MKCMD" revision="REV-01" copyright="2026" />
    </BlueprintContainer>
  );
}
