"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BreathingShape } from "@/components/home/breathing-shape";
import { useSoundscape } from "@/components/home/use-soundscape";
import { deserializeComposition } from "@/lib/composition-state";
import type { CompositionState } from "@/types/composition";

export default function CompositionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const [state, setState] = useState<CompositionState | null>(null);
  const [loading, setLoading] = useState(true);
  useSoundscape(state?.sound.layers ?? 0);

  useEffect(() => {
    const encoded = searchParams.get("s");
    if (encoded) {
      const decoded = deserializeComposition(encoded);
      setState(decoded);
      setLoading(false);
      return;
    }

    fetch(`/api/compositions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.state) {
          const decoded = deserializeComposition(data.state);
          setState(decoded);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <p className="font-mono text-[var(--text-muted)] text-sm">loading</p>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--background)]">
        <p className="font-mono text-[var(--text-muted)] text-sm">
          composition not found
        </p>
        <Link
          className="font-mono text-[var(--accent)] text-sm hover:underline"
          href="/"
        >
          ← create one
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)]">
      <Link
        className="absolute top-6 left-6 font-bold font-display text-[var(--foreground)] text-sm tracking-widest hover:text-[var(--accent)]"
        href="/"
      >
        AYLESIM
      </Link>
      <div className="flex items-center justify-center">
        <BreathingShape
          className="pointer-events-none"
          height={600}
          state={state.shape}
          width={600}
        />
      </div>
      <p className="mt-8 font-mono text-[var(--text-muted)] text-xs">
        questa composizione non esiste da nessuna altra parte
      </p>
    </div>
  );
}
