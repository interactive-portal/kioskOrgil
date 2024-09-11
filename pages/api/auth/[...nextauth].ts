import _ from "lodash";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import {
  callLoginProcess,
  callLoginProcessV2,
} from "@/pages/api/auth/callLoginPorcessV2";
import { read } from "fs";
// import nextauthMetaverseCustomerLogin from "./nextauthMetaverseCustomerLogin";
// import AppleProvider from "next-auth/providers/apple";
// import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 1 * 60 * 60,
    secret: process.env.NEXTAUTH_SECRET,
  },

  providers: [
    CredentialsProvider({
      name: "Нэвтрэх",
      credentials: {
        userName: { label: "Username", type: "text" },
        passwordHash: { label: "PasswordHash", type: "password" },
      },

      authorize: async (credentials: any, req: any) => {
        // console.log("LLLLLLLLLLL", JSON.parse(credentials?.parameter));
        // return null;
        try {
          const result: any =
            // credentials?.command == "cozyNewLogin"
            credentials?.command == "cozyLoginAndCreate"
              ? await callLoginProcessV2({
                  user: {
                    profile: JSON.parse(credentials?.parameter),
                    metaNameV2: credentials?.metaNameV2,
                  },
                  type: "erplogin",
                })
              : await callLoginProcess({ credentials });
          const readyUser: any = {
            id: result?.id || result?.crmuserid,
            name: `${result?.customerfirstname} ${result?.customerlastname}`,
            email: result?.email,
            phone: result?.phone,
            username: result?.username,
            departmentid: result?.departmentid,
            departmentname:
              result?.departmentname ||
              credentials?.parameter?.departmentcode ||
              "Байгууллагын нэр",
            image:
              result?.emppicture ||
              "https://res.cloudinary.com/dzih5nqhg/image/upload/o_50/v1655704178/cloud/icons/user_s9lsbr.png",
            profile: result,
          };

          return readyUser;
        } catch (error) {
          throw new Error("Нэвтрэх нэр эсвэл нууц үг буруу байна!");
        }

        return null;
      },
    }),

    FacebookProvider({
      clientId: "491391969301958",
      clientSecret: "b182f01a5bf68be80689e0607be782af",
    }),

    GoogleProvider({
      clientId: process.env.NORMAL_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NORMAL_GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        timeout: 40000,
      },
    }),

    /* --------------------- Cozy, Moto --------------------- */
    GoogleProvider({
      id: "googleMoto",
      name: "GoogleMoto",
      clientId: process.env.MOTO_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.MOTO_GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      id: "facebookMoto",
      name: "FacebookMoto",
      authorization: "https://www.facebook.com/v18.0/dialog/oauth?scope=email",
      clientId: "1029296714976973",
      clientSecret: "cd2ace87fc4ba39dd8fb85c106fb42f2",
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, //30 days
    updateAge: 1 * 60 * 60,
  },

  callbacks: {
    /* ------------------------------------------------------ */
    /*                         SIGNIN                         */
    /* ------------------------------------------------------ */
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.id) {
        return Promise.reject(new Error("Sorry, I couldn't find that user"));
      }
      // console.log("user prfile", user);

      // user.provider = account?.provider || "unknown";
      user.profile = profile || user?.profile;

      let userMetaverse;

      switch (user?.provider) {
        case "credentials":
          // user.clouderp = user.profile;

          break;
        case "googleMoto":
          // user.clouderp = await callLoginProcessV2({
          //   user,
          //   type: "Google",
          // });

          //   userMetaverse = await nextauthMetaverseCustomerLogin({
          //     user: user,
          //     provider: "Google",
          //   });

          user.google = profile;

          break;
        case "facebookMoto":
          //   userMetaverse = await nextauthMetaverseCustomerLogin({
          //     user: { ...user, email: user.email || `${user.id}@facebook.com` },
          //     provider: "Facebook",
          //   });
          user.facebook = profile;
          break;

        default:
          break;
      }

      userMetaverse = _.omit(userMetaverse, [
        "company_department_id",
        "created_user_id",
        "created_user_name",
        "deleted_date",
        "deleted_user_id",
        "deleted_user_name",
        "generated_date",
        "indicator_id",
        "modified_user_id",
        "modified_user_name",
        "password",
        "provider_id",
        "provider_id_desc",
        "src_record_id",
        "type",
        "type_desc",
        "user_email_id",
        "user_email_id_desc",
        "wfm_description",
        "wfm_status_id",
      ]);
      user.userMetaverse = userMetaverse;

      // console.log("user", user);
      return true;
    },

    /* ------------------------- JWT ------------------------ */
    async jwt({ token, user, account, profile, isNewUser }): Promise<any> {
      const myToken = user || token;
      // console.log("myRToken", myToken);
      return myToken;
    },

    /* ---------------------- redirect ---------------------- */
    async redirect({ url, baseUrl }) {
      // console.log("SSSSSSSSSSSSS ", {
      //   url,
      //   baseUrl,
      //   haha: new URL(url).origin === baseUrl,
      // });

      // const myBaseUrl = baseUrl;
      // const myBaseUrl = "https://www.moto.mn";

      //   return url;
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    /* ----------------------- session ---------------------- */

    async session({ session, user, token }) {
      const readyToken: any = token;

      //standart user
      session.id = readyToken.id;
      session.profileImg = readyToken.image;

      //clouderp
      // session.departmentid =
      session.username = readyToken?.username;
      session.crmuserid = readyToken?.profile?.sessioncrmuserid;
      session.dbsessionid = readyToken?.profile?.sessionid;
      session.profile = readyToken?.profile;
      // session.departmentname = readyToken?.departmentname;

      //token info
      //? цаашдаа систем даяар readyProfile-ийг л хэрэглэх хэрэгтэй. Энэ дотор л бэлтгэсэн дата явна.
      // session.readyProfile = readyToken;

      // console.log("session", session);

      return session;
    },
  },

  /* ----------------------- events ----------------------- */
  events: {
    async signIn(message) {
      /* on successful sign in */
      // console.log("on successful sign in", message);
    },
    async signOut(message) {
      /* on signout */
      // console.log("on successful signout ", message);
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
      /* session is active */
      // console.log("o session is active", message);
    },
  },
  // debug: true,
};

export default NextAuth(authOptions);
