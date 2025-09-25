declare module "algebrite" {
    const Algebrite: {
        run: (expr: string) => string;
        eval: (expr: string) => string;
        simplify: (expr: string) => string;
        float: (expr: string) => string;
        [key: string]: any;
    };
    export default Algebrite;
}
