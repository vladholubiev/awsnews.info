import React, { useState } from 'react';
import { Highlight, useHits, UseHitsProps } from 'react-instantsearch';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { formatDateLong, formatDateShort } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';

type CustomUseHitsProps = UseHitsProps & {
    onFacetsUpdate: (facets: Record<string, number>) => void;
}

export default function CustomHits(props: CustomUseHitsProps) {
    const { hits, results } = useHits(props);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [searchQuery, setSearchQuery] = useState(null);
    const isNewSearchQuery = searchQuery !== results?.query!;

    if (isFirstLoad || isNewSearchQuery) {
        if (Object.keys(results?.facets[0]?.data ?? {}).length > 0) {
            setIsFirstLoad(false);
            props.onFacetsUpdate(results?.facets[0]?.data as any);
            setSearchQuery(results?.query as any)
        }
    }

    return (
        <ol>
            {hits.map((hit) => (
                <li
                    key={hit.objectID}
                >
                    <Hit hit={hit} />
                </li>
            ))}
        </ol>
    );
}

function Hit({ hit }: { hit: any }) {
    return (
        <Card className="mb-4">
            <Collapsible>
                <CollapsibleTrigger className="text-left w-full hover:bg-accent hover:transition-all">
                    <CardHeader>
                        <CardTitle className="flex space-x-4 justify-stretch">
                            <Highlight attribute="headline" hit={hit} className="grow" />
                            <div className="flex-none">
                                {formatDateShort(hit.post_date)}
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
                    <CardFooter className="place-content-between">
                        <Link href={`/posts/${hit.headline_slug.replaceAll('/', '_')}~${hit.objectID}`}>
                            <Button>
                                Read more
                            </Button>
                        </Link>
                        <Badge variant="secondary">{formatDateLong(hit.post_date)}</Badge>
                    </CardFooter>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}

