import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateLong } from "@/lib/utils";
import algoliasearch from "algoliasearch";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Post = {
    headline: string;
    headline_slug: string;
    markdown: string;
    objectID: string;
    post_date: string;
    post_date_timestamp: number;
    tags: any[];
}

const searchClient = algoliasearch('5S5CSBC0SP', '3f2836b2389f5804d70db89b3f3a5031');

async function getPost(slug: string): Promise<Post> {
    const resp = await searchClient.multipleGetObjects([
        {
            indexName: 'awsnews',
            objectID: slug.split('~')[1]

        }
    ]);

    return resp?.results?.[0] as Post;
}

export default async function Post({ params: { slug } }: any) {
    const post = await getPost(slug);

    return <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto p-4 sm:p-8">
        <div className="flex justify-between items-center mb-4">
            <Button variant="link">
                <Link href="/">Back</Link>
            </Button>
            <div>
                <Badge variant="secondary">{formatDateLong(post.post_date)}</Badge>
                {
                    post.tags?.map((tag: string) => <Badge variant="default" key={tag}>{tag}</Badge>)
                }
            </div>
        </div>
        <h1>{post.headline}</h1>
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
        <Button variant="link">
            <a href={`https://aws.amazon.com/about-aws/whats-new/${post.headline_slug}`} target="_blank">Original
                post</a>
        </Button>
    </article>
}