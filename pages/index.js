import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

export default function HomePage({ posts }) {
	return (
		<>
		<Head>
			<title>Anna`s Blog</title>
			<meta name='description' content='I post about programming and development in general' />
		</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	);
}

export async function getStaticProps() {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts,
		},
		revalidate: 60,
	};
}
