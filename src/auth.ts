import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        //验证参数合法性
        // const parsedCredentials = z
        //   .object({ username: z.string().min(6), password: z.string().min(6) })
        //   .safeParse(credentials);
        // console.log({ parsedCredentials });

        //TODO 数据库获取用户账号密码验证
        // if (parsedCredentials.success) {
        //   const { username } = parsedCredentials.data;
        // //   const user = await getUser(email);
        // //   if (!user) return null;
        // //   const passwordsMatch = await bcrypt.compare(password, user.password);
        // //   if (passwordsMatch) return user;
        // //test demo
        console.log({credentials});

        //tip:测试验证
        if (credentials.username=='666') {
          console.log("登录成功");
          return {
            username: "5555",
          };
        }


        console.log("账号或者密码错误!!!!");
        return null;
      },
    }),
  ],
});
