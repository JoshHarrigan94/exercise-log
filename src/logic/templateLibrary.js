import { sessionTemplates } from "../data/sessionTemplates.js";
import { store } from "../state/store.js";

export function getAllTemplates() {
  return [
    ...sessionTemplates,
    ...(store.data.customTemplates || [])
  ];
}

export function getTemplateById(id) {
  return getAllTemplates().find(template => template.id === id);
}
