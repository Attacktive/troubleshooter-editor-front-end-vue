/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GITHUB_REPOSITORY: string
	readonly VITE_API_ROOT: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
