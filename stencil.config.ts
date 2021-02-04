import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
    namespace: "dotcms-webcomponents",
    outputTargets: [
        {
            type: "dist",
            esmLoaderPath: "../loader",
            dir: "storybook-static",
            empty: false
        },
        {
            type: "docs-readme"
        },
        {
            type: "www",
            serviceWorker: null // disable service workers
        }
    ],
    plugins: [sass({
        includePaths: ['node_modules', 'src/global']
    })],
    devServer: {
        openBrowser: false
    }
};
