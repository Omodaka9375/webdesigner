import { useState, useRef, useContext, useMemo, useEffect } from 'react';
import Header from "../components/components/Header";
import ChatInput from "../components/components/chatInput";
//import OnboardingNote from "../components/components/OnboardingNote";
import {SettingContext} from '../components/contexts/SettingContext';
import {UploadFileContext} from '../components/contexts/UploadFileContext'
//import { IS_RUNNING_ON_CLOUD } from "../components/config";
import { useRouter } from 'next/router';
import classNames from 'classnames';
import dynamic from "next/dynamic";

const Whiteboard = dynamic(
    async () => (await import("../components//components/Whiteboard")),
    { ssr: false, },
  )
  
// Whiteboard
const baseStyle = {
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  
  const focusedStyle = {};
  
  const acceptStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: "dashed",
    borderColor: "#00e676",
  };
  
  const rejectStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: "dashed",
    borderColor: "#ff1744",
  };
  

export default function Dashboard() {
    const { settings, setSettings, setInitCreate } = useContext(SettingContext);
    const { getRootProps, 
        isDragAccept,
        isFocused,
        isDragReject, 
        setUploadComplete,
        setDataUrls,
        open,
    } = useContext(UploadFileContext);
    const [openWhiteboard, setOpenWhiteboard] = useState(false);
    const [showAnim, setShowAnim] = useState<boolean>(false);
    const ref = useRef(null);
    const router = useRouter();
    useEffect(() => {
        setUploadComplete(() => {
            setInitCreate(true);
            router.push('/editor')
        })
    }, []);

    const style = useMemo(
        () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/editor')
      }, [router])
    

    return (
        <div 
            {...getRootProps({ style: style as any })}
            className="dark:bg-black dark:text-white h-full relative">
            <div className='fixed w-full bg-neutral-10 z-20 h-[80px]'>
                <Header />
            </div>
            <main>          
                <div className='fixed right-0 top-20 w-[130px] flex flex-col items-right  justify-right py-8 gap-8'>
                    <div
                        onClick={open}
                        className='cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block px-4'>
                        <span className='relative text-white font-bold text-right'>Upload screenshot</span>
                    </div>
                    <div
                        onClick={() => {setOpenWhiteboard(true);}}
                        className='cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-rose-400 relative inline-block px-6'>
                        <span className='relative text-white font-bold text-right'>Draw your page</span>
                    </div>
                    <div 
                        onClick={() => {
                            setShowAnim(true);
                            setTimeout(() => {
                                setShowAnim(false);
                            }, 800)
                        }}
                        className='cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-indigo-400 relative inline-block px-4'
                        >
                        <span className='relative text-white font-bold text-right'>Describe your page</span>
                    </div>
                </div>
                
                <div class="max-w-6xl h-[355px] px-4 mx-auto sm:px-6 lg:px-8">
                    <section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
                        <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                            <div class="max-w-2xl mx-auto text-center">
                                <h1 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">AI-Powered Web Page Generator And Editor</h1>
                                <p class="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Transform your web development experience, where your visual concepts and ideas become reality in just a few clicks!</p>
                            </div>
                        </div>
                    </section>
                    <div className="w-full bg-white dark:bg-gray-800 border-t dark:border-t-gray-600 flex-col flex items-center justify-between p-3">
                        <div className="relative mt-6 w-[600px] h-[50px] mt-5 rounded-md shadow-sm">

                            <ChatInput
                                openWhiteboard={() => {
                                    setOpenWhiteboard(true);
                                }}
                                showAnim={showAnim}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <div 
                className={classNames(
                    "fixed w-full h-full top-0 left-0 z-50",
                    {
                     'hidden': !openWhiteboard,
                    }
                )}
            >
                <Whiteboard 
                    doCreate={(urls: string[]) => {
                        setOpenWhiteboard(false);
                        setDataUrls(urls);
                        setInitCreate(true);
                        router.push('/editor')
                    }}
                    closeWhiteboard={() => {
                        setOpenWhiteboard(false);
                    }}
                />
            </div>


<section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
         {/* <h2 class="text-2xl font-bold text-gray-800 sm:text-4xl sm:leading-tight">What is it?</h2>                   */}
        <div class="flow-root mt-12 sm:mt-16">
            <div class="divide-y divide-gray--200 -my-9">
                <div class="py-9">
                    <p class="text-xl font-semibold text-black">From words to code</p>
                    <p class="mt-3 text-base text-gray-600">Start by typing your website idea or requirement directly into the search box. Our AI will interpret your concept and generate the corresponding HTML code.</p>
                </div>

                <div class="py-9">
                    <p class="text-xl font-semibold text-black">Start from a screenshot</p>
                    <p class="mt-3 text-base text-gray-600">Have a design mock-up? Upload a screenshot, and our AI will convert the image into a fully functional HTML structure.</p>
                </div>

                <div class="py-9">
                    <p class="text-xl font-semibold text-black">Draw it out</p>
                    <p class="mt-3 text-base text-gray-600">Utilize the whiteboard to draw your website structure. Our AI editor understands your sketches and turns them into clean, maintainable code.</p>
                </div>

                 {/*<div class="py-9">
                    <p class="text-xl font-semibold text-black">Select a Template</p>
                    <p class="mt-3 text-base text-gray-600">
                       Choose from pre-optimized templates with popular combinations like React with Tailwind or Vue with Element Plus. Customize as needed.
                    </p>
                </div>
                <div class="py-9">
                    <p class="text-xl font-semibold text-black">AI Model Selection</p>
                    <p class="mt-3 text-base text-gray-600">
                       For intricate designs, select between OpenAI and Gemini LLM for nuanced code generation. OpenAI models tend to deliver superior results for complex tasks.
                    </p>
                </div> */}
            </div>
        </div>
    </div>
</section>
<section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h3 class="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">Integrated With  GPT-4o</h3>
            <p class="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">We provide a way to mock test the service. For real usecase and enhanced performance, especially when multiple users are online, use your own OpenAI key. To do so click the gear icon in the top-right corner to access settings and paste your API Key.</p>
        </div>
    </div>
</section>
            <section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-2xl font-bold text-gray-800 sm:text-4xl sm:leading-tight">Trusted by world class companies, design teams & popular AI web designers</h2>
        </div>

        <div class="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
            <div>
                <img class="object-contain w-full h-6 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png" alt="" />
            </div>

            <div>
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png" alt="" />
            </div>

            <div>
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png" alt="" />
            </div>

            <div>
                <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png" alt="" />
            </div>
        </div>

        <div class="flex items-center justify-center mt-10 space-x-3 md:hidden">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
        </div>

        <p class="mt-10 text-base text-center text-gray-500 md:mt-20">and many more ...</p>
    </div>
</section>
            
            <div className='w-full mt-12'>
                 <p className='text-center text-[#636262]'>WebDesigner © 2024 <a className='text-sky-500 py-8' href='/' target='_blank'></a> All rights reserved.</p>
                <p className='text-center text-[#636262] py-8' ><a href="#" target="_blank">Privacy Policy</a> | <a href="#" target="_blank">Terms of Service</a></p>
            </div>   
        </div>
    );
}
