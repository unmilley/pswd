import { defineBuildConfig } from "obuild/config";

export default defineBuildConfig({
  entries: [
    {
      type: "bundle",
      input: ["src/index.ts", "src/memorable/index.ts"],
      minify: true,
    },
  ],
  hooks: {
    rolldownOutput(output) {
      output.codeSplitting = {
        groups: [
          {
            name: "shared",
            // test: /src[\\/](utils|constants|types|pswd[\\/]memorable[\\/]base)/,
            test(id) {
              return (
                id.includes("/utils/") ||
                id.includes("/constants/") ||
                id.includes("/types/") ||
                id.includes("/pswd/memorable/base")
              );
            },
            minShareCount: 2,
            minSize: 8 * 1024,
            entriesAware: true,
          },
          {
            name: "dictionary",
            test: /src[\\/]data[\\/]/,
            priority: 10,
            minSize: 32 * 1024,
          },
        ],
      };
    },
  },
});
