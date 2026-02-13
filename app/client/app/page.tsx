import {
    BlueprintButton,
    BlueprintCard,
    BlueprintCardGrid,
    BlueprintContainer,
    BlueprintFooter,
    BlueprintNav,
    BlueprintTerminal,
} from "@/components/themed";
import Link from "next/link";
import { contentConfig } from "@/lib/contentConfig";

export default function Home() {
    return (
        <main className="min-h-screen">
            <BlueprintContainer>
                <BlueprintNav
                    brand="mkcmd"
                    subtitle="CLI ARCHITECTURE SUITE"
                    metadata={[
                        { label: "SCALE", value: "1:1" },
                        { label: "DWG NO.", value: "A-001" },
                        { label: "STATUS", value: "APPROVED" },
                    ]}
                />

                <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 mb-20">
                    <div className="flex flex-col justify-center">
                        <div className="text-(--ink-secondary) text-xs mb-2.5 flex items-center gap-2.5">
                            <span className="flex-1 h-px bg-(--ink-secondary)" />
                            <span className="bg-[var(--paper)] px-1">HEIGHT: FLUID</span>
                            <span className="flex-1 h-px bg-(--ink-secondary)" />
                        </div>

                        <h2 className="text-xl lg:text-2xl leading-relaxed mb-8 text-[#333]">
                            SCAFFOLD ROBUST, AGENT-READY
                            <br />
                            COMMAND LINE INTERFACES.
                            <span className="block text-(--ink-secondary) text-base mt-2">
                                [AUTOMATION PROTOCOL READY]
                            </span>
                        </h2>

                        <p className="mb-5 max-w-md text-sm text-[#555]">
                            A remote node executable for scaffolding other remote node executables with sensible defaults. Optimized for Bun runtime with TypeScript-first architecture.
                        </p>

                        <BlueprintTerminal
                            commands={[
                                "bun install -g mkcmd",
                                "mkcmd init my-cli",
                            ]}
                            output={[
                                "Scaffolding project structure...",
                                "Injecting CLI framework...",
                                "Done in 45ms.",
                            ]}
                        />

                        <Link href="/docs/usage">
                            <BlueprintButton figLabel="ACT-01">
                                GET STARTED
                            </BlueprintButton>
                        </Link>
                    </div>

                    <div className="border border-(--ink-primary) min-h-[400px] relative items-center justify-center hidden lg:flex"
                        style={{
                            backgroundImage: "radial-gradient(var(--ink-secondary) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    >
                        <div className="absolute -translate-x-[50%] top-[50%] -left-2.5 text-xs text-(--ink-secondary) -rotate-90">
                            ELEVATION A
                        </div>

                        <div
                            className="w-[200px] h-[200px] border border-(--ink-primary) relative"
                            style={{
                                transform: "rotateX(60deg) rotateZ(45deg)",
                                transformStyle: "preserve-3d",
                                animation: "rotateSchematic 10s infinite linear",
                            }}
                        >
                            <div className="absolute w-[200px] h-[200px] border border-(--ink-primary) bg-[rgba(61,90,254,0.05)]" style={{ transform: "translateZ(100px)" }} />
                            <div className="absolute w-[200px] h-[200px] border border-(--ink-primary) bg-[rgba(61,90,254,0.05)]" style={{ transform: "translateZ(-100px)" }} />
                            <div className="absolute w-[200px] h-[200px] border border-(--ink-primary) bg-[rgba(61,90,254,0.05)]" style={{ transform: "rotateX(-90deg) translateZ(100px)" }} />
                            <div className="absolute w-[200px] h-[200px] border border-(--ink-primary) bg-[rgba(61,90,254,0.05)]" style={{ transform: "rotateX(90deg) translateZ(100px)" }} />
                            <div className="absolute w-[200px] h-[200px] border border-(--ink-primary) bg-[rgba(61,90,254,0.05)]" style={{ transform: "rotateY(-90deg) translateZ(100px)" }} />
                            <div className="absolute w-[200px] h-[200px] border border-(--ink-primary) bg-[rgba(61,90,254,0.05)]" style={{ transform: "rotateY(90deg) translateZ(100px)" }} />
                        </div>

                        <div className="absolute bottom-5 w-4/5 border-b border-(--ink-secondary) text-center text-xs text-(--ink-secondary)">
                            <span className="bg-[var(--paper)] px-1">200mm</span>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-5 my-15">
                        <h2 className="text-xl uppercase font-normal border-b-2 border-(--ink-primary) pb-1 m-0">
                            Component Assembly
                        </h2>
                        <div className="flex-1 border-b border-(--ink-primary)" />
                        <div className="text-xs">REF: B-02</div>
                    </div>

                    <BlueprintCardGrid>
                        <BlueprintCard
                            number="01"
                            title="Command Registry"
                            description="Type-safe command registration with name, description, instructions, and async run handlers. Built-in help generation from command metadata."
                        />
                        <BlueprintCard
                            number="02"
                            title="Interactive Prompts"
                            description="@clack/prompts integration for beautiful CLI interactions. Collect project details with validation and sensible defaults."
                        />
                        <BlueprintCard
                            number="03"
                            title="File Builders"
                            description="Programmatic file generation with FileBuilder class. Template-based scaffolding with depth-aware indentation."
                        />
                    </BlueprintCardGrid>
                </section>

                <section className="mt-15 flex flex-col md:flex-row gap-10 justify-between items-start">
                    <div className="w-full md:w-[45%]">
                        <div className="flex items-center gap-5 mb-8">
                            <h2 className="text-xl uppercase font-normal border-b-2 border-(--ink-primary) pb-1 m-0">
                                Specifications
                            </h2>
                        </div>
                        <ul className="list-none p-0 text-sm">
                            {[
                                { label: "RUNTIME", value: "BUN" },
                                { label: "LANGUAGE", value: "TYPESCRIPT" },
                                { label: "PROMPTS", value: "@CLACK/PROMPTS" },
                                { label: "LICENSE", value: "MIT" },
                            ].map((spec, i) => (
                                <li
                                    key={i}
                                    className="border-b border-dashed border-(--ink-secondary) py-2.5 flex justify-between"
                                >
                                    <span>{spec.label}</span>
                                    <strong>{spec.value}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full md:w-[45%] border border-(--ink-primary) h-[200px] relative flex items-center justify-center overflow-hidden">
                        <div className="absolute top-2.5 left-2.5 text-xs">DETAIL C: PLUGIN ARCHITECTURE</div>
                        <div className="w-[120px] h-[80px] border border-(--ink-primary) relative flex items-center justify-center text-sm">
                            <div className="absolute -top-5 left-5 w-px h-5 border-l border-dashed border-(--ink-primary)" />
                            <div className="absolute -bottom-5 right-5 w-px h-5 border-l border-dashed border-(--ink-primary)" />
                            CORE
                        </div>
                        <div className="w-[80px] h-[50px] border border-(--ink-secondary) absolute top-[30px] left-[30px] bg-white" />
                    </div>
                </section>
            </BlueprintContainer>

            <BlueprintFooter
                project="MKCMD"
                revision={contentConfig.version}
                copyright={contentConfig.copyright}
            />
        </main>
    );
}
