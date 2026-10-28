import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavChild {
  name: string;
  url: string;
}

interface NavItem {
  name: string;
  url: string;
  children?: NavChild[];
}

interface Props {
  items: NavItem[];
  currentPath: string;
}

const spring = { type: 'spring' as const, stiffness: 350, damping: 30 };
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' as const } },
};

export default function DropdownNav({ items, currentPath }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [offX, setOffX] = useState(0);
  const [panelH, setPanelH] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const strip = currentPath.replace(/\/$/, '') || '/';
  const isActive = (u: string) => u !== '#' && strip === u.replace(/\/$/, '');
  const inSection = (item: NavItem) =>
    isActive(item.url) || !!item.children?.some(c => isActive(c.url));

  const measure = useCallback((i: number) => {
    const w = wrapRef.current;
    const el = itemRefs.current[i];
    if (!w || !el) return;
    const wr = w.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setOffX(er.left + er.width / 2 - wr.left);
  }, []);

  const enter = useCallback((i: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveIdx(i);
    if (items[i]?.children) {
      measure(i);
    }
  }, [items, measure]);

  const leave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setActiveIdx(null), 5);
  }, []);

  const stay = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => {
    const onResize = () => { if (activeIdx !== null) measure(activeIdx); };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, [activeIdx, measure]);

  useLayoutEffect(() => {
    if (activeIdx !== null && contentRef.current) {
      setPanelH(contentRef.current.scrollHeight);
    }
  }, [activeIdx]);

  const active = activeIdx !== null ? items[activeIdx] : null;

  return (
    <div ref={wrapRef} className="relative mx-auto hidden lg:block" onMouseLeave={leave}>
      <ul className="flex items-center">
        {items.map((item, i) => (
          <li
            key={item.name}
            ref={el => { itemRefs.current[i] = el; }}
            onMouseEnter={() => enter(i)}
            className="relative"
          >
            <a
              href={item.url}
              className={`flex items-center gap-0.5 px-4 xl:px-5.5 py-5 text-[15px] leading-none font-medium whitespace-nowrap transition-colors duration-200 ${
                inSection(item) ? 'text-white' : 'text-[#eee]'
              } ${
                activeIdx !== null
                  ? activeIdx === i
                    ? 'text-white!'
                    : 'text-white/50!'
                  : 'hover:text-white'
              }`}
            >
              {item.name}
              {item.children && (
                <svg
                  className="w-4 h-4 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div
        style={{
          position: 'absolute',
          top: '100%',
          zIndex: 10,
          left: 0,
        }}
      >
        <AnimatePresence>
          {activeIdx !== null && active?.children && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 4, x: offX }}
              animate={{ opacity: 1, y: 0, x: offX }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
              transition={{
                x: spring,
                opacity: { duration: 0.15, ease },
                y: { duration: 0.15, ease },
              }}
              style={{ translateX: '-50%' }}
              onMouseEnter={stay}
            >
              <div className="flex justify-center" style={{ marginBottom: -1 }}>
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: '8px solid #fff',
                  }}
                />
              </div>

              <motion.div
                className="min-w-48 overflow-hidden bg-white shadow-2xl shadow-black/30 group/ddmenu"
                initial={{ height: 0 }}
                animate={{ height: panelH }}
                transition={{ duration: 0.25, ease }}
              >
                <div ref={contentRef}>
                  <motion.div
                    key={activeIdx}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {active.children.map((child, ci, arr) => (
                      <motion.div key={child.name} variants={itemVariants}>
                        <a
                          href={child.url}
                          className={`block whitespace-nowrap px-5 py-2 text-[14px] font-medium transition-colors duration-200 ${
                            ci === 0 ? 'pt-4' : ''
                          } ${ci === arr.length - 1 ? 'pb-4' : ''} ${
                            isActive(child.url)
                              ? 'text-black'
                              : 'text-dark group-hover/ddmenu:text-black/50 hover:text-black!'
                          }`}
                        >
                          {child.name}
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
