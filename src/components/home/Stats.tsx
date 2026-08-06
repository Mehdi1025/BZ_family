"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data/mock";

function Counter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(value);
      return;
    }
    const duration = 2000;
    const startTime = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return (
    <>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div ref={ref} className="container-bz">
        <div className="grid divide-y divide-line lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group px-0 py-10 first:pt-0 last:pb-0 lg:px-10 lg:py-0 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-display text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tracking-tight text-encre transition-colors group-hover:text-primary">
                <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="mt-4 max-w-[180px] text-sm leading-snug text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
