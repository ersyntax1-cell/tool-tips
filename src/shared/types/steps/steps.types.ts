type ModalStep = {
  id?: string;
  title?: string;
  content: React.ReactNode;
  image?: string;
  selector?: string;
};

export interface Props {
  steps: ModalStep[];
  isOpen?: boolean;
  onClose?: () => void;
  startIndex?: number;
  closeOnOverlayClick?: boolean;
}