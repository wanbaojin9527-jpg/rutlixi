
export interface Prize {
  id: number;
  name: string;
  percentage: number; // Đổi từ weight sang percentage (%)
  imageUrl?: string;
}

export interface EnvelopeProps {
  id: number;
  isOpened: boolean;
  isDisabled: boolean;
  onOpen: (id: number) => void;
  prizeName?: string;
}

export interface ModalProps {
  isOpen: boolean;
  prizeName: string;
  onClose: () => void;
  drawCount?: number;
}
