export interface ModalCompProps {
  onSubmit?: (data?: any | null, file?: any | null) => void;
  isOpen: boolean;
  onCancel: () => void;
  isEdit?: boolean;
  editId?: number | null;
  previewId?: number | null;
}

export interface ModalActionProps {
  title: string;
  onAction: () => void;
  variant: string;
}

export interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  actions: ModalActionProps[];
  title: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

export interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}
