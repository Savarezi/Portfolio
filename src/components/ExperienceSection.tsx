import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data';

export default function ExperienceSection() {
  return (
    <div className="space-y-12 animate-fade-in" id="experience-section-container">
      {/* Header element with description */}
      <div className="space-y-2 border-b border-zinc-800 pb-6">
        <h2 className="font-display font-bold text-3xl text-white">
          Experiência Profissional
        </h2>
        <p className="text-zinc-400 font-sans text-sm">
          Minha trajetória na interseção de engenharia de software pura, inteligência artificial aplicada e negócios corporativos.
        </p>
      </div>

      {/* Structured Timeline container */}
      <div className="relative border-l-2 border-zinc-800 ml-3 md:ml-6 space-y-12 py-2">
        {EXPERIENCES.map((exp, index) => {
          return (
            <div key={index} className="relative pl-8 md:pl-10 group" id={`experience-timeline-item-${index}`}>
              {/* Pulsing indicator bullet icon in vertical track */}
              <div className="absolute -left-[11px] top-6 h-5 w-5 rounded-full bg-[#0b0f19] border-2 border-purple-500 z-10 flex items-center justify-center group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 group-hover:bg-purple-400 animate-pulse" />
              </div>

              {/* Core card layout of individual role */}
              <div className="bg-[#0b0f19]/60 border border-[#1e293b] rounded-2xl p-6 md:p-8 space-y-4 hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.02)] transition-all duration-300">
                {/* Meta details alignment */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-lg md:text-xl text-white tracking-tight group-hover:text-purple-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-purple-400 font-medium text-sm font-sans flex items-center gap-1.5">
                      <span>{exp.company}</span>
                    </p>
                  </div>
                  
                  {/* Period Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-950/80 text-zinc-300 font-mono text-xs rounded-full border border-zinc-800 self-start md:self-center">
                    <Calendar className="h-3.5 w-3.5 text-purple-400" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                {/* Role generic description */}
                <p className="text-zinc-300 text-sm leading-relaxed font-sans border-b border-zinc-800/60 pb-3">
                  {exp.description}
                </p>

                {/* Achievements block split into neat bullet highlights with micro checks */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    Principais Conquistas & Responsabilidades
                  </span>
                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-400 text-xs md:text-sm leading-relaxed">
                        <CheckCircle2 className="h-4.5 w-4.5 text-purple-500/60 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
