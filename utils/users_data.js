import { ROLES } from "./roles";

export const users = [
  {
    id: 1,
    name: 'Minh Hai',
    email: 'leader@boltz.com',
    password: '12345678',
    role: ROLES.LEADER,
  },
  {
    id: 2,
    name: 'Duc Hiep',
    email: 'bacgiang@boltz.com',
    password: '12345678',
    role: ROLES.COLLECTION_MANAGER,
  }
];