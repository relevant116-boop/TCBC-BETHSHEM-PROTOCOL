
import React, { useState, useEffect } from 'react';
import { Trophy, Timer, AlertCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { MOCK_TRIVIA, COLORS } from '../constants';

const Trivia: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = MOCK_TRIVIA[currentIndex];

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0 && selectedOption === null) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && selectedOption === null) {
      handleOptionSelect(-1); // Timeout
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, selectedOption]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 10);
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }

    setTimeout(() => {
      if (currentIndex < MOCK_TRIVIA.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeLeft(15);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  return (
    <div className="px-5 pt-6 h-full flex flex-col">
      {gameState === 'intro' && (
        <div className="flex flex-col items-center text-center justify-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-[#C5A06D] rounded-full flex items-center justify-center shadow-xl">
            <Trophy size={48} className="text-[#0A1E3B]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-[#0A1E3B]">Trivia Question of the Day</h1>
            <p className="text-sm text-gray-500 px-6">Test your knowledge on Biblical protocol and ministry history. Earn points for your rank!</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm w-full space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-400">DAILY AT: 06:00 GMT</span>
              <span className="text-[#C5A06D]">RESET: MONTHLY</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Your Rank</p>
                <p className="text-lg font-bold text-[#0A1E3B]">#14</p>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total Points</p>
                <p className="text-lg font-bold text-[#0A1E3B]">1,240</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setGameState('playing')}
            className="w-full bg-[#0A1E3B] text-[#C5A06D] py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all"
          >
            Start Quiz
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-gray-400">QUESTION {currentIndex + 1}/{MOCK_TRIVIA.length}</div>
            <div className={`flex items-center gap-1 font-bold ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-[#C5A06D]'}`}>
              <Timer size={16} />
              {timeLeft}s
            </div>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C5A06D] transition-all duration-1000" 
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[120px] flex items-center">
            <p className="text-lg font-bold text-[#0A1E3B]">{question.question}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              let style = "bg-white border-gray-100 text-[#0A1E3B]";
              if (selectedOption === i) {
                style = isCorrect ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700";
              } else if (selectedOption !== null && i === question.correctIndex) {
                style = "bg-green-100 border-green-500 text-green-700";
              }

              return (
                <button
                  key={i}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionSelect(i)}
                  className={`w-full p-4 rounded-xl border text-left font-semibold text-sm transition-all flex justify-between items-center ${style} active:scale-98`}
                >
                  {opt}
                  {selectedOption === i && (
                    isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />
                  )}
                  {selectedOption !== null && i === question.correctIndex && i !== selectedOption && (
                    <CheckCircle2 size={18} />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption === null && timeLeft === 0 && (
             <div className="flex items-center gap-2 text-red-500 text-xs font-bold justify-center">
                <AlertCircle size={14} /> Time is up!
             </div>
          )}
        </div>
      )}

      {gameState === 'result' && (
        <div className="flex flex-col items-center text-center justify-center py-10 space-y-8 animate-in zoom-in duration-500">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#0A1E3B]">Daily Trivia Over</h2>
            <p className="text-gray-500">You earned <span className="text-[#C5A06D] font-bold">+{score} points</span> today!</p>
          </div>

          <div className="w-full bg-[#0A1E3B] rounded-2xl p-6 text-white space-y-4 shadow-xl">
             <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-70 text-sm">Yesterday's Ranking</span>
                <span className="font-bold text-[#C5A06D]">#14</span>
             </div>
             <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-70 text-sm">New Est. Ranking</span>
                <span className="font-bold text-green-400">#12 ↑</span>
             </div>
             <div className="pt-2">
                <p className="text-[10px] uppercase font-bold opacity-50 mb-3 tracking-widest">Top Performers</p>
                <div className="space-y-2">
                  {[1, 2, 3].map(rank => (
                    <div key={rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className="text-[#C5A06D] font-bold">#{rank}</span>
                         <span className="text-sm">Member Name {rank}</span>
                      </div>
                      <span className="text-xs opacity-60">2,450 pts</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          <button 
            onClick={() => {
              setGameState('intro');
              setCurrentIndex(0);
              setScore(0);
              setSelectedOption(null);
            }}
            className="flex items-center gap-2 text-[#0A1E3B] font-bold hover:underline"
          >
            Review leaderboard <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Trivia;
