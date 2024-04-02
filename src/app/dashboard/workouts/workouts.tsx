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
import CreateNewWorkoutForm from '@/lib/components/forms/create-new-workout-form';
import DumbbellIcon from '@/lib/components/icons/dumbbell-icon';
import Badge from '@/lib/components/ui/badge';
import { TWorkout } from '@/lib/types/table.types';
import WorkoutUtils from '@/lib/utils/workout.utils';
import PageSpinner from '@/lib/components/ui/page-spinner';

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
        return <PageSpinner />
    }

    if (!isLoading && !isFetching && data && data.data.workouts.length > 0) {
        const maxPage = Math.ceil(data.data.count / 12);

        return (
            <div className="xl:h-[calc(100vh-185px)]">
                <ul className="grid gap-5 grid-cols-1 lg:grid-rows-4 xl:grid-rows-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:h-full">
                    {data.data.workouts.map((workout: TWorkout) => (
                        <li key={workout.id}>
                            <Link className="block h-full" asWrapper href={`/dashboard/workout/${workout.id}`}>
                                <Card className="h-full sm:p-4 md:p-8">
                                    <Heading as="h4" variant="h4" className="mb-1">{workout.name}</Heading>
                                    <Text className="text-xs">
                                        <Timestamp date={workout.created_at}/>
                                    </Text>
                                    <div className="mt-3 inline-flex items-center flex-wrap gap-3">
                                        {workout.length && workout.type !== 'hero' && (
                                            <Badge variant="solid" size="extra-small" color="orange">{WorkoutUtils.getTimeLength(workout.length)}</Badge>
                                        )}
                                        {workout.type && (
                                            <Badge variant="solid" size="extra-small" color="blue">{WorkoutUtils.getTypeName(workout.type)}</Badge>
                                        )}
                                    </div>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>

                {maxPage !== 1 && (
                    <div className="mt-8 mb-3">
                        <Pagination>
                            <PaginationContent>
                                {page !== 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => setPage((prev) => prev - 1)} />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationLink isActive={page === 1} onClick={() => setPage(1)}>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                {page !== maxPage && page !== 1 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationLink isActive>{page}</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    </>
                                )}
                                <PaginationItem>
                                    <PaginationLink  isActive={page === maxPage} onClick={() => setPage(maxPage)}>{maxPage}</PaginationLink>
                                </PaginationItem>
                                {page !== maxPage && (
                                    <PaginationItem>
                                        <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        )
    }

    if (data?.data.workouts.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center justify-center text-center">
                    <DumbbellIcon />
                    <Heading as="h1" variant="h6">No workouts</Heading>
                    <Text className="mb-6">Get started by generating a new workout</Text>
                    <CreateNewWorkoutForm />
                </div>
            </div>
        )
    }

    return null;
}