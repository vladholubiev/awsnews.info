import React, {useState} from 'react';
import {useInstantSearch, useRefinementList, UseRefinementListProps} from 'react-instantsearch';
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {ScrollArea} from "@/components/ui/scroll-area"

type CustomUseRefinementListProps = UseRefinementListProps & {
    facets: Record<string, number>;
}

export default function CustomRefinementList(props: CustomUseRefinementListProps) {
    const {refine, searchForItems} = useRefinementList(props);
    const {results, setIndexUiState} = useInstantSearch();
    const [searchQuery, setSearchQuery] = useState(null);
    const [refinedTags, setRefinedTags] = useState<string[]>([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const isClearedSearchQuery = searchQuery !== '' && results?.query! === '';
    const facets = Object.keys(props.facets);

    if (isFirstRender || isClearedSearchQuery) {
        setIsFirstRender(false);
        setRefinedTags([]);
        setIndexUiState(previousIndexUiState => {
            return {
                ...previousIndexUiState,
                refinementList: {
                    ...previousIndexUiState.refinementList,
                    [props.attribute]: facets.map(t => `-${t}`)
                }
            };
        })
    }

    if (searchQuery !== results?.query!) {
        setSearchQuery(results?.query as any);
    }

    return (
        <div>
            <div className="mt-5"></div>
            <div className="flex items-center space-x-2 p-4 pb-6">
                <Switch id="toggle-all" disabled={results?.query !== ''}
                        checked={facets.every(t => refinedTags.includes(t))} onCheckedChange={(checked) => {


                    if (checked) {
                        setIndexUiState(previousIndexUiState => {
                            return {
                                ...previousIndexUiState,
                                refinementList: {
                                    ...previousIndexUiState.refinementList,
                                    [props.attribute]: facets.map(t => `-${t}`)
                                }
                            };
                        })
                        setRefinedTags(facets);
                    } else {
                        setIndexUiState(previousIndexUiState => {
                            return {
                                ...previousIndexUiState,
                                refinementList: {
                                    ...previousIndexUiState.refinementList,
                                    [props.attribute]: []
                                }
                            };
                        })
                        setRefinedTags([]);
                    }
                }}/>
                <Label htmlFor="toggle-all">Filter out all noise</Label>
            </div>

            <ScrollArea className="h-[400px] rounded-md border p-4">

                {facets.map((item) => {
                    return (
                        <div className="flex items-center space-x-2 mb-4" key={item}>
                            <Checkbox id={item} checked={refinedTags.some(t => t === item)}
                                      disabled={results?.query !== ''}
                                      onCheckedChange={(checked) => {
                                          refine(`-${item}`);

                                          if (checked) {
                                              setRefinedTags([...refinedTags, item]);
                                          } else {
                                              setRefinedTags(refinedTags.filter(t => t !== item));
                                          }
                                      }}/>
                            <label
                                htmlFor={item}
                                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {item} ({(props.facets as any)[item] ?? 0})
                            </label>
                        </div>
                    );
                })}
            </ScrollArea>
            <div className="relative mt-8 mb-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      About
                    </span>
                </div>
            </div>
            <p className="prose">
                Hey, I am <a href="https://vladholubiev.com/" target="_blank">Vlad</a>.
                I created this website for people who regularly follow latest AWS news like me.&nbsp;
                <strong>It is not affiliated</strong>, endorsed or sponsored by AWS.
            </p>
            <br/>
            <p className="prose">
                This is a better place to read AWS product announcements.
                Especially if you are sick of posts like “<em>aws xxx is available in region yyy</em>”.
            </p>
        </div>
    );
}
