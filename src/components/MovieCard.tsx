import Image from "next/image";
import Link from "next/link";

export function MovieCard({
  title,
  poster_path,
  vote_average,
  id,
}: MovieCardProps) {
  const imgPath = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg">
      <Link href={`/${id}`} className="block" prefetch={false}>
        <Image
          src={`${imgPath}${poster_path}`}
          alt="Movie Poster"
          width={300}
          height={450}
          className="w-full h-[450px] object-cover"
          style={{ aspectRatio: "300/450", objectFit: "cover" }}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">
          <Link href="#" prefetch={false}>
            {title}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StarIcon className="w-4 h-4 fill-primary" />
          <span>{vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

function StarIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
