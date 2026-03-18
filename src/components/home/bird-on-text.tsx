"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SITTING = [
  "/sitting/uccello-01.svg",
  "/sitting/uccello-07.svg",
  "/sitting/uccello-09.svg",
];
const FLYING = [
  "/flying/uccello-02.svg",
  "/flying/uccello-05.svg",
  "/flying/uccello-06.svg",
  "/flying/uccello-08.svg",
];
const SITTING_OPACITY = 0.5;
const RETURN_DELAY = 2500;
const FLIGHT_DURATION = 1200;
const RETURN_DURATION = 1200;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomFlyOffset() {
  const angle = Math.random() * Math.PI * 0.8 + Math.PI * 0.1;
  const dist = 80 + Math.random() * 60;
  return {
    x: Math.cos(angle) * dist,
    y: -Math.sin(angle) * dist - 40,
  };
}

type Phase = "sitting" | "flying" | "returning";
type BirdSize = "sm" | "md" | "lg";

const sizeClasses: Record<BirdSize, string> = {
  sm: "absolute -top-4 left-1/2 h-12 w-12 -translate-x-1/2 md:-top-6 md:h-16 md:w-16",
  md: "absolute -top-5 left-1/2 h-16 w-16 -translate-x-1/2 md:-top-8 md:h-20 md:w-20",
  lg: "absolute -top-6 left-1/2 h-20 w-20 -translate-x-1/2 md:-top-10 md:h-28 md:w-28",
};

type TriggerFlyOptions = {
  setFlyOffset: (v: { x: number; y: number }) => void;
  setBirdSrc: (v: string) => void;
  setPhase: (v: Phase) => void;
  returnTimerRef: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  >;
  sitTimerRef: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  >;
};

function triggerFlyLogic(opts: TriggerFlyOptions) {
  if (opts.returnTimerRef.current) {
    clearTimeout(opts.returnTimerRef.current);
    opts.returnTimerRef.current = undefined;
  }
  if (opts.sitTimerRef.current) {
    clearTimeout(opts.sitTimerRef.current);
    opts.sitTimerRef.current = undefined;
  }
  opts.setFlyOffset(randomFlyOffset());
  opts.setBirdSrc(pick(FLYING));
  opts.setPhase("flying");
}

export default function BirdOnText({
  children,
  size = "md",
  triggerFly,
  flyDelay = 0,
  topOffset = 0,
}: {
  children: React.ReactNode;
  size?: BirdSize;
  triggerFly?: boolean;
  flyDelay?: number;
  topOffset?: number;
}) {
  const [phase, setPhase] = useState<Phase>("sitting");
  const [mounted, setMounted] = useState(false);
  const [birdSrc, setBirdSrc] = useState(SITTING[0]);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [flyOffset, setFlyOffset] = useState({ x: 80, y: -100 });
  const returnTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const sitTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const flyDelayRef = useRef<ReturnType<typeof setTimeout>>();
  const hasFlownRef = useRef(false);

  useEffect(() => {
    setBirdSrc(pick(SITTING));
    setOffsetX((Math.random() - 0.5) * 24);
    setOffsetY((Math.random() - 0.5) * 8 + topOffset);
    setMounted(true);
  }, [topOffset]);

  useEffect(() => {
    if (!(triggerFly && mounted)) {
      return;
    }
    flyDelayRef.current = setTimeout(() => {
      flyDelayRef.current = undefined;
      hasFlownRef.current = true;
      triggerFlyLogic({
        setFlyOffset,
        setBirdSrc,
        setPhase,
        returnTimerRef,
        sitTimerRef,
      });
    }, flyDelay);
    return () => {
      if (flyDelayRef.current) {
        clearTimeout(flyDelayRef.current);
        flyDelayRef.current = undefined;
      }
    };
  }, [triggerFly, mounted, flyDelay]);

  const prevTriggerRef = useRef(triggerFly);
  useEffect(() => {
    const wasFlying = prevTriggerRef.current;
    prevTriggerRef.current = triggerFly;
    if (triggerFly || !mounted || !wasFlying || !hasFlownRef.current) {
      return;
    }
    returnTimerRef.current = setTimeout(() => {
      returnTimerRef.current = undefined;
      setBirdSrc(pick(FLYING));
      setPhase("returning");
      sitTimerRef.current = setTimeout(() => {
        sitTimerRef.current = undefined;
        hasFlownRef.current = false;
        setBirdSrc(pick(SITTING));
        setPhase("sitting");
      }, RETURN_DURATION);
    }, RETURN_DELAY);
    return () => {
      if (returnTimerRef.current) {
        clearTimeout(returnTimerRef.current);
        returnTimerRef.current = undefined;
      }
    };
  }, [triggerFly, mounted]);

  const handleMouseEnter = () => {
    if (triggerFly !== undefined) {
      return;
    }
    triggerFlyLogic({
      setFlyOffset,
      setBirdSrc,
      setPhase,
      returnTimerRef,
      sitTimerRef,
    });
  };

  const handleMouseLeave = () => {
    if (triggerFly !== undefined) {
      return;
    }
    returnTimerRef.current = setTimeout(() => {
      returnTimerRef.current = undefined;
      setBirdSrc(pick(FLYING));
      setPhase("returning");
      sitTimerRef.current = setTimeout(() => {
        sitTimerRef.current = undefined;
        setBirdSrc(pick(SITTING));
        setPhase("sitting");
      }, RETURN_DURATION);
    }, RETURN_DELAY);
  };

  useEffect(
    () => () => {
      if (returnTimerRef.current) {
        clearTimeout(returnTimerRef.current);
      }
      if (sitTimerRef.current) {
        clearTimeout(sitTimerRef.current);
      }
    },
    []
  );

  const perch = `translate(-50%, 0) translate(${offsetX}px, ${offsetY}px)`;
  const fly = `translate(-50%, 0) translate(${flyOffset.x}px, ${flyOffset.y}px)`;

  const getTransition = () => {
    if (phase === "flying") {
      return `transform ${FLIGHT_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${FLIGHT_DURATION}ms ease-out`;
    }
    if (phase === "returning") {
      return `transform ${RETURN_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${RETURN_DURATION}ms ease-out`;
    }
    return "transform 0.6s ease-out";
  };

  const birdStyle = {
    transform: phase === "flying" ? fly : perch,
    opacity: phase === "flying" ? 0 : SITTING_OPACITY,
    transition: getTransition(),
  };

  if (!mounted) {
    return <span className="relative inline-block">{children}</span>;
  }

  const sizePxMap: Record<BirdSize, number> = { sm: 48, md: 64, lg: 80 };
  const sizePx = sizePxMap[size];

  const content = (
    <>
      <span className={sizeClasses[size]} style={birdStyle}>
        <Image
          alt=""
          className="h-full w-full object-contain"
          height={sizePx}
          src={birdSrc}
          width={sizePx}
        />
      </span>
      {children}
    </>
  );

  if (triggerFly !== undefined) {
    return <span className="relative inline-block">{content}</span>;
  }

  return (
    <button
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      {content}
    </button>
  );
}
