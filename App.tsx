
import React, { useState, useEffect, useCallback } from 'react';
import { PRIZES, COLORS } from './constants';
import { APP_CONFIG } from './appConfig';
import Envelope from './components/Envelope';
import PrizeModal from './components/PrizeModal';
import ConfettiEffect from './components/ConfettiEffect';
import { playTingSound } from './components/SoundManager';

const MAX_DRAWS = 1;

const App: React.FC = () => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [wonPrizes, setWonPrizes] = useState<Record<number, string>>({});
  const [currentPrize, setCurrentPrize] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [participantCount, setParticipantCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('concung_participant_count');
    if (savedCount !== null) {
      const parsed = parseInt(savedCount, 10);
      return isNaN(parsed) ? 0 : parsed % 100;
    }
    return Math.floor(Math.random() * 100);
  });

  useEffect(() => {
    const savedOpenedIds = localStorage.getItem('concung_opened_ids');
    const savedWonPrizes = localStorage.getItem('concung_won_prizes');
    
    if (savedOpenedIds && savedWonPrizes) {
      const parsedIds = JSON.parse(savedOpenedIds);
      const parsedPrizes = JSON.parse(savedWonPrizes);
      setOpenedIds(parsedIds);
      setWonPrizes(parsedPrizes);
      if (parsedIds.length > 0) {
        setCurrentPrize(parsedPrizes[parsedIds[0]]);
      }
    }

    const ONE_HOUR = 3600000;
    const timer = setInterval(() => {
      setParticipantCount(prev => {
        const next = (prev + 1) % 100;
        localStorage.setItem('concung_participant_count', next.toString());
        return next;
      });
    }, ONE_HOUR);

    return () => clearInterval(timer);
  }, []);

  const getWeightedPrize = useCallback(() => {
    const totalPercentage = PRIZES.reduce((acc, p) => acc + p.percentage, 0);
    let random = Math.random() * totalPercentage;
    
    for (const p of PRIZES) {
      if (random < p.percentage) return p.name;
      random -= p.percentage;
    }
    return PRIZES[PRIZES.length - 1].name;
  }, []);

  const handleOpen = (id: number) => {
    if (openedIds.length >= MAX_DRAWS) return;

    const wonPrize = getWeightedPrize();
    const newOpenedIds = [id];
    const newWonPrizes = { [id]: wonPrize };

    setOpenedIds(newOpenedIds);
    setWonPrizes(newWonPrizes);
    setCurrentPrize(wonPrize);

    localStorage.setItem('concung_opened_ids', JSON.stringify(newOpenedIds));
    localStorage.setItem('concung_won_prizes', JSON.stringify(newWonPrizes));

    playTingSound();

    setTimeout(() => {
      setShowConfetti(true);
      setIsModalOpen(true);
    }, 800);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowConfetti(false);
  };

  const hasDrawn = openedIds.length > 0;

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-[#fffafc]">
      <header className="bg-white border-b border-pink-100 py-4 px-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: APP_CONFIG.brand.primaryColor }}>
              {APP_CONFIG.brand.logoText}
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline" style={{ color: APP_CONFIG.brand.primaryColor }}>
              {APP_CONFIG.brand.name} <span className="font-light text-gray-400">{APP_CONFIG.brand.subName}</span>
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${hasDrawn ? 'bg-gray-100 border-gray-200' : 'bg-pink-50 border-pink-100'}`}>
              <span className={`text-[10px] font-bold uppercase ${hasDrawn ? 'text-gray-400' : ''}`} style={{ color: hasDrawn ? undefined : APP_CONFIG.brand.primaryColor }}>Lượt rút:</span>
              <span className={`text-sm font-black ${hasDrawn ? 'text-gray-500' : ''}`} style={{ color: hasDrawn ? undefined : APP_CONFIG.brand.primaryColor }}>{openedIds.length}/{MAX_DRAWS}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-full mb-3 uppercase tracking-widest animate-pulse">
            {APP_CONFIG.home.eventTag}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {APP_CONFIG.home.mainTitle.split('MAY MẮN')[0]}
            <span style={{ color: APP_CONFIG.brand.primaryColor }}>MAY MẮN</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed px-4">
            {hasDrawn ? (
              <>{APP_CONFIG.home.thankYouMessage}</>
            ) : (
              <>{APP_CONFIG.home.subTitle}</>
            )}
          </p>
        </div>

        <div className="max-w-xs mx-auto mb-10">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-2">
            <span>Trạng thái</span>
            <span>{hasDrawn ? 'Đã hoàn thành' : 'Sẵn sàng'}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-out"
              style={{ width: hasDrawn ? '100%' : '0%', backgroundColor: APP_CONFIG.brand.primaryColor }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-12">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Envelope 
              key={id}
              id={id}
              isOpened={openedIds.includes(id)}
              isDisabled={hasDrawn && !openedIds.includes(id)}
              onOpen={handleOpen}
              prizeName={wonPrizes[id]}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-8">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          {APP_CONFIG.home.participantText.replace('{count}', participantCount.toString())}
        </div>

        <div className="bg-white/60 backdrop-blur rounded-3xl p-6 text-center border border-pink-50 shadow-sm">
          <p className="text-gray-400 text-[10px] sm:text-xs italic leading-relaxed">
            {APP_CONFIG.home.footerNote}
          </p>
        </div>
      </main>

      <PrizeModal 
        isOpen={isModalOpen} 
        prizeName={currentPrize} 
        onClose={closeModal} 
      />
      <ConfettiEffect active={showConfetti} />

      {hasDrawn && !isModalOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xs z-40">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 text-white font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all border-b-4"
            style={{ backgroundColor: APP_CONFIG.brand.primaryColor, borderColor: APP_CONFIG.brand.secondaryColor }}
          >
            {APP_CONFIG.modal.viewResultButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
