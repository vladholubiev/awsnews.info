import React, {useState} from 'react';
import {Highlight, useHits, UseHitsProps,} from 'react-instantsearch';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {formatDate} from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import {Button} from "@/components/ui/button";

type CustomUseHitsProps = UseHitsProps & {
    onFirstFacetsLoad: (facets: Record<string, number>) => void;
}

export default function CustomHits(props: CustomUseHitsProps) {
    const {hits, results} = useHits(props);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [searchQuery, setSearchQuery] = useState(null);

    if (isFirstLoad || searchQuery !== results?.query!) {
        if (Object.keys(results?.facets[0]?.data ?? {}).length > 0) {
            setIsFirstLoad(false);
            props.onFirstFacetsLoad(results?.facets[0]?.data as any);
            setSearchQuery(results?.query as any)
        }
    }

    return (
        <ol>
            {hits.map((hit) => (
                <li
                    key={hit.objectID}
                >
                    <Hit hit={hit}/>
                </li>
            ))}
        </ol>
    );
}

function Hit({hit}: { hit: any }) {
    return (
        <Card className="mb-4">
            <Collapsible>
                <CollapsibleTrigger className="text-left w-full hover:bg-accent hover:transition-all">
                    <CardHeader>
                        <CardTitle className="flex space-x-4 justify-stretch">
                            <Highlight attribute="headline" hit={hit} className="grow"/>
                            <div className="flex-none">
                                {formatDate(hit.post_date)}
                            </div>
                        </CardTitle>
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent>
                        <article className="prose">
                            <ReactMarkdown>{hit.markdown}</ReactMarkdown>
                        </article>
                    </CardContent>
                    <CardFooter>
                        <Button>
                            <a href={`https://aws.amazon.com/about-aws/whats-new/${hit.headline_slug}`} target="_blank">Original
                                post</a>
                        </Button>
                    </CardFooter>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}

