import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "motion/react";

interface Props {
  value: string;
  className?: string;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CounterUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const match = value.match(/([^\d]*)([\d.,]+)([^\d]*)/);

  let prefix = "";
  let numberStr = value;
  let suffix = "";

  if (match) {
    prefix = match[1];
    numberStr = match[2];
    suffix = match[3];
  }

  const numValue = parseFloat(numberStr.replace(/,/g, ''));
  // A bare four-digit year (e.g. "2023") is shown as-is; counting it up reads oddly.
  const isYear = /^\d{4}$/.test(value.trim()) && numValue >= 1900 && numValue <= 2100;
  const isNumber = !isNaN(numValue) && match !== null && !isYear;

  // Keep the source formatting: same decimals, and thousands separators if it had them
  const decimals = numberStr.split('.')[1]?.length || 0;
  const useGrouping = numberStr.includes(',');
  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    });

  // Start from 60% of the target value (closer to the target)
  const startValue = isNumber ? numValue * 0.6 : 0;

  const motionValue = useMotionValue(startValue);

  // The final value is what renders (below), so it's correct without JS and with
  // reduced motion. Otherwise, swap in the start value once hydrated and count up.
  useEffect(() => {
    if (!isNumber || prefersReducedMotion()) return;

    if (ref.current) {
      ref.current.textContent = `${prefix}${format(startValue)}${suffix}`;
    }
    return motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${format(latest)}${suffix}`;
      }
    });
  }, [motionValue, isNumber, prefix, suffix, startValue, decimals, useGrouping]);

  useEffect(() => {
    if (isInView && isNumber && !prefersReducedMotion()) {
      animate(motionValue, numValue, {
        duration: 1.5, // 1.5 seconds duration
        ease: "linear", // linear animation
      });
    }
  }, [isInView, isNumber, numValue, motionValue]);

  return (
    <span className={className} ref={ref}>
      {value}
    </span>
  );
}
