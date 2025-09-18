import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
!process.env.SKIP_ENV_VALIDATION && (await jiti.import("./env"));

/** @type {import("next").NextConfig} */
const nextConfig = {};

export default nextConfig;
