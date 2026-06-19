import React from 'react';
import { Cpu, Layout, Database, Cloud, Shield, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

export default function SkillsSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="h-5 w-5 text-purple-400" />;
      case 'Layout':
        return <Layout className="h-5 w-5 text-purple-400" />;
      case 'Database':
        return <Database className="h-5 w-5 text-purple-400" />;
      case 'Cloud':
        return <Cloud className="h-5 w-5 text-purple-400" />;
      case 'Shield':
        return <Shield className="h-5 w-5 text-purple-400" />;
      default:
        return <Cpu className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-12 animate-fade-in" id="skills-section-container">
      {/* Header details */}
      <div className="space-y-2 border-b border-zinc-800 pb-6">
        <h2 className="font-display font-bold text-3xl text-white">
          Stack Tecnológica
        </h2>
        <p className="text-zinc-400 font-sans text-sm">
          Ferramentas, linguagens, serviços em nuvem e frameworks que utilizo no meu dia a dia para solucionar problemas de alto impacto.
        </p>
      </div>

      {/* Grid of structured lists of skill category items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="skills-grid-layout">
        {SKILL_CATEGORIES.map((category, index) => {
          return (
            <div 
              key={index}
              className="bg-[#0b0f19]/60 border border-[#1e293b] rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-all duration-300"
              id={`skill-category-card-${index}`}
            >
              {/* Category Icon and title */}
              <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-3">
                <div className="p-2 bg-purple-950/40 border border-purple-500/10 rounded-xl">
                  {getIcon(category.iconName)}
                </div>
                <h3 className="font-display font-bold text-zinc-100 tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Individual Pills layout */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 rounded-xl transition-all group"
                  >
                    <Check className="h-3.5 w-3.5 text-purple-500/80 group-hover:text-purple-400 transition-colors" />
                    <span className="text-zinc-300 text-xs font-semibold font-sans tracking-wide">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
