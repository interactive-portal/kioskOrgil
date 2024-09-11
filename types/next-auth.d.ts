import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends User {
    profileImg?: string;
    username?: string;
    crmuserid?: string | number;
    sessionCustUserId?: string | number;
    dbsessionid?: string | number;
    readyProfile?: any;

    user: {
      /** The user's postal address. */
      address?: string | undefined;
      name?: any;
      image?: any;
    } & DefaultSession["user"];
  }
  interface User extends User {
    provider?: any;
    profile?: any;
    clouderp?: any;
    profileLastReady?: any;
    kyc?: any;
    google?: any;
    facebook?: any;
    userMetaverse?: any;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
