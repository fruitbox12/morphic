// next-env.d.ts or any .d.ts file in your project
import 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    access_token?: string;
  }
}
