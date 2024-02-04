const config = {
  include: ["tests/**/*.test.ts"],
  coverage: {
    reporter: ["text", "json"],
    provider: "v8",
  },
};

export default config;
