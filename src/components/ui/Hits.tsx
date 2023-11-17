import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { formatDateLong, formatDateShort } from "@/lib/utils";
import { CopyIcon, ReaderIcon } from "@radix-ui/react-icons";
import copy from "copy-to-clipboard";
import Link from "next/link";
import { useState } from "react";
import { Highlight, useHits, UseHitsProps } from "react-instantsearch";
import ReactMarkdown from "react-markdown";

type CustomUseHitsProps = UseHitsProps & {
  onFacetsUpdate: (facets: Record<string, number>) => void;
};

export default function CustomHits(props: CustomUseHitsProps) {
  const { hits, results } = useHits(props);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const isNewSearchQuery = searchQuery !== results?.query!;

  if (isFirstLoad || isNewSearchQuery) {
    if (Object.keys(results?.facets[0]?.data ?? {}).length > 0) {
      setIsFirstLoad(false);
      props.onFacetsUpdate(results?.facets[0]?.data as any);
      setSearchQuery(results?.query as any);
    }
  }

  return (
    <ol>
      {hits.map((hit) => (
        <li key={hit.objectID}>
          <Hit hit={hit} />
        </li>
      ))}
    </ol>
  );
}

function Hit({ hit }: { hit: any }) {
  const postPageURL = `/posts/${hit.headline_slug.replaceAll("/", "_")}~${
    hit.objectID
  }`;
  const { toast } = useToast();

  return (
    <Card className="mb-4">
      <Collapsible>
        <CollapsibleTrigger className="text-left w-full hover:bg-accent hover:transition-all">
          <CardHeader>
            <CardTitle className="flex space-x-4 justify-stretch">
              <Highlight attribute="headline" hit={hit} className="grow" />
              <div className="flex-none">{formatDateShort(hit.post_date)}</div>
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
            <div className="flex gap-4">
              <Link href={postPageURL}>
                <Button>
                  <ReaderIcon className="mr-2 h-4 w-4" />
                  Read more
                </Button>
              </Link>
              <Button
                variant="outline"
                className="hidden md:flex"
                onClick={() => {
                  copy(`https://awsnews.info${postPageURL}`);
                  const { dismiss } = toast({
                    title: "Copied to clipboard",
                  });
                  setTimeout(dismiss, 1000);
                }}
              >
                <CopyIcon className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
            <Badge variant="secondary">{formatDateLong(hit.post_date)}</Badge>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
