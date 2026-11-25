import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaterialIcon from '../components/MaterialIcon';
import SectionHeading from '../components/SectionHeading';
import { PROCESS } from '../data/content';

// Scrolling through the section runs the pipeline: each step's bar fills in turn and its status
// moves from Queued to In progress to Done. Without motion every step simply reads Done.
function usePipeline(list) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const steps = [...list.current.children];
      const bars = steps.map((step) => gsap.quickSetter(step.querySelector('.step-bar'), 'scaleX'));
      const update = (progress) => {
        steps.forEach((step, i) => {
          const fill = Math.min(Math.max(progress * steps.length - i, 0), 1);
          bars[i](fill);
          const state = fill >= 1 ? 'done' : fill > 0 ? 'active' : 'queued';
          if (step.dataset.state !== state) step.dataset.state = state;
        });
      };
      const trigger = ScrollTrigger.create({
        trigger: list.current,
        start: 'top 75%',
        end: 'bottom 45%',
        onUpdate: (self) => update(self.progress),
      });
      update(trigger.progress);
      return () => steps.forEach((step) => (step.dataset.state = 'done'));
    });
    return () => mm.revert();
  }, [list]);
}

export default function Process() {
  const list = useRef(null);
  usePipeline(list);

  return (
    <section id="process" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Process" title="From architecture to deployment">
          A four-stage pipeline with a live staging build at every step, so you see real progress instead of status
          updates.
        </SectionHeading>

        <ol ref={list} className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <li key={step.title} data-state="done" className="group reveal relative pt-6">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-line" />
              <span aria-hidden="true" className="step-bar absolute inset-x-0 top-0 h-0.5 origin-left rounded-full bg-accent" />
              <div className="flex items-center justify-between">
                <p className="label">0{i + 1}</p>
                <span className="label flex items-center gap-1.5">
                  <span className="hidden group-data-[state=queued]:inline">Queued</span>
                  <span className="hidden items-center gap-1.5 text-accent group-data-[state=active]:inline-flex">
                    <span className="size-1.5 rounded-full bg-accent" />
                    In progress
                  </span>
                  <span className="hidden items-center gap-1 text-ok group-data-[state=done]:inline-flex">
                    <MaterialIcon name="check" size={14} />
                    Done
                  </span>
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{step.title}</h3>
              <p className="mt-3 text-sm text-soft">{step.body}</p>
              <p className="label mt-4">{step.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
