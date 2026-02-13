import { cn } from "@/lib/utils";

interface BlueprintExplorerLayoutProps {
    sidebar?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function BlueprintExplorerLayout({
    sidebar,
    children,
    className,
}: BlueprintExplorerLayoutProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 min-h-[600px]",
                className
            )}
        >
            {sidebar}
            <main className="lg:pl-2.5">{children}</main>
        </div>
    );
}
