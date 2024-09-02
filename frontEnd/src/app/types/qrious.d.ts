declare module 'qrious' {
    export default class Qrious {
      constructor(options?: QriousOptions);
      set(options: QriousOptions): void;
    }
  
    export interface QriousOptions {
      element?: HTMLCanvasElement | string; // ID del elemento canvas o el propio elemento
      value?: string; // El valor del código QR
      size?: number; // Tamaño del código QR
      level?: 'L' | 'M' | 'Q' | 'H'; // Nivel de corrección de errores
    }
  }