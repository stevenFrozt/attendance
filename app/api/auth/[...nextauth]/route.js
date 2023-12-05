import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const data = {
          name: "Admin officer",
          email: "admin@example.com",
          image: "123",
          role: "admin"
        }

        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          return data
        }
        // CLIENT authentication
        if (
          credentials.username === "test" &&
          credentials.password === "test"
        ) {
          return {
            name: "John Doe",
            email: "test@example.com",
            role: "user",
            username: credentials.username
          }
        }
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role // (admin || user) => data.role from authorize() function added to token object
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role // admin || user from jwt() function added to session.user
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
})

export { handler as GET, handler as POST }
