import React, {useState} from 'react';
import {useInstantSearch, useRefinementList, UseRefinementListProps} from 'react-instantsearch';
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"

type CustomUseRefinementListProps = UseRefinementListProps & {
    facets: Record<string, number>;
}

export default function CustomRefinementList(props: CustomUseRefinementListProps) {
    const {refine, searchForItems} = useRefinementList(props);
    // const {results:{facets: [{data :facets}]}, setUiState} = useInstantSearch();
    const [refinedTags, setRefinedTags] = useState<string[]>([]);
    const [isFirstRender, setIsFirstRender] = useState(true);

    if (isFirstRender) {
        setIsFirstRender(false);
        refine(Object.keys(props.facets).map(t => `-${t}`).join(', '));
    }

    console.log('props.facets',props.facets);

    return (
        <div>
            {/*<input*/}
            {/*    type="search"*/}
            {/*    autoComplete="off"*/}
            {/*    autoCorrect="off"*/}
            {/*    autoCapitalize="off"*/}
            {/*    spellCheck={false}*/}
            {/*    maxLength={512}*/}
            {/*    placeholder="Search for tags"*/}
            {/*    className="mb-2 h-8 w-full rounded-sm border border-input bg-transparent px-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"*/}
            {/*    onChange={(event) => searchForItems(event.currentTarget.value)}*/}
            {/*/>*/}
            <div className="flex items-center space-x-2 p-4">
                <Switch id="toggle-all" onCheckedChange={(checked) => {
                    for (const tag of Object.keys(props.facets)) {
                        refine(`-${tag}`);
                    }

                    if (checked) {
                        setRefinedTags(Object.keys(props.facets));
                    } else {
                        setRefinedTags([]);
                    }
                }}/>
                <Label htmlFor="toggle-all">Filter out all noise</Label>
            </div>
            {Object.keys(props.facets).map((item) => {
                return (
                    <div className="flex items-center space-x-2 mb-4" key={item}>
                        <Checkbox id={item} checked={refinedTags.some(t => t === item)}
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
        </div>
    );
}
