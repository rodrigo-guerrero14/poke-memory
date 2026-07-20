interface Props {
    className?: string;
}

export const PokeBall = ({ className = "" }: Props) => (
    <div className={`relative rounded-full border-2 border-ink bg-white overflow-hidden ${className}`}>
        <div className="absolute inset-x-0 top-0 h-1/2 bg-poke-red" />
        <div className="absolute inset-x-0 top-1/2 h-[6%] -translate-y-1/2 bg-ink" />
        <div className="absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-white" />
    </div>
);
