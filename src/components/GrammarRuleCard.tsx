import React from 'react';
import { GrammarRuleCard as IGrammarRuleCard } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { AudioButton } from './AudioButton';

interface GrammarRuleCardProps {
  card: IGrammarRuleCard;
  showRomanization?: boolean;
}

export const GrammarRuleCard: React.FC<GrammarRuleCardProps> = ({
  card,
  showRomanization = true,
}) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-xs overflow-hidden transition-all hover:shadow-md hover:border-amber-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 p-4 text-white flex items-center justify-between">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/20 text-white backdrop-blur-xs mb-1">
            {card.badge}
          </span>
          <h3 className="text-lg font-bold tracking-tight text-white">{card.title}</h3>
        </div>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-amber-100" />
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Kid-Friendly 5-Year-Old Explanation */}
        <div className="bg-amber-50/80 border-2 border-dashed border-amber-300/80 rounded-xl p-3.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            <span>👶 5-Year-Old Explanation</span>
          </div>
          <p className="text-sm font-medium text-stone-800 leading-relaxed">
            {card.kidSummary}
          </p>
        </div>

        {/* Detailed linguistic rule */}
        <p className="text-xs text-stone-600 leading-relaxed">
          {card.ruleExplanation}
        </p>

        {/* Optional Visual Formula Blocks */}
        {card.blocksFormula && card.blocksFormula.length > 0 && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Visual Formula:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {card.blocksFormula.map((blk, idx) => (
                <React.Fragment key={idx}>
                  <div
                    className={`px-3 py-2 rounded-xl border-2 font-semibold text-xs shadow-2xs flex flex-col items-center ${blk.color}`}
                  >
                    <span>{blk.text}</span>
                    <span className="text-[10px] font-normal opacity-80">{blk.label}</span>
                  </div>
                  {idx < (card.blocksFormula?.length ?? 0) - 1 && (
                    <span className="text-stone-400 font-bold">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Do's & Don'ts Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {/* DO's */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>DO Say (Natural)</span>
            </div>
            <div className="space-y-2.5">
              {card.dos.map((d, idx) => (
                <div key={idx} className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-hangul font-bold text-stone-900 text-sm">
                      {d.korean}
                    </span>
                    <AudioButton text={d.korean} size="sm" />
                  </div>
                  {showRomanization && (
                    <p className="text-[11px] font-mono text-stone-500">{d.romanization}</p>
                  )}
                  <p className="text-xs font-semibold text-stone-700">{d.english}</p>
                  <p className="text-[11px] text-emerald-700 italic">💡 {d.why}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DONT's */}
          <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>DON'T Say (Awkward)</span>
            </div>
            <div className="space-y-2.5">
              {card.donts.map((d, idx) => (
                <div key={idx} className="bg-white/90 p-2.5 rounded-lg border border-rose-100 shadow-2xs space-y-1">
                  <span className="font-hangul font-bold text-rose-900 line-through text-sm">
                    {d.korean}
                  </span>
                  {showRomanization && d.romanization !== '-' && (
                    <p className="text-[11px] font-mono text-stone-400">{d.romanization}</p>
                  )}
                  <p className="text-xs text-stone-600">{d.wrongEnglish}</p>
                  <p className="text-[11px] text-rose-700">⚠️ {d.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exceptions warning if any */}
        {card.exceptions && card.exceptions.length > 0 && (
          <div className="bg-amber-100/60 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Watch out for exceptions: </span>
              {card.exceptions.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
