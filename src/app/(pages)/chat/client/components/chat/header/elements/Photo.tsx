import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
    size?: number;
}

export const Photo = ({ alt, size, ...rest }: Props) => (
    <figure className="select-none relative flex-none">
        <Image
            alt={alt}
            width={size}
            height={0}
            className="pointer-events-none rounded-full"
            {...rest}
        />
    </figure>
)