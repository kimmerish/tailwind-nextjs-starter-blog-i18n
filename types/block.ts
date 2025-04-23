export type Block = {
  id: number;
  block_order: number;
  lang: 'uk' | 'en';
  type: 'text';
  content: string;
  info_uk: string;
  info_en: string;
};
