
import React from 'react';
import { EnvelopeProps } from '../types';
import { getPrizeImage } from '../constants';
import { APP_CONFIG } from '../appConfig';

const Envelope: React.FC<EnvelopeProps> = ({ id, isOpened, isDisabled, onOpen, prizeName }) => {
  const prizeImage = prizeName ? getPrizeImage(prizeName) : undefined;

  return (
    <div 
      className={`relative w-full aspect-[3/4] perspective-1000 cursor-pointer transition-all duration-300 ${isDisabled && !isOpened ? 'opacity-50 grayscale' : 'hover:-translate-y-2'}`}
      onClick={() => !isDisabled && onOpen(id)}
    >
      <div className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${isOpened ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div 
          className="absolute inset-0 backface-hidden flex flex-col items-center justify-end p-4 rounded-2xl shadow-xl overflow-hidden bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${APP_CONFIG.envelope.imageUrl})`,
            backgroundColor: APP_CONFIG.envelope.backColor
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

          <div className="text-center z-10 mb-4 sm:mb-6">
            <p className="text-yellow-200 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1 drop-shadow-md">
              {APP_CONFIG.envelope.subText}
            </p>
            <h3 className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-lg uppercase">
              {APP_CONFIG.envelope.frontText.split(' ')[0]}<br/>{APP_CONFIG.envelope.frontText.split(' ').slice(1).join(' ')}
            </h3>
          </div>
        </div>

        {/* Back Side (Revealed Prize) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl shadow-2xl bg-white border-4 border-yellow-400 overflow-hidden">
          {prizeImage ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
              <img src={prizeImage} alt={prizeName} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
              <div className="text-red-500 font-bold text-center">
                <p className="text-[10px] uppercase text-gray-400">Bạn đã trúng</p>
                <p className="text-[10px] sm:text-xs leading-tight font-bold">{prizeName}</p>
              </div>
            </div>
          ) : (
            <div className="text-red-500 font-bold text-center">
              <p className="text-[10px] sm:text-xs uppercase text-gray-400 mb-2">Bạn đã trúng</p>
              <p className="text-sm sm:text-lg leading-snug font-bold">{prizeName}</p>
              <div className="mt-4 text-2xl sm:text-3xl">🎉</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Envelope;
