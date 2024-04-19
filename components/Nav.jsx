"use client"

import Link from 'next/link'
// import { GET } from '@app/api/auth/[...nextauth]/route'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            
            const response = await getProviders();
            // console.log(response);
            setProviders(response);
            
        }
        setUpProviders();
    }, [])


    

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />

                <p className="logo_text">Promptpedia</p>
            </Link>
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                        <Link href="/profile">
                            <Image
                                src="/assets/images/userimg.png"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>

                        {providers &&
                            Object.values(providers).map((  ) => (
                                <button type="button"
                                    key={providers.name}
                                    onClick={() => signIn(providers.id)}
                                    className='black_btn'
                                >

                                    Sign In

                                </button>
                            ))
                        }

                    </>
                )}
            </div>

            


            {/* mobile-view */}

            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>

                        <Image
                            src="/assets/images/userimg.png"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggle((prev) => !prev)}
                        />


                        {toggle && (
                            <div className='dropdown'>
                                <Link href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggle(false)}>
                                    Profile
                                </Link>
                                <Link href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggle(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    className="mt-5 w-full black_btn"
                                    type='button'
                                    onClick={() => {
                                        setToggle(false);
                                        signOut();
                                    }}>
                                    Sign Out

                                </button>

                            </div>
                        )}
                    </div>

                ) : (
                    <>

                        {providers &&
                            Object.values(providers).map(() => (
                                <button type="button"
                                    key={providers.name}
                                    onClick={() => signIn(providers.id)}
                                    className='black_btn'
                                >

                                    Sign In

                                </button>
                            ))
                        }

                    </>
                )}

            </div>



        </nav>
    )
}

export default Nav