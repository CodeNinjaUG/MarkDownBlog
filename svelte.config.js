import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex, escapeSvelte } from "mdsvex";
import { getHighlighter } from 'shiki'
/** @type {import('@sveltejs/kit').Config} */
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  highlight: {
    highlighter : async(code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['poimandres'],
        langs: ['javascript', 'typescript']
      })
      await highlighter.loadLanguage('javascript', 'typescript')
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }))
        return `{@html \`${html}\`}`
    }
  }
};
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
  },
};

export default config;
