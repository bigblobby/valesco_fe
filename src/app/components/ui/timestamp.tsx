import TimeAgo from 'react-timeago';

interface TimestampProps {
    date: Date;
}

export default function Timestamp({
    date
}: TimestampProps) {
    return (
        <TimeAgo date={date} title={(new Date(date)).toUTCString()}/>
    )
}