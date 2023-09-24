'use client';
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon,} from '@heroicons/react/24/outline'
import algoliasearch from 'algoliasearch/lite';
import {Highlight, Hits, Pagination, PoweredBy, SearchBox,Configure, Stats} from 'react-instantsearch';
import {InstantSearchNext} from 'react-instantsearch-nextjs';
import ReactMarkdown from 'react-markdown'
import {formatDate} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle,CardFooter} from "@/components/ui/card"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


const searchClient = algoliasearch('5S5CSBC0SP', '3f2836b2389f5804d70db89b3f3a5031');

export const dynamic = 'force-dynamic';

// @ts-ignore
function Hit({hit}) {
    return (
        <Card>
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
                            <a href={`https://aws.amazon.com/about-aws/whats-new/${hit.headline_slug}`} target="_blank">Original post</a>
                        </Button>
                    </CardFooter>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-sm flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms2" disabled />
                            <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                        </div>
                    </div>
                </div>

                <div
                    className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
                        Open Filters
                    </div>
                </div>

                <main className="py-10 lg:pl-80">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <InstantSearchNext searchClient={searchClient} indexName="awsnews">
                            <div className="flex space-x-4">
                                <SearchBox classNames={{
                                    input: "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                    submitIcon: "hidden",
                                    resetIcon: "hidden",
                                    root: 'flex-1 h-12'
                                }} placeholder="Start searching here"/>
                                <PoweredBy classNames={{
                                    root: 'flex-none h-12 flex space-around items-center',
                                    logo: 'h-4',
                                    link: ''
                                }}/>
                            </div>


                            <Configure facetFilters={[]}/>
                            <Stats classNames={{
                                root: 'text-sm text-muted-foreground pb-6 pt-2 px-2'
                            }}/>

                            <Hits hitComponent={Hit} classNames={{
                                item: 'pb-4'
                            }}/>
                            <Pagination classNames={{
                                item: 'h-9 w-9 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                                selectedItem: 'bg-primary/90 text-white shadow hover:bg-primary/80 hover:text-primary-foreground',
                                disabledItem: 'hidden',
                                link:'flex items-center justify-center w-full h-full'
                            }}/>
                        </InstantSearchNext>
                    </div>
                </main>
            </div>
        </>
    )
}
