import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActingFrontProps = { n: string; t: string; d: string; points?: string[] };

export function ActingFront({ n, t, d, points }: ActingFrontProps) {
  const [pinned, setPinned] = useState(false);
  const [preview, setPreview] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const open = pinned || (preview && !dismissed);
  const descriptionId = `acting-front-${n}`;

  return (
    <li className="acting-front" data-open={open}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") { setPreview(true); setDismissed(false); } }}
      onPointerLeave={() => { setPreview(false); setDismissed(false); }}>
      <Button variant="ghost" className="acting-front-trigger" aria-expanded={open} aria-controls={descriptionId}
        onClick={() => { setPinned(!pinned); setDismissed(pinned); }}
        onKeyDown={(event) => { if (event.key === "Escape") { setPinned(false); setPreview(false); } }}>
        <span className="acting-front-number tabular-nums">{n}</span>
        <span className="acting-front-title">{t}</span>
        {open ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
      </Button>
      <div id={descriptionId} className="acting-front-description" aria-hidden={!open}>
        <p>{d}</p>
        {points && <ol className="mt-2 space-y-1.5">
          {points.map((point, index) => <li key={point} className="flex gap-2">
            <span className="acting-front-number font-semibold tabular-nums">{index + 1}</span>
            <span>{point}</span>
          </li>)}
        </ol>}
      </div>
    </li>
  );
}