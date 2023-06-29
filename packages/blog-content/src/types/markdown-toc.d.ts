declare module "markdown-toc" {
    export default function toc(str: string): {
        json: JSON
        content: string
    }
}
