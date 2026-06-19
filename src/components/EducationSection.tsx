import React from 'react';
import { Award, GraduationCap, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { EDUCATION_CERTS } from '../data';

export default function EducationSection() {
  return (
    <div className="space-y-12 animate-fade-in" id="academic-education-section">
      {/* Header details */}
      <div className="space-y-2 border-b border-zinc-800 pb-6">
        <h2 className="font-display font-bold text-3xl text-white">
          Formações & Certificações
        </h2>
        <p className="text-zinc-400 font-sans text-sm">
          Cursos complementares, proficiência técnica e formações estruturantes na área de engenharia de software e inteligência artificial.
        </p>
      </div>

      {/* Divided into two layout grids or linear timeline tracks */}
      <div className="relative border-l-2 border-zinc-800 ml-3 md:ml-6 space-y-8 py-2" id="education-certifications-track">
        {EDUCATION_CERTS.map((cert, index) => {
          const isCert = cert.type === 'certification';
          return (
            <div key={index} className="relative pl-8 md:pl-10 group" id={`education-timeline-item-${index}`}>
              {/* Timeline Bullet shape */}
              <div className="absolute -left-[11px] top-4 h-5 w-5 rounded-full bg-[#0b0f19] border-2 border-purple-500 z-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {isCert 
                  ? <Award className="h-3 w-3 text-purple-400" /> 
                  : <GraduationCap className="h-3 w-3 text-purple-400" />
                }
              </div>

              {/* Central Information card */}
              <div className="bg-[#0b0f19]/60 border border-[#1e293b] rounded-2xl p-5 hover:border-purple-500/20 transition-all duration-350">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border
                      ${isCert 
                        ? 'bg-purple-950/20 text-purple-400 border-purple-500/10' 
                        : 'bg-emerald-950/20 text-emerald-400 border-emerald-500/10'
                      }`}
                    >
                      {isCert ? 'Certificação Técnica' : 'Formação Acadêmica'}
                    </span>
                    <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-purple-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-zinc-400 text-sm font-sans">
                      {cert.institution}
                    </p>
                  </div>

                  {/* Year badge */}
                  <div className="flex items-center gap-1.5 self-start md:self-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-950/80 text-zinc-300 font-mono text-xs rounded-lg border border-zinc-800 whitespace-nowrap">
                      <Calendar className="h-3.5 w-3.5 text-purple-400" />
                      <span>{cert.year}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Badges details */}
      <div className="bg-gradient-to-r from-purple-950/10 to-indigo-950/10 border border-purple-500/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6" id="certified-trust-box">
        <div className="p-4 bg-purple-600/10 rounded-full text-purple-400">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div className="space-y-1.5 text-center md:text-left">
          <h4 className="font-display font-bold text-white text-lg">Pronto para Desafios Corporativos</h4>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl font-sans">
            Cada credencial listada reflete de forma tangível conhecimentos validados pelo mercado na modelagem de sistemas em nuvem de alta segurança e governança inteligente.
          </p>
        </div>
      </div>
    </div>
  );
}
