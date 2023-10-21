export { default } from 'next-auth/middleware';

export const config = {matcher:["/dashboard"]}// this mean /dashboard route will not accisseble when logout