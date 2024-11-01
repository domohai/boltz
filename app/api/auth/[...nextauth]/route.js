import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
import bcrypt from 'bcryptjs';
import pool from '@utils/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      }, 
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const [userResult] = await pool.query(
            `SELECT * FROM user WHERE email = ?`,
            [email]
          );
          if (!userResult || userResult.length === 0) {
            console.error("User not found");
            return null;
          }
          const user = userResult[0];
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          console.log("Password match result:", isPasswordMatch);
          if (!isPasswordMatch) {
            console.error("Password mismatch");
            return null;
          }
          return { id: user.id, email: user.email, role: user.role };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn(user, account) {
      if (account?.provider === 'credentials') {
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
