export const VIEWS: Record<string, string[]> = {
  index: ['index', 'examples', 'anatomy'],
  api: ['api'],
  styling: ['styling'],
  accessibility: ['accessibility'],
  guides: ['patterns', 'comparison', 'troubleshooting'],
};

export const getView = (file: string) => file in VIEWS ? file : Object.keys(VIEWS).find((view) => VIEWS[view].includes(file)) ?? 'index';
