import { cn } from "@/lib/utils";

interface BlueprintButtonProps {
    children: React.ReactNode;
    figLabel?: string;
    onClick?: () => void;
    className?: string;
}

export function BlueprintButton({
    children,
    figLabel,
    onClick,
    className,
}: BlueprintButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "inline-block mt-8 bg-transparent text-(--ink-primary) border-2 border-(--ink-primary) px-10 py-4 uppercase font-mono text-base cursor-pointer relative transition-all duration-200 hover:bg-(--ink-primary) hover:text-white",
                className
            )}
        >
            {figLabel && (
                <span className="absolute -top-5 left-0 text-xs text-(--ink-secondary)">
                    {figLabel}
                </span>
            )}
            {children}
        </button>
    );
}
