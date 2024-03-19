'use client';

import Card from '@/lib/components/ui/card';
import Link from '@/lib/components/ui/link';
import Text from '@/lib/components/ui/text';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import Timestamp from '@/lib/components/ui/timestamp';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/lib/components/ui/pagination';
import Heading from '@/lib/components/ui/heading';

export default function Workouts() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamPage = searchParams.get('page');
    const [page, setPage] = useState<number>(Number(searchParamPage) || 1);
    const { getAllWorkouts } = useWorkoutAPI();
    const { data, isLoading, isFetching } = getAllWorkouts(page);

    useEffect(() => {
        router.push(`/dashboard/workouts?page=${page}`);
    }, [searchParamPage, page]);

    if (isLoading || isFetching) {
        return (
            <div>
                <span>Loading...</span>
            </div>
        )
    }

    if (!isLoading && !isFetching && data && data.data.workouts.length > 0) {
        const maxPage = Math.ceil(data.data.count / 12);

        return (
            <div>
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.data.workouts.map((workout: any, i: number) => (
                        <li key={i}>
                            <Link asWrapper href={`/dashboard/workout/${workout.id}`}>
                                <Card>
                                    <Heading as="h4" className="text-2xl mb-1">{workout.name}</Heading>
                                    <Text className="text-xs">
                                        <Timestamp date={workout.created_at}/>
                                    </Text>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div>
                    <Pagination>
                        <PaginationContent>
                            {page !== 1 && (
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setPage((prev) => prev - 1)} />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            {page !== maxPage && page !== 1 && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink>{page}</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                </>
                            )}
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(maxPage)}>{maxPage}</PaginationLink>
                            </PaginationItem>
                            {page !== maxPage && (
                                <PaginationItem>
                                    <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        )
    }

    return null;
}