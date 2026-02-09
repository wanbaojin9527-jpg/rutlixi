
import React, { useEffect, useState } from 'react';
import { ModalProps } from '../types';
import { getPrizeImage } from '../constants';
import { APP_CONFIG } from '../appConfig';

const PrizeModal: React.FC<ModalProps> = ({ isOpen, prizeName, onClose }) => {
  const [show, setShow] = useState(false);
  const prizeImage = getPrizeImage(prizeName);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 100);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleSurveyClick = () => {
    alert(APP_CONFIG.modal.confirmMessage);
    // Không còn chuyển trang vì surveyUrl đã bị xóa
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${show ? 'bg-black/70 opacity-100' : 'bg-black/0 opacity-0'}`}>
      <div className={`bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 transform ${show ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
        
        {/* Header Gradient */}
        <div className="h-28 flex flex-col items-center justify-center relative overflow-hidden" 
             style={{ background: `linear-gradient(to bottom right, ${APP_CONFIG.brand.primaryColor}, ${APP_CONFIG.brand.secondaryColor})` }}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="z-10 text-center text-white">
            <span className="bg-white/20 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase mb-1 inline-block">
              Lượt rút duy nhất 1/1
            </span>
            <h2 className="text-xl font-bold tracking-tight">{APP_CONFIG.modal.congratsText}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-6 pb-10 text-center">
          {prizeImage && (
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src={prizeImage} 
                  alt={prizeName} 
                  className="relative w-40 h-40 object-contain rounded-2xl shadow-md border border-gray-50 bg-white p-2"
                />
              </div>
            </div>
          )}

          <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">{APP_CONFIG.modal.prizeLabel}</p>
          <div className={`mb-6 p-4 bg-pink-50 rounded-2xl border border-pink-100 ${!prizeImage ? 'py-8' : ''}`}>
            <h3 className="text-xl font-bold leading-tight uppercase" style={{ color: APP_CONFIG.brand.primaryColor }}>{prizeName}</h3>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-8 px-4">
            {APP_CONFIG.modal.instructionText}
          </p>

          <button 
            onClick={handleSurveyClick}
            className="w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-wide"
            style={{ backgroundColor: APP_CONFIG.brand.primaryColor, boxShadow: `0 10px 15px -3px ${APP_CONFIG.brand.primaryColor}44` }}
          >
            {APP_CONFIG.modal.surveyButtonText}
          </button>
          
          <button 
            onClick={onClose}
            className="mt-4 text-gray-400 text-xs hover:text-gray-600 font-medium"
          >
            {APP_CONFIG.modal.closeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrizeModal;
