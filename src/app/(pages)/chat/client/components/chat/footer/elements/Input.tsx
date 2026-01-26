export const Input = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        placeholder="Escreva sua mensagem"
        rows={1}
        className="resize-none outline-none w-full px-4 py-2 rounded-full border border-neutral-200 text-sm"
        {...props}
    />
)