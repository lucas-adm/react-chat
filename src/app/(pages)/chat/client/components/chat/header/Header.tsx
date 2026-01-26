import { Photo, Title } from './elements';

export const Header = () => (
    <header className="w-fit mx-auto p-2 rounded-xl flex items-center justify-center gap-6">
        <Photo alt='' src={'https://placehold.co/64x64.png'} size={64} />
        <Title>chat dos campeões</Title>
    </header>
)