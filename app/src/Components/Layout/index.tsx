import { Header } from './Header'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 'calc(100% - 65px)',
                    width: '100%',
                    maxWidth: '500px',
                    margin: '0 auto',
                    overflow: 'hidden',
                }}
            >
                {children}
            </main>
        </>
    )
}
