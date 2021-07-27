import fs from "fs";
import path from "path";
import matter from "gray-matter";

// eslint-disable-next-line no-undef
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
	return fs.readdirSync(postsDirectory);
}

// ?: postIdentifier can come either with or without the file extension as it will be removed and readded anyway
// ?: Need to do this as the slug from individual post page comes without file extension
export function getPostData(postIdentifier) {
	const postSlug = postIdentifier.replace(/\.md$/, ""); // ?: removes the file extension
	const filePath = path.join(postsDirectory, `${postSlug}.md`); // ?: This addes the file extension
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	const postData = {
		// ?: slug is the filename of the markdown file
		slug: postSlug,
		...data,
		content,
	};

	return postData;
}

export function getAllPosts() {
	const postFiles = fs.readdirSync(postsDirectory);

	const allPosts = postFiles.map(postFile => getPostData(postFile));

	const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

	return sortedPosts;
}

export function getFeaturedPosts() {
	const allPosts = getAllPosts();

	const featuredPosts = allPosts.filter(post => post.isFeatured);
	return featuredPosts;
}
