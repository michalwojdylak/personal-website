/**
 * Request flow of a SageMaker Multi-Model Endpoint, drawn with the site's
 * theme colors so it follows light/dark mode. Used in the Triton post.
 */

const W = 640;
const LEFT = 170;
const RIGHT = 470;
const CENTER = W / 2;
const NODE_W = 250;

function Node({
  x,
  y,
  title,
  note,
  highlight = false,
}: {
  x: number;
  y: number;
  title: string;
  note?: string;
  highlight?: boolean;
}) {
  const h = note ? 58 : 42;
  return (
    <g>
      <rect
        x={x - NODE_W / 2}
        y={y}
        width={NODE_W}
        height={h}
        rx={8}
        strokeWidth={1.5}
        className={highlight ? "fill-card stroke-accent" : "fill-card stroke-border"}
      />
      <text
        x={x}
        y={y + (note ? 24 : 26)}
        textAnchor="middle"
        className="fill-foreground text-[14px] font-medium"
      >
        {title}
      </text>
      {note && (
        <text
          x={x}
          y={y + 44}
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[11px]"
        >
          {note}
        </text>
      )}
    </g>
  );
}

function Arrow({ points }: { points: [number, number][] }) {
  return (
    <polyline
      points={points.map((p) => p.join(",")).join(" ")}
      fill="none"
      strokeWidth={1.5}
      markerEnd="url(#mme-arrow)"
      className="stroke-muted-foreground"
    />
  );
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="fill-muted-foreground text-[12px]">
      {children}
    </text>
  );
}

export function SageMakerMmeFlow() {
  return (
    <figure className="not-prose my-8 rounded-lg border border-border bg-muted/30 p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} 498`}
        role="img"
        aria-label="SageMaker multi-model request flow: the router checks whether the target model is in GPU memory. If yes, Triton runs inference right away. If not, SageMaker downloads the model archive from S3, extracts it to NVMe, loads it into GPU memory (evicting the least recently used model if memory is full), then runs inference."
        className="mx-auto h-auto w-full max-w-xl font-sans"
      >
        <defs>
          <marker
            id="mme-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        <Node x={CENTER} y={10} title="Inference request" note="TargetModel: resnet50.tar.gz" />
        <Arrow points={[[CENTER, 68], [CENTER, 94]]} />
        <Node x={CENTER} y={96} title="SageMaker MME router" />
        <Arrow points={[[CENTER, 138], [CENTER, 164]]} />
        <Node x={CENTER} y={166} title="Model already in GPU memory?" highlight />

        {/* Branch */}
        <Arrow points={[[CENTER, 208], [CENTER, 230], [LEFT, 230], [LEFT, 266]]} />
        <Arrow points={[[CENTER, 230], [RIGHT, 230], [RIGHT, 444]]} />
        <Label x={LEFT - 112} y={252}>No - cold start</Label>
        <Label x={RIGHT + 8} y={252}>Yes - warm</Label>

        {/* Cold path */}
        <Node x={LEFT} y={268} title="Download .tar.gz from S3" />
        <Arrow points={[[LEFT, 310], [LEFT, 334]]} />
        <Node x={LEFT} y={336} title="Extract to instance NVMe" />
        <Arrow points={[[LEFT, 378], [LEFT, 402]]} />
        <Node
          x={LEFT}
          y={404}
          title="Load into GPU memory"
          note="evicts the LRU model if full"
        />
        <Arrow points={[[LEFT + NODE_W / 2, 433], [CENTER, 433], [CENTER, 467], [RIGHT - NODE_W / 2 - 2, 467]]} />

        <Node x={RIGHT} y={446} title="Run inference on Triton" highlight />
      </svg>
    </figure>
  );
}
