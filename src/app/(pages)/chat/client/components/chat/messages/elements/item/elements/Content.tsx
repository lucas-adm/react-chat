type Props = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'content'> & {
    content: string | null;
}

export const Content = ({ content, ...rest }: Props) => {

    if (content) return (
        <p className="text-xs text-neutral-500" {...rest}>{content}</p>
    )

    return (
        <p className="italic font-medium text-xs text-neutral-400" {...rest}>Apagada</p>
    )

}