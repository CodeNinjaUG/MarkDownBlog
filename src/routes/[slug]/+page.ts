import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
export const load: PageLoad = async ({ params }) => {
  const { slug } = params;
  try {
    const post = await import(`../../posts/${slug}.md`);
    return {
      content: post.metadata.description,
      default : post.default,
      meta: post.metadata,
    };
  } catch (e) {
    throw error(404, `Could not find ${slug}`);
  }
};
