import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function NotFound() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, [])
    return (
        <div className='not-found'>
        <h1>404</h1>
        <h2>Opps!! That page cannot be found</h2>
        <p>Redirecting to the <Link href='/'>Homepage</Link> for more recipeshhh</p>
        <style jsx>
            {`
                .not-found {
                    background: #d17176;
                    padding:30px;
                    text-align: center;
                    transform: rotateZ(-1deg);
                    color: white;
                }
                h1 {
                    font-size: 3em;
                }
            `}
        </style>
        </div>
    )
}
