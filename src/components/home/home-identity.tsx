"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CategoryProjectRotator } from "@/components/home/category-project-rotator";
import { ProjectTags } from "@/components/home/project-tags";
import type { Project, ProjectListBadge } from "@/lib/content";
import {
  pressMentions,
  primaryAward,
  projectHasNationalArtsAward,
} from "@/lib/credentials";
import {
  CATEGORY_LABELS,
  type ProjectCategory,
  ROLE_STYLES,
} from "@/lib/roles";
import {
  audioDeveloperProductLine,
  aylesimDevicesSlug,
  contactAvailability,
  contactEmail,
  contactLinks,
  maxBerlinCommunityProof,
  maxBerlinCommunitySlug,
  maxBerlinNetworkUrl,
  resumeHref,
  resumeLabel,
  webDeveloperStack,
} from "@/lib/site";

interface FeaturedCard {
  badgeLabel: string;
  badgeVariant: "award" | "collaboration" | "publisher";
  slug: string;
  title: string;
  tags: readonly string[];
  description: string;
  cover: string;
  rotation: number;
}

const FEATURED_CARDS: FeaturedCard[] = [
  {
    badgeLabel: "Berggruen Institute × Dark Matter Labs",
    badgeVariant: "collaboration",
    slug: "planetary-compendium",
    title: "Planetary Compendium",
    tags: ["Frontend Architecture", "Data Visualization", "React / TypeScript"],
    description:
      "Data-dense research interface for high-throughput state management and render performance across thousands of concurrent heterogeneous data points.",
    cover: "/planetary.png",
    rotation: -1.5,
  },
  {
    badgeLabel: "1st Prize · National Arts Award (MUR) · Electronic Arts",
    badgeVariant: "award",
    slug: "please-set-a-password",
    title: "please set a password",
    tags: ["Media Art", "Spatial Interaction", "System Design"],
    description:
      "Installation engineering a bridge between physical security rituals and digital authentication. Designed for robust real-time reliability in live public-facing contexts.",
    cover: "/tw2.jpg",
    rotation: 1.2,
  },
  {
    badgeLabel: "Isotonik Studios · Attack Magazine",
    badgeVariant: "publisher",
    slug: "knob-studio",
    title: "Knob Studio",
    tags: ["UI/UX Design", "Audio Engineering", "DSP / MaxMSP"],
    description:
      "Commercial Max for Live instrument optimized for sub-5ms parameter response and zero-latency UI feedback. Active base of 3,600+ musicians worldwide.",
    cover: "/knobstudio.png",
    rotation: -2,
  },
];

interface HowIWorkCard {
  eyebrow: string;
  stripe: string;
  badgeBg: string;
  pillClass: string;
  chipClass: string;
  title: string;
  tags: readonly string[];
  description: string;
}

const HOW_I_WORK_CARDS: HowIWorkCard[] = [
  {
    eyebrow: "Approach",
    stripe: "bg-(--accent)",
    badgeBg: "bg-(--accent)/8",
    pillClass: "border-(--accent)/45 bg-(--accent)/12 text-(--accent)",
    chipClass: "border-(--accent)/35 bg-(--accent)/6 text-(--foreground)",
    title: "Relations, not surfaces",
    tags: ["Systems", "Constraints", "Behavior"],
    description:
      "I do not treat a project as a surface to style. I treat it as a set of relations: inputs, constraints, timing, feedback, misuse, attention.",
  },
  {
    eyebrow: "Method",
    stripe: "bg-(--role-web)",
    badgeBg: "bg-(--role-web)/8",
    pillClass: "border-(--role-web)/45 bg-(--role-web)/12 text-(--role-web)",
    chipClass: "border-(--role-web)/35 bg-(--role-web)/6 text-(--foreground)",
    title: "Cross-media fluency",
    tags: ["Media Art", "Engineering", "Interaction"],
    description:
      "I move between media because the underlying questions are often the same: what needs to be visible, what behavior should be exposed, what should stay quiet, and where a user or performer needs leverage.",
  },
  {
    eyebrow: "Goal",
    stripe: "bg-(--role-audio)",
    badgeBg: "bg-(--role-audio)/8",
    pillClass:
      "border-(--role-audio)/45 bg-(--role-audio)/12 text-(--role-audio)",
    chipClass:
      "border-(--role-audio)/35 bg-(--role-audio)/6 text-(--foreground)",
    title: "Governing complexity",
    tags: ["Architecture", "Control", "Human factors"],
    description:
      "I like projects where the hard part is not choosing a technology, but understanding the shape of the system: what should be fixed, what should remain alive, and how much complexity a person can hold while still feeling in control.",
  },
];

interface DiagramPointer {
  x: number;
  y: number;
}

function useDiagramPointer() {
  const ref = useRef<SVGSVGElement>(null);
  const [pointer, setPointer] = useState<DiagramPointer>({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }
    setActive(true);
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    });
  };

  const handleLeave = () => {
    setActive(false);
    setPointer({ x: 0, y: 0 });
  };

  return { ref, pointer, active, handleMove, handleLeave };
}

function diagramGroupStyle(
  pointer: DiagramPointer,
  amount: number,
  origin = "200px 150px",
  active = false
): CSSProperties {
  return {
    transform: `translate(${pointer.x * amount}px, ${pointer.y * amount}px) rotate(${pointer.x * amount * 0.06}deg)`,
    transformOrigin: origin,
    transition: active
      ? "transform 0.18s ease-out"
      : "transform 0.45s ease-out",
  };
}

function RelationsDiagram() {
  const { ref, pointer, active, handleMove, handleLeave } = useDiagramPointer();
  const hub = { x: 200, y: 148 };
  const satellites = [
    { x: 72, y: 72, label: "INPUT" },
    { x: 318, y: 60, label: "CONSTRAINT" },
    { x: 352, y: 200, label: "TIMING" },
    { x: 196, y: 266, label: "FEEDBACK" },
    { x: 48, y: 222, label: "ATTENTION" },
    { x: 134, y: 40, label: "MISUSE" },
  ];
  const crossEdges = [
    [0, 5],
    [1, 2],
    [3, 4],
  ];
  const orbitPath = (cx: number, cy: number, r: number) =>
    `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      ref={ref}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Relations diagram</title>
      <style>{`
        @keyframes hiw-edge { 0%,100%{opacity:.14} 50%{opacity:.42} }
        @keyframes hiw-cross { 0%,100%{opacity:.07} 50%{opacity:.22} }
        @keyframes hiw-hub { 0%,100%{r:7} 50%{r:9.5} }
        @keyframes hiw-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
      <g style={diagramGroupStyle(pointer, 4, "200px 148px", active)}>
        {crossEdges.map(([a, b], i) => (
          <line
            key={`ce-${a}-${b}`}
            stroke="var(--accent)"
            strokeWidth="0.6"
            style={{
              animation: `hiw-cross ${4.5 + i * 0.6}s ease-in-out ${i * 0.7}s infinite`,
            }}
            x1={satellites[a].x}
            x2={satellites[b].x}
            y1={satellites[a].y}
            y2={satellites[b].y}
          />
        ))}
        {satellites.map((s, si) => (
          <line
            key={`he-${s.label}`}
            stroke="var(--accent)"
            strokeWidth="0.9"
            style={{
              animation: `hiw-edge ${3.2 + si * 0.35}s ease-in-out ${si * 0.28}s infinite`,
            }}
            x1={hub.x}
            x2={s.x}
            y1={hub.y}
            y2={s.y}
          />
        ))}
      </g>
      <g style={diagramGroupStyle(pointer, 8, "200px 148px", active)}>
        {crossEdges.map(([a, b], i) => (
          <circle
            fill="var(--accent)"
            key={`cp-${a}-${b}`}
            opacity="0.55"
            r="1.8"
          >
            <animateMotion
              dur={`${5 + i * 0.8}s`}
              path={`M ${satellites[a].x} ${satellites[a].y} L ${satellites[b].x} ${satellites[b].y}`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {satellites.map((s, si) => (
          <g key={`flow-${s.label}`}>
            <circle fill="var(--accent)" opacity="0.95" r="2.2">
              <animateMotion
                dur={`${2.4 + si * 0.35}s`}
                path={`M ${hub.x} ${hub.y} L ${s.x} ${s.y}`}
                repeatCount="indefinite"
              />
            </circle>
            <circle fill="var(--accent)" opacity="0.45" r="1.6">
              <animateMotion
                begin={`${1.2 + si * 0.18}s`}
                dur={`${2.4 + si * 0.35}s`}
                path={`M ${s.x} ${s.y} L ${hub.x} ${hub.y}`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        {satellites.map((s, si) => (
          <g key={`n-${s.label}`}>
            <circle fill="var(--accent)" opacity="0.12" r="10">
              <animateMotion
                dur={`${7 + si * 0.6}s`}
                path={orbitPath(s.x, s.y, 10)}
                repeatCount="indefinite"
              />
            </circle>
            <circle fill="var(--accent)" r="3.5">
              <animateMotion
                dur={`${4.5 + si * 0.5}s`}
                path={orbitPath(s.x, s.y, 7)}
                repeatCount="indefinite"
              />
            </circle>
            <text
              fill="var(--accent)"
              fontFamily="monospace"
              fontSize="7"
              letterSpacing="0.12em"
              opacity="0.55"
              textAnchor="middle"
              x={s.x}
              y={s.y - 10}
            >
              {s.label}
            </text>
          </g>
        ))}
        <g
          style={{
            transformOrigin: "200px 148px",
            animation: "hiw-orbit 48s linear infinite",
          }}
        >
          <circle
            cx={hub.x + 22}
            cy={hub.y}
            fill="var(--accent)"
            opacity="0.35"
            r="1.5"
          />
          <circle
            cx={hub.x - 18}
            cy={hub.y}
            fill="var(--accent)"
            opacity="0.25"
            r="1"
          />
          <circle
            cx={hub.x}
            cy={hub.y - 16}
            fill="var(--accent)"
            opacity="0.3"
            r="1.2"
          />
        </g>
      </g>
      <g style={diagramGroupStyle(pointer, 3, "200px 148px", active)}>
        <circle
          cx={hub.x}
          cy={hub.y}
          fill="none"
          r="7"
          stroke="var(--accent)"
          strokeWidth="1.5"
          style={{ animation: "hiw-hub 4s ease-in-out infinite" }}
        />
        <circle
          cx={hub.x}
          cy={hub.y}
          fill="var(--accent)"
          opacity="0.85"
          r="3"
        />
      </g>
    </svg>
  );
}

function CrossMediaDiagram() {
  const { ref, pointer, active, handleMove, handleLeave } = useDiagramPointer();
  const practice = { x: 200, y: 152 };
  const domains = [
    { cx: 148, cy: 128, label: "WEB", color: "var(--role-web)" },
    { cx: 252, cy: 128, label: "SOUND", color: "var(--role-audio)" },
    { cx: 200, cy: 196, label: "SPACE", color: "var(--role-creative)" },
  ];
  const orbitPath = (cx: number, cy: number, r: number) =>
    `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  const sound = domains[1];
  const waveHalf = 30;
  const waveLeft = sound.cx - waveHalf;
  const waveRight = sound.cx + waveHalf;
  const waveMid1 = sound.cx - 20;
  const waveMid2 = sound.cx - 10;
  const waveMid3 = sound.cx + 10;
  const wavePeakUp = `M ${waveLeft} ${sound.cy} Q ${waveMid1} ${sound.cy - 10} ${waveMid2} ${sound.cy} T ${waveMid3} ${sound.cy} T ${waveRight} ${sound.cy}`;
  const wavePeakDown = `M ${waveLeft} ${sound.cy} Q ${waveMid1} ${sound.cy + 10} ${waveMid2} ${sound.cy} T ${waveMid3} ${sound.cy - 10} T ${waveRight} ${sound.cy}`;

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      ref={ref}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cross-media diagram</title>
      <style>{`
        @keyframes hiw-frame { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(3deg)} }
      `}</style>
      <g style={diagramGroupStyle(pointer, 5, "200px 150px", active)}>
        {domains.map((d, di) => (
          <g key={`fill-${d.label}`}>
            <circle
              cx={d.cx}
              cy={d.cy}
              fill={d.color}
              opacity="0.1"
              r="90"
              stroke={d.color}
              strokeWidth="1.5"
            >
              <animate
                attributeName="opacity"
                dur={`${4.5 + di * 0.6}s`}
                repeatCount="indefinite"
                values="0.08;0.2;0.08"
              />
              <animate
                attributeName="r"
                dur={`${4.5 + di * 0.6}s`}
                repeatCount="indefinite"
                values="88;93;88"
              />
            </circle>
          </g>
        ))}
        {domains.map((d, di) => (
          <circle fill={d.color} key={`orbit-${d.label}`} opacity="0.85" r="3">
            <animateMotion
              dur={`${6 + di * 1.2}s`}
              path={orbitPath(d.cx, d.cy, 90)}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {domains.map((d, di) => (
          <g key={`flow-${d.label}`}>
            <circle fill={d.color} opacity="0.9" r="2">
              <animateMotion
                dur={`${2.8 + di * 0.4}s`}
                path={`M ${d.cx} ${d.cy} L ${practice.x} ${practice.y}`}
                repeatCount="indefinite"
              />
            </circle>
            <circle fill={d.color} opacity="0.35" r="1.5">
              <animateMotion
                begin={`${1.4 + di * 0.3}s`}
                dur={`${2.8 + di * 0.4}s`}
                path={`M ${practice.x} ${practice.y} L ${d.cx} ${d.cy}`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </g>
      <g style={diagramGroupStyle(pointer, 11, "148px 128px", active)}>
        <g opacity="0.45" stroke="var(--role-web)" strokeWidth="0.7">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                fill="var(--role-web)"
                height="5"
                key={`grid-${row}-${col}`}
                opacity={0.35 + (row + col) * 0.08}
                width="5"
                x={136 + col * 10}
                y={116 + row * 10}
              >
                <animate
                  attributeName="opacity"
                  dur={`${2.2 + (row + col) * 0.3}s`}
                  repeatCount="indefinite"
                  values={`${0.2 + (row + col) * 0.05};${0.55 + (row + col) * 0.05};${0.2 + (row + col) * 0.05}`}
                />
              </rect>
            ))
          )}
        </g>
      </g>
      <g style={diagramGroupStyle(pointer, 12, "252px 128px", active)}>
        <path
          d={wavePeakUp}
          fill="none"
          stroke="var(--role-audio)"
          strokeWidth="1.2"
        >
          <animate
            attributeName="d"
            dur="2.4s"
            repeatCount="indefinite"
            values={`${wavePeakUp};${wavePeakDown};${wavePeakUp}`}
          />
        </path>
        <circle
          cx={waveLeft}
          cy={sound.cy}
          fill="var(--role-audio)"
          opacity="0.9"
          r="2.2"
        >
          <animate
            attributeName="cy"
            dur="1.2s"
            repeatCount="indefinite"
            values={`${sound.cy};${sound.cy - 8};${sound.cy + 4};${sound.cy}`}
          />
          <animate
            attributeName="cx"
            dur="2.4s"
            repeatCount="indefinite"
            values={`${waveLeft};${waveMid2};${sound.cx};${waveRight};${waveMid3};${waveMid2};${waveLeft}`}
          />
        </circle>
      </g>
      <g style={diagramGroupStyle(pointer, 9, "200px 196px", active)}>
        <g
          stroke="var(--role-creative)"
          strokeWidth="1"
          style={{
            transformOrigin: "200px 196px",
            animation: "hiw-frame 5s ease-in-out infinite",
          }}
        >
          <rect
            fill="none"
            height="36"
            opacity="0.55"
            width="48"
            x="176"
            y="178"
          />
          <circle
            cx="176"
            cy="178"
            fill="var(--role-creative)"
            opacity="0.7"
            r="2"
          >
            <animate
              attributeName="opacity"
              dur="2s"
              repeatCount="indefinite"
              values="0.4;1;0.4"
            />
          </circle>
          <circle
            cx="224"
            cy="178"
            fill="var(--role-creative)"
            opacity="0.7"
            r="2"
          >
            <animate
              attributeName="opacity"
              begin="0.5s"
              dur="2s"
              repeatCount="indefinite"
              values="0.4;1;0.4"
            />
          </circle>
          <circle
            cx="176"
            cy="214"
            fill="var(--role-creative)"
            opacity="0.7"
            r="2"
          >
            <animate
              attributeName="opacity"
              begin="1s"
              dur="2s"
              repeatCount="indefinite"
              values="0.4;1;0.4"
            />
          </circle>
          <circle
            cx="224"
            cy="214"
            fill="var(--role-creative)"
            opacity="0.7"
            r="2"
          >
            <animate
              attributeName="opacity"
              begin="1.5s"
              dur="2s"
              repeatCount="indefinite"
              values="0.4;1;0.4"
            />
          </circle>
        </g>
      </g>
      <g style={diagramGroupStyle(pointer, 3, "200px 152px", active)}>
        <circle
          cx={practice.x}
          cy={practice.y}
          fill="var(--foreground)"
          opacity="0.85"
          r="5"
        >
          <animate
            attributeName="r"
            dur="3.5s"
            repeatCount="indefinite"
            values="5;7;5"
          />
          <animate
            attributeName="opacity"
            dur="3.5s"
            repeatCount="indefinite"
            values="0.55;1;0.55"
          />
        </circle>
      </g>
    </svg>
  );
}

function ComplexityDiagram() {
  const { ref, pointer, active, handleMove, handleLeave } = useDiagramPointer();
  const layers = [
    { w: 290, h: 208, rot: 0, op: 0.1 },
    { w: 238, h: 170, rot: 4, op: 0.16 },
    { w: 190, h: 136, rot: 8, op: 0.24 },
    { w: 146, h: 105, rot: 12, op: 0.34 },
    { w: 106, h: 76, rot: 16, op: 0.48 },
    { w: 68, h: 49, rot: 20, op: 0.7 },
  ];
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      ref={ref}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Complexity diagram</title>
      <style>{`
        @keyframes hiw-spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>
      <g style={diagramGroupStyle(pointer, 7, "200px 150px", active)}>
        <g
          style={{
            transformOrigin: "200px 150px",
            animation: "hiw-spin 80s linear infinite",
          }}
        >
          {layers.map((l) => (
            <rect
              fill="none"
              height={l.h}
              key={`layer-${l.rot}`}
              opacity={l.op}
              stroke="var(--role-audio)"
              strokeWidth={l.op > 0.6 ? 1.5 : 0.8}
              transform={`rotate(${l.rot} 200 150)`}
              width={l.w}
              x={200 - l.w / 2}
              y={150 - l.h / 2}
            />
          ))}
        </g>
      </g>
      <g style={diagramGroupStyle(pointer, 2, "200px 150px", active)}>
        <circle
          cx="200"
          cy="150"
          fill="var(--role-audio)"
          opacity="0.85"
          r="3"
        />
      </g>
      <g style={diagramGroupStyle(pointer, 4, "200px 150px", active)}>
        <text
          fill="var(--role-audio)"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="0.14em"
          opacity="0.38"
          textAnchor="middle"
          x="200"
          y="34"
        >
          OUTER COMPLEXITY
        </text>
        <text
          fill="var(--role-audio)"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="0.14em"
          opacity="0.38"
          textAnchor="middle"
          x="200"
          y="278"
        >
          INNER CONTROL
        </text>
      </g>
    </svg>
  );
}

const HOW_I_WORK_DIAGRAMS = [
  RelationsDiagram,
  CrossMediaDiagram,
  ComplexityDiagram,
];

function HowIWorkCardItem({
  card,
  index,
}: {
  card: HowIWorkCard;
  index: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Diagram = HOW_I_WORK_DIAGRAMS[index];

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-full"
      ref={wrapperRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(3rem)",
        transition: `opacity 0.65s ease ${index * 120}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms`,
      }}
    >
      <div className="flex h-full w-full flex-col overflow-hidden border border-(--index-divider) border-t-0">
        <div aria-hidden className={`h-[2px] w-full shrink-0 ${card.stripe}`} />
        <div
          className={`border-(--index-divider)/50 border-b px-5 py-4 ${card.badgeBg}`}
        >
          <span
            className={`inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${card.pillClass}`}
          >
            {card.eyebrow}
          </span>
        </div>
        <div
          className={`relative aspect-4/3 w-full overflow-hidden ${card.badgeBg}`}
        >
          {Diagram && <Diagram />}
        </div>
        <div className="flex flex-1 flex-col p-5 pt-4">
          <p className="text-xl leading-snug tracking-tight md:text-2xl">
            {card.title}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                className={`border px-2.5 py-1 font-mono text-[11px] leading-snug tracking-wide ${card.chipClass}`}
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 text-(--text-muted) text-sm leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface CategoryColumn {
  id: ProjectCategory;
  proof?: string;
  eyebrow: string;
  description: string;
  stack?: string;
  resumeHref?: string;
}

const PRIMARY_AUDIO_SLUGS = new Set(["birds", "knob-studio"]);

const PRACTICE_COLUMNS: CategoryColumn[] = [
  {
    id: "devices",
    proof: audioDeveloperProductLine,
    eyebrow:
      "Tools for composing and performing: rule systems, mappings, constraints, interfaces that stay playable while they generate variation.",
    description:
      "I build Max/MSP instruments and Ableton Live devices as playable systems: mappable, generative, precise enough for performance, open enough for misuse.",
  },
  {
    id: "web-interactive",
    eyebrow:
      "Web interfaces as problem-solving: sites, editorial systems, archives, and browser-based tools built around the shape of the content.",
    description:
      "I ship production sites and editorial systems for cultural organizations and research teams: scrollytelling, data-heavy interfaces, community platforms, and browser-based tools where structure and interaction need to hold up under real use.",
    stack: webDeveloperStack,
    resumeHref,
  },
  {
    id: "installations",
    eyebrow:
      "Software for situations in space: installations, AV systems, live visuals, sensors, timing, and behavior that has to hold up in front of people.",
    description:
      "I develop installations, AV performances, and digital artworks where software becomes part of a room: timing, sound, bodies, sensors, attention.",
  },
  {
    id: "community",
    proof: maxBerlinCommunityProof,
    eyebrow:
      "I co-founded, curate, and carry forward Max Berlin Network, a Berlin scene for Max/MSP and creative audio practice.",
    description:
      "Alongside the site and newsletter, I keep the meetups running: rhythm, format, hosting, venues, and communication with other core organizers. The goal is reliable peer learning in the room, not marketing.",
  },
];

function categoryProjects(projects: Project[], category: ProjectCategory) {
  return projects.filter(
    (project) =>
      project.category === category && project.slug !== aylesimDevicesSlug
  );
}

function columnCarouselProjects(
  projects: Project[],
  columnId: ProjectCategory
) {
  if (columnId === "community") {
    return [];
  }
  return categoryProjects(projects, columnId);
}

const BADGE_STYLES: Record<
  FeaturedCard["badgeVariant"],
  {
    stripe: string;
    badgeBg: string;
    pillClass: string;
    chipClass: string;
    eyebrow: string;
  }
> = {
  award: {
    stripe: "bg-(--accent)",
    badgeBg: "bg-(--accent)/8",
    pillClass: "border-(--accent)/45 bg-(--accent)/12 text-(--accent)",
    chipClass: "border-(--accent)/35 bg-(--accent)/6 text-(--foreground)",
    eyebrow: "Award",
  },
  collaboration: {
    stripe: "bg-(--role-web)",
    badgeBg: "bg-(--role-web)/8",
    pillClass: "border-(--role-web)/45 bg-(--role-web)/12 text-(--role-web)",
    chipClass: "border-(--role-web)/35 bg-(--role-web)/6 text-(--foreground)",
    eyebrow: "Client",
  },
  publisher: {
    stripe: "bg-(--role-audio)",
    badgeBg: "bg-(--role-audio)/8",
    pillClass:
      "border-(--role-audio)/45 bg-(--role-audio)/12 text-(--role-audio)",
    chipClass:
      "border-(--role-audio)/35 bg-(--role-audio)/6 text-(--foreground)",
    eyebrow: "Published by",
  },
};

const BADGE_CLIENT_SEPARATOR = /\s*[·×]\s*/;

function parseBadgeClients(label: string): string[] {
  return label
    .split(BADGE_CLIENT_SEPARATOR)
    .map((part) => part.trim())
    .filter(Boolean);
}

function FeaturedWorkBadge({
  card,
  badge,
}: {
  card: FeaturedCard;
  badge: (typeof BADGE_STYLES)[FeaturedCard["badgeVariant"]];
}) {
  return (
    <div
      className={`border-(--index-divider)/50 border-b px-5 py-4 ${badge.badgeBg}`}
    >
      <span
        className={`inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${badge.pillClass}`}
      >
        {badge.eyebrow}
      </span>
      {card.badgeVariant === "award" ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span
            className={`border px-2.5 py-1 font-mono text-[11px] leading-snug tracking-wide ${badge.chipClass}`}
          >
            <span className="text-(--accent)">{primaryAward.headline}</span>
            <span className="text-(--text-muted)">
              {" "}
              · {primaryAward.title} · {primaryAward.year}
            </span>
          </span>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {parseBadgeClients(card.badgeLabel).map((client) => (
            <span
              className={`border px-2.5 py-1 font-mono text-[11px] leading-snug tracking-wide ${badge.chipClass}`}
              key={client}
            >
              {client}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedWorkCard({
  card,
  index,
  onProjectClick,
}: {
  card: FeaturedCard;
  index: number;
  onProjectClick: (slug: string) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const badge = BADGE_STYLES[card.badgeVariant];

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(3rem)",
        transition: `opacity 0.65s ease ${index * 120}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms`,
      }}
    >
      <button
        className="fw-card group flex w-full cursor-pointer flex-col overflow-hidden border border-(--index-divider) border-t-0 text-left"
        onClick={() => onProjectClick(card.slug)}
        style={{ "--card-rotation": card.rotation } as React.CSSProperties}
        type="button"
      >
        <div
          aria-hidden
          className={`h-[2px] w-full shrink-0 ${badge.stripe}`}
        />
        <FeaturedWorkBadge badge={badge} card={card} />

        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            alt={card.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={card.cover}
          />
        </div>

        <div className="flex flex-1 flex-col p-5 pt-4">
          <p className="text-xl leading-snug tracking-tight transition-colors group-hover:text-(--accent) md:text-2xl">
            {card.title}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                className="border border-(--index-divider) px-2 py-0.5 font-mono text-(--text-muted) text-[9px] uppercase tracking-widest"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 text-(--text-muted) text-sm leading-relaxed">
            {card.description}
          </p>
          <span className="mt-4 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors group-hover:text-(--foreground)">
            View project →
          </span>
        </div>
      </button>
    </div>
  );
}

function ProjectListBadgeItem({
  badge,
  hidePrefix,
  className,
}: {
  badge: ProjectListBadge;
  hidePrefix?: boolean;
  className?: string;
}) {
  const linkClass =
    "font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)/55";
  const label = <>↗ {badge.label.toUpperCase()}</>;

  return (
    <span
      className={`flex flex-col ${hidePrefix ? "-mt-2" : "gap-0.5"} ${className ?? ""}`}
    >
      {badge.prefix && !hidePrefix ? (
        <span className="font-mono text-(--text-muted) text-[10px] normal-case tracking-wide">
          {badge.prefix}
        </span>
      ) : null}
      {badge.url ? (
        <a
          className={linkClass}
          href={badge.url}
          onClick={(e) => e.stopPropagation()}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      ) : (
        <span className={linkClass}>{label}</span>
      )}
    </span>
  );
}

function CommunityHighlight({
  onProjectClick,
}: {
  onProjectClick: (slug: string) => void;
}) {
  const styles = ROLE_STYLES.community;
  return (
    <div className="micro-divider-top pt-3">
      <div className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-3 py-4 first:bg-none md:grid-cols-[1fr_auto_1rem]">
        <div className="flex flex-col gap-2">
          <a
            className="text-(--foreground) text-lg leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-xl"
            href={maxBerlinNetworkUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Max Berlin Network
          </a>
          <p className="max-w-md text-(--text-muted) text-sm leading-relaxed md:text-base">
            Co-founder · curator · ongoing meetup series
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
              href={maxBerlinNetworkUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              ↗ maxberlin.network
            </a>
            <button
              className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
              onClick={() => onProjectClick(maxBerlinCommunitySlug)}
              type="button"
            >
              Site case study →
            </button>
            <a
              className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
              href="/about"
            >
              Meetups & format →
            </a>
          </div>
        </div>
        <span
          className={`hidden font-mono text-[10px] uppercase tracking-widest md:block ${styles.labelClass}`}
        >
          2025–ongoing
        </span>
        <span className="text-right text-(--text-muted) text-sm opacity-35 md:col-start-3">
          ↗
        </span>
      </div>
    </div>
  );
}

function ProjectLink({
  project,
  onProjectClick,
  onHover,
}: {
  project: Project;
  onProjectClick: (slug: string) => void;
  onHover?: (slug: string | null) => void;
}) {
  const meta = [
    project.year,
    project.menuLabel?.toLowerCase() === "max4live"
      ? undefined
      : project.menuLabel,
  ]
    .filter(Boolean)
    .join(" / ");
  const hasAward = projectHasNationalArtsAward(project);
  const isPrimaryAudio = PRIMARY_AUDIO_SLUGS.has(project.slug);
  return (
    <button
      aria-label={`Open ${project.title}`}
      className="group micro-divider-top grid w-full grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 py-4 text-left first:bg-none md:grid-cols-[1fr_auto_1rem]"
      onClick={() => onProjectClick(project.slug)}
      onMouseEnter={() => onHover?.(project.slug)}
      onMouseLeave={() => onHover?.(null)}
      type="button"
    >
      <span className="flex flex-col gap-1">
        <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span
            className={`leading-snug tracking-tight transition-colors group-hover:text-(--accent) ${
              isPrimaryAudio
                ? "text-(--foreground) text-lg md:text-xl"
                : "text-(--foreground) text-base"
            }`}
          >
            {project.title}
          </span>
          {project.listTagline ? (
            <span className="text-(--text-muted) text-xs leading-snug md:text-sm">
              {project.listTagline}
            </span>
          ) : null}
        </span>
        <ProjectTags
          category={project.category}
          className="mt-0.5"
          tags={project.tags}
        />
        {project.listBadges.length > 0 && (
          <span className="mt-0.5 flex flex-col gap-2.5">
            {project.listBadges.map((badge, index) => {
              const previous = project.listBadges[index - 1];
              const hidePrefix =
                index > 0 &&
                Boolean(badge.prefix) &&
                badge.prefix === previous?.prefix;
              return (
                <ProjectListBadgeItem
                  badge={badge}
                  hidePrefix={hidePrefix}
                  key={badge.url ?? badge.label}
                />
              );
            })}
          </span>
        )}
        {project.workScope && project.workScope !== "commercial" && (
          <span className="font-mono text-(--foreground)/45 text-[10px] uppercase tracking-widest">
            {project.workScope}
          </span>
        )}
        {hasAward && (
          <span className="font-mono text-(--accent) text-[10px] uppercase tracking-widest">
            MUR · National Arts Award · 1st prize
          </span>
        )}
      </span>
      <span className="hidden font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:block">
        {meta}
      </span>
      <span className="text-right text-(--text-muted) text-sm opacity-35 transition-opacity group-hover:opacity-100">
        →
      </span>
      <span className="col-span-2 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:hidden">
        {meta}
      </span>
    </button>
  );
}

function PracticeColumnSection({
  column,
  items,
  carouselProjects,
  onProjectClick,
}: {
  column: CategoryColumn;
  items: Project[];
  carouselProjects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const styles = ROLE_STYLES[column.id];
  const isWebInteractive = column.id === "web-interactive";
  const showRotator = column.id !== "community";

  const headerText = (
    <>
      <p
        className={`mb-5 font-mono text-[11px] uppercase tracking-widest ${styles.labelClass}`}
      >
        {CATEGORY_LABELS[column.id]}
      </p>
      <p className="mb-4 max-w-md text-2xl leading-[1.15] tracking-tight md:text-3xl">
        {column.eyebrow}
      </p>
      <p className="max-w-md text-(--text-muted) text-sm leading-relaxed">
        {column.description}
      </p>
      {column.proof ? (
        <p className="mt-4 max-w-md text-(--text-muted) text-sm leading-snug">
          {column.proof}
        </p>
      ) : null}
      {column.stack ? (
        <p className="mt-5 max-w-md font-mono text-(--text-muted) text-[10px] uppercase leading-relaxed tracking-widest">
          {column.stack}
        </p>
      ) : null}
      {column.resumeHref ? (
        <a
          className="mt-4 inline-block font-mono text-(--role-web) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
          download
          href={column.resumeHref}
        >
          {resumeLabel} ↗
        </a>
      ) : null}
    </>
  );

  const rotator = showRotator ? (
    <CategoryProjectRotator
      activeSlug={hoveredSlug}
      className={isWebInteractive ? "mt-8 md:mt-0" : undefined}
      layout={isWebInteractive ? "aside" : "stacked"}
      onProjectClick={onProjectClick}
      projects={carouselProjects}
    />
  ) : null;

  const headerBlock = isWebInteractive ? (
    <div className="grid gap-8 md:grid-cols-[0.52fr_0.48fr] md:items-center md:gap-x-16 md:gap-y-0">
      <div className={`min-w-0 border-t-2 pt-5 ${styles.borderClass}`}>
        {headerText}
      </div>
      <div className="flex w-full items-center justify-center md:px-6 md:pt-5 lg:px-10">
        {rotator}
      </div>
    </div>
  ) : (
    <div className={`border-t-2 pt-5 ${styles.borderClass}`}>
      {headerText}
      {rotator}
    </div>
  );

  const listBlock = (
    <div
      className={`micro-divider-top pt-3 ${isWebInteractive ? "mt-10" : ""}`}
    >
      {column.id === "community" ? (
        <CommunityHighlight onProjectClick={onProjectClick} />
      ) : null}
      {items.map((project) => (
        <ProjectLink
          key={project.slug}
          onHover={setHoveredSlug}
          onProjectClick={onProjectClick}
          project={project}
        />
      ))}
    </div>
  );

  if (isWebInteractive) {
    return (
      <div
        className="border-(--index-divider) border-b border-dotted py-14 md:py-20"
        id={column.id}
      >
        {headerBlock}
        {listBlock}
      </div>
    );
  }

  return (
    <div
      className="grid gap-10 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.52fr_0.48fr] md:gap-16 md:py-20"
      id={column.id}
    >
      {headerBlock}
      {listBlock}
    </div>
  );
}

export function HomeIdentity({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const carouselByColumn = useMemo(
    () =>
      Object.fromEntries(
        PRACTICE_COLUMNS.map((column) => [
          column.id,
          columnCarouselProjects(projects, column.id),
        ])
      ) as Record<ProjectCategory, Project[]>,
    [projects]
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-8">
      <section className="grid items-start gap-10 border-(--index-divider) border-b border-dotted py-12 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div>
          <p className="mb-5 font-mono text-xs tracking-widest">
            <span className="text-(--accent) uppercase">
              Alessandro Miracapillo /{" "}
            </span>
            <span className="text-(--accent)">aylesim</span>
            <span className="text-(--text-muted)"> · </span>
            <span className="text-(--text-muted) uppercase">Berlin</span>
          </p>
          <h1 className="max-w-5xl font-normal text-4xl leading-[0.98] tracking-tight md:text-7xl">
            I design and program systems where sound, interfaces, and human
            behavior meet.
          </h1>
        </div>
        <p className="max-w-xl text-(--text-muted) text-base leading-relaxed md:self-end md:text-lg">
          I design and program stable digital systems where code, sound, and
          space converge. My practice bridges the rigor of{" "}
          <strong className="font-normal text-(--foreground)">
            software engineering
          </strong>{" "}
          with the research of{" "}
          <strong className="font-normal text-(--foreground)">media art</strong>
          . I develop complex frontend architectures (React, TypeScript),
          applying the same obsession for performance, latency, and state
          management that I use to engineer spatial installations, generative
          systems, and audio tools (Max for Live) used by thousands of
          musicians. Whether building a web ecosystem or a sensory interaction,
          my goal is to govern technical complexity to create solid logical and
          aesthetic behaviors.
        </p>
      </section>

      <section className="border-(--index-divider) border-b border-dotted py-14 md:py-20">
        <p className="mb-10 font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          Selected works
        </p>
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_CARDS.map((card, index) => (
            <FeaturedWorkCard
              card={card}
              index={index}
              key={card.slug}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>
      </section>

      <section className="border-(--index-divider) border-b border-dotted py-14 md:py-24">
        <p className="mb-10 font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          How I work
        </p>
        <div className="grid items-stretch gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_I_WORK_CARDS.map((card, index) => (
            <HowIWorkCardItem card={card} index={index} key={card.title} />
          ))}
        </div>
      </section>

      <section className="flex flex-col">
        {PRACTICE_COLUMNS.map((column) => (
          <PracticeColumnSection
            carouselProjects={carouselByColumn[column.id]}
            column={column}
            items={categoryProjects(projects, column.id)}
            key={column.id}
            onProjectClick={onProjectClick}
          />
        ))}
      </section>

      <section className="grid gap-8 border-(--index-divider) border-b border-dotted py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
        <div>
          <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
            Recognition
          </p>
          <p className="mt-4 max-w-xs text-(--text-muted) text-sm leading-relaxed">
            State-backed award for installation work, plus press on audio tools.
          </p>
        </div>
        <div className="space-y-10">
          <div className="border-(--accent)/35 border-t-2 pt-5">
            <p className="mb-2 font-mono text-(--accent) text-[10px] uppercase tracking-widest">
              {primaryAward.issuer}
            </p>
            <p className="text-2xl leading-snug tracking-tight md:text-3xl">
              {primaryAward.headline}
            </p>
            <p className="mt-2 max-w-2xl text-(--text-muted) text-base leading-relaxed">
              {primaryAward.title}, {primaryAward.subtitle} ({primaryAward.year}
              ).
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                className="font-mono text-(--foreground) text-[10px] uppercase tracking-widest transition-colors hover:text-(--accent)"
                onClick={() => onProjectClick(primaryAward.projectSlug)}
                type="button"
              >
                Awarded work:{" "}
                {projects.find((p) => p.slug === primaryAward.projectSlug)
                  ?.title ?? "Please Set a Password"}{" "}
                →
              </button>
              <a
                className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
                href={primaryAward.externalHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {primaryAward.externalLabel} ↗
              </a>
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
              Press
            </p>
            {pressMentions.map((mention) => {
              const related = mention.projectSlug
                ? projects.find((p) => p.slug === mention.projectSlug)
                : undefined;
              return (
                <div
                  className="micro-divider-top grid gap-2 py-4 first:bg-none md:grid-cols-[1fr_auto]"
                  key={mention.href}
                >
                  <div>
                    <a
                      className="text-base leading-snug tracking-tight transition-colors hover:text-(--accent)"
                      href={mention.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="text-(--foreground)">
                        {mention.outlet}
                      </span>
                      <span className="text-(--text-muted)">
                        {" "}
                        , {mention.title}
                      </span>
                    </a>
                    {related && (
                      <button
                        className="mt-2 block font-mono text-(--text-muted) text-[10px] uppercase tracking-widest transition-colors hover:text-(--foreground)"
                        onClick={() => onProjectClick(related.slug)}
                        type="button"
                      >
                        Related project: {related.title} →
                      </button>
                    )}
                  </div>
                  {mention.year && (
                    <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest md:text-right">
                      {mention.year}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-14 md:grid-cols-[0.45fr_1fr] md:py-20">
        <p className="font-mono text-(--text-muted) text-xs uppercase tracking-widest">
          Contact
        </p>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="text-(--text-muted) text-sm leading-relaxed">
              {contactAvailability}
            </p>
            <a
              className="text-2xl leading-snug tracking-tight transition-colors hover:text-(--accent) md:text-4xl"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <a
              className="border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
              download
              href={resumeHref}
            >
              {resumeLabel}
            </a>
            {contactLinks.map((link) => (
              <a
                className="border-(--index-divider) border-t border-dotted py-3 text-(--text-muted) text-sm transition-colors hover:text-(--foreground)"
                href={link.href}
                key={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
