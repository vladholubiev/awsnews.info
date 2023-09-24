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
    const {refine} = useRefinementList(props);
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

            <ScrollArea className="rounded-md border p-4 h-[250px] md:h-[400px]">
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
        </div>
    );
}
