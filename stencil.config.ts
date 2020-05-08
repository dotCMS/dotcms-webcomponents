import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
    namespace: "dotcms-webcomponents",
    outputTargets: [
        {
            type: "dist",
            esmLoaderPath: "../loader"
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
    },
    testing: {
        transformIgnorePatterns: ["node_modules/(?!(@material)/)"],
        moduleNameMapper: []
    }
};
