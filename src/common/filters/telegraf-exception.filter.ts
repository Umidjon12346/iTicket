// import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
// import { TelegrafArgumentsHost } from "nestjs-telegraf";
// import { Context, Markup, Telegraf } from "telegraf";

// @Catch()
// export class TelegrafExceptionFilter implements ExceptionFilter{
//     async catch(exception: any, host: ArgumentsHost) {
//         const telegrafHost = TelegrafArgumentsHost.create(host)
//         const ctx = telegrafHost.getContext<Context>()
//         await ctx.replyWithHTML(`Permission: ${exception.message}`,{
//             ...Markup.removeKeyboard()
//         })
//     }
// }