import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head";

export default function AllPostsPage({ posts }) {
	return (
		<>
			<Head>
				<title>Anna`s Blog posts</title>
				<meta name="description" content="Page contains all the posts" />
			</Head>
			<AllPosts posts={posts} />
		</>
	);
}

export async function getStaticProps() {
	const posts = getAllPosts();
	return {
		props: { posts },
	};
}
