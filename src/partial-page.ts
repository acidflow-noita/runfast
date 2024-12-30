/** A little html streaming helper */
export default class PartialPage {
    private writer: WritableStreamDefaultWriter<Uint8Array>;
    private encoder: TextEncoder;

    private constructor(stream: WritableStream<Uint8Array>) {
        this.writer = stream.getWriter();
        this.encoder = new TextEncoder();
    }

    async append(chunk: string) {
        return this.writer.write(this.encoder.encode(chunk));
    }

    async log(message: string) {
        return this.append(`<li>${message}</li>`);
    }

    async run(script: string) {
        return this.append(`<script>${script}</script>`);
    }

    static respond(
        ctx: ExecutionContext,
        task: (page: PartialPage) => Promise<void>,
        onError?: (page: PartialPage, e: Error) => Promise<void>
    ): Response {
        const { readable, writable } = new TransformStream<
            Uint8Array,
            Uint8Array
        >();

        const page = new PartialPage(writable);

        // note the lack of await
        ctx.waitUntil(
            task(page)
                .catch((e) => {
                    console.error(e);
                    onError ? ctx.waitUntil(onError(page, e)) : 0;
                })
                .finally(() => page.writer.close())
        );

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Encoding': 'none', // hallelujah (compression breaks html streaming and I spent way too long figuring that out)
            },
        });
    }
}
