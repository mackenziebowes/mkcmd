import {
  BlueprintContainer,
  BlueprintExplorerLayout,
  BlueprintSidebar,
  BlueprintSidebarItem,
  BlueprintNav,
  BlueprintFooter,
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
        <h1>CLI Usage</h1>
      </BlueprintExplorerLayout>

      <BlueprintFooter project="MKCMD" revision="REV-01" copyright="2026" />
    </BlueprintContainer>
  );
}
