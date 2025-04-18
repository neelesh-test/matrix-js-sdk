module.exports = {
    plugins: ["matrix-org", "import", "jsdoc", "n"],
    extends: ["plugin:matrix-org/babel", "plugin:matrix-org/jest", "plugin:import/typescript"],
    parserOptions: {
        project: ["./tsconfig.json"],
    },
    env: {
        browser: true,
        node: true,
    },
    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },
    // NOTE: These rules are frozen and new rules should not be added here.
    // New changes belong in https://github.com/matrix-org/eslint-plugin-matrix-org/
    rules: {
        "no-var": ["error"],
        "prefer-rest-params": ["error"],
        "prefer-spread": ["error"],
        "one-var": ["error"],
        "padded-blocks": ["error"],
        "no-extend-native": ["error"],
        "camelcase": ["error"],
        "no-multi-spaces": ["error", { ignoreEOLComments: true }],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "arrow-parens": "off",
        "prefer-promise-reject-errors": "off",
        "no-constant-condition": "off",
        "no-async-promise-executor": "off",
        // We use a `logger` intermediary module
        "no-console": "error",

        // restrict EventEmitters to force callers to use TypedEventEmitter
        "no-restricted-imports": [
            "error",
            {
                name: "events",
                message: "Please use TypedEventEmitter instead",
            },
        ],

        "no-restricted-properties": [
            "error",
            {
                object: "window",
                property: "setImmediate",
                message: "Use setTimeout instead.",
            },
        ],
        "no-restricted-globals": [
            "error",
            {
                name: "setImmediate",
                message: "Use setTimeout instead.",
            },
            {
                name: "global",
                message: "Use globalThis instead.",
            },
        ],

        "import/no-restricted-paths": [
            "error",
            {
                zones: [
                    {
                        target: "./src/",
                        from: "./src/index.ts",
                        message:
                            "The package index is dynamic between src and lib depending on " +
                            "whether release or development, target the specific module or matrix.ts instead",
                    },
                ],
            },
        ],
        // Disabled tests are a reality for now but as soon as all of the xits are
        // eliminated, we should enforce this.
        "jest/no-disabled-tests": "off",
        // Used in some crypto tests.
        "jest/no-standalone-expect": [
            "error",
            {
                additionalTestBlockFunctions: ["beforeAll", "beforeEach"],
            },
        ],
    },
    overrides: [
        {
            files: ["**/*.ts"],
            plugins: ["eslint-plugin-tsdoc"],
            extends: ["plugin:matrix-org/typescript"],
            rules: {
                // TypeScript has its own version of this
                "@babel/no-invalid-this": "off",

                // We're okay being explicit at the moment
                "@typescript-eslint/no-empty-interface": "off",
                // We disable this while we're transitioning
                "@typescript-eslint/no-explicit-any": "off",
                // We'd rather not do this but we do
                "@typescript-eslint/ban-ts-comment": "off",
                // We're okay with assertion errors when we ask for them
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-empty-object-type": [
                    "error",
                    {
                        // We do this sometimes to brand interfaces
                        allowInterfaces: "with-single-extends",
                    },
                ],

                "quotes": "off",
                // We use a `logger` intermediary module
                "no-console": "error",
            },
        },
        {
            files: ["src/**/*.ts"],
            rules: {
                "jsdoc/no-types": "error",
                "jsdoc/empty-tags": "error",
                "jsdoc/check-property-names": "error",
                "jsdoc/check-values": "error",
                // These need a bit more work before we can enable
                // "jsdoc/check-param-names": "error",
                // "jsdoc/check-indentation": "error",
                // Ensure .ts extension on imports outside of tests
                "n/file-extension-in-import": [
                    "error",
                    "always",
                    {
                        tryExtensions: [".ts"],
                    },
                ],
                "no-extra-boolean-cast": "error",
            },
        },
        {
            files: ["spec/**/*.ts"],
            rules: {
                // We don't need super strict typing in test utilities
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/explicit-member-accessibility": "off",
                "@typescript-eslint/no-empty-object-type": "off",
            },
        },
        {
            // Enable stricter promise rules for the MatrixRTC codebase
            files: ["src/matrixrtc/**/*.ts", "spec/unit/matrixrtc/*.ts"],
            rules: {
                // Encourage proper usage of Promises:
                "@typescript-eslint/no-floating-promises": "error",
                "@typescript-eslint/no-misused-promises": "error",
                "@typescript-eslint/require-await": "error",
                "@typescript-eslint/await-thenable": "error",
            },
        },
    ],
};
