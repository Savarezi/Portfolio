import React from 'react';
import { Award, GraduationCap, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { EDUCATION_CERTS } from '../data';

export default function EducationSection() {
  return (
    <div className="space-y-12 animate-fade-in" id="academic-education-section">
      {/* Header details */}
      <div className="space-y-2 border-b border-[#d4af37]/30 pb-6">
        <h2 className="font-display font-bold text-3xl text-white">
          Formações & Certificações
        </h2>
        <p className="text-zinc-300 font-sans text-sm">
          Cursos complementares, proficiência técnica e formações estruturantes na área de engenharia de software e inteligência artificial.
        </p>
      </div>

      {/* Divided into two layout grids or linear timeline tracks */}
      <div className="relative border-l-2 border-[#d4af37]/35 ml-3 md:ml-6 space-y-8 py-2" id="education-certifications-track">
        {EDUCATION_CERTS.map((cert, index) => {
          const isCert = cert.type === 'certification';
          return (
            <div key={index} className="relative pl-8 md:pl-10 group" id={`education-timeline-item-${index}`}>
              {/* Timeline Bullet shape */}
              <div className="absolute -left-[11px] top-4 h-5 w-5 rounded-full bg-[#050505] border-2 border-[#d4af37] z-10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                {isCert 
                  ? <Award className="h-3 w-3 text-[#d4af37]" /> 
                  : <GraduationCap className="h-3 w-3 text-[#d4af37]" />
                }
              </div>

              {/* Central Information card */}
              <div className="bg-white/[0.07] backdrop-blur-xl border border-[#d4af37]/35 rounded-2xl p-5 hover:border-[#d4af37]/60 hover:shadow-[0_8px_25px_rgba(212,175,55,0.12)] transition-all duration-350">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border
                      ${isCert 
                        ? 'bg-[#d4af37]/15 text-[#e5c158] border-[#d4af37]/30' 
                        : 'bg-white/10 text-[#e5c158] border-[#d4af37]/30'
                      }`}
                    >
                      {isCert ? 'Certificação Técnica' : 'Formação Acadêmica'}
                    </span>
                    <h3 className="font-display font-bold text-base md:text-lg text-white group-hover:text-[#e5c158] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-zinc-300 text-sm font-sans">
                      {cert.institution}
                    </p>
                  </div>

                  {/* Year badge */}
                  <div className="flex items-center gap-1.5 self-start md:self-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white font-mono text-xs rounded-lg border border-[#d4af37]/30 whitespace-nowrap">
                      <Calendar className="h-3.5 w-3.5 text-[#e5c158]" />
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
      <div className="bg-white/[0.06] backdrop-blur-md border border-[#d4af37]/35 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6" id="certified-trust-box">
        <div className="p-4 bg-[#d4af37]/15 rounded-full text-[#e5c158] border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div className="space-y-1.5 text-center md:text-left">
          <h4 className="font-display font-bold text-white text-lg">Pronto para Desafios Corporativos</h4>
          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-2xl font-sans">
            Cada credencial listada reflete de forma tangível conhecimentos validados pelo mercado na modelagem de sistemas em nuvem de alta segurança e governança inteligente.
          </p>
        </div>
      </div>
    </div>
  );
}
