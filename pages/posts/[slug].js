import PostContent from "../../components/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";

export default function PostDetailPage({ post }) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</>
	);
}

export function getStaticPaths() {
	const postFilenames = getPostsFiles();
	const slugs = postFilenames.map(filename => filename.replace(/\.md$/, ""));

	return {
		paths: slugs.map(slug => ({ params: { slug } })),

		fallback: false,
	};
}

export function getStaticProps(context) {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);

	return {
		props: { post: postData },
		revalidate: 600,
	};
}
